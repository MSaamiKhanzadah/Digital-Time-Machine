import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'

export function useFeatureTab<T extends string>(
  ids: readonly T[],
  fallback: T,
  rootHash: string,
) {
  const [active, setActive] = useState<T>(() =>
    ids.includes(location.hash.slice(1) as T)
      ? (location.hash.slice(1) as T)
      : fallback,
  )
  useEffect(() => {
    const sync = () => {
      const next = location.hash.slice(1) as T
      if (ids.includes(next)) setActive(next)
      else if (next === rootHash) setActive(fallback)
    }
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [ids, fallback, rootHash])
  const select = (next: T) => {
    setActive(next)
    if (location.hash !== `#${next}`) history.pushState(null, '', `#${next}`)
  }
  return [active, select] as const
}

export default function FeatureTabs<T extends string>({
  tabs,
  active,
  onSelect,
  label,
}: {
  tabs: { id: T; label: string; icon: LucideIcon }[]
  active: T
  onSelect: (id: T) => void
  label: string
}) {
  return (
    <div className="hub-tabs" role="tablist" aria-label={label}>
      {tabs.map((tab, index) => (
        <button
          type="button"
          key={tab.id}
          id={`${tab.id}-tab`}
          role="tab"
          aria-selected={active === tab.id}
          aria-controls={`${tab.id}-panel`}
          tabIndex={active === tab.id ? 0 : -1}
          onClick={() => onSelect(tab.id)}
          onKeyDown={(event) => {
            const targetIndex =
              event.key === 'ArrowRight'
                ? (index + 1) % tabs.length
                : event.key === 'ArrowLeft'
                  ? (index - 1 + tabs.length) % tabs.length
                  : event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? tabs.length - 1
                      : -1
            if (targetIndex < 0) return
            event.preventDefault()
            const next = tabs[targetIndex].id
            onSelect(next)
            document.getElementById(`${next}-tab`)?.focus()
          }}
        >
          <tab.icon size={16} aria-hidden="true" />
          {tab.label}
        </button>
      ))}
    </div>
  )
}
