import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookOpen, Check, ExternalLink, X } from 'lucide-react'
import {
  categories,
  exhibits,
  eras,
  type CategoryId,
  type EraYear,
  type Exhibit,
} from '../data/history'
import DeviceArt from './DeviceArt'

function DetailPanel({
  exhibit,
  onClose,
}: {
  exhibit: Exhibit
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    if (!dialog.open) dialog.showModal()
  }, [])
  return (
    <dialog
      ref={ref}
      className="exhibit-dialog"
      aria-labelledby="exhibit-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) ref.current?.close()
      }}
    >
      <div className="dialog-illustration">
        <span className="exhibit-accession">
          ARCHIVE / {exhibit.year} / {exhibit.category.toUpperCase()}
        </span>
        <button
          className="dialog-close icon-button"
          onClick={() => ref.current?.close()}
          aria-label="Close exhibit"
        >
          <X size={20} />
        </button>
        <DeviceArt
          year={exhibit.year}
          category={exhibit.category}
          variant={exhibit.id === 'ai-assistants' ? 'ai' : undefined}
        />
        <span className="illustration-note">INTERPRETIVE ILLUSTRATION</span>
      </div>
      <div className="dialog-content">
        <span className="micro-label accent-text">{exhibit.date}</span>
        <h2 id="exhibit-title">{exhibit.name}</h2>
        <p className="dialog-subtitle">{exhibit.subtitle}</p>
        <p className="dialog-description">{exhibit.description}</p>
        <h3>The details that mattered</h3>
        <ul className="exhibit-facts">
          {exhibit.facts.map((fact) => (
            <li key={fact}>
              <Check size={16} aria-hidden="true" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
        <a
          className="source-link"
          href={exhibit.source.url}
          target="_blank"
          rel="noreferrer"
        >
          <BookOpen size={17} />
          <span>Go deeper · {exhibit.source.label}</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </dialog>
  )
}

export default function Museum({ year }: { year: EraYear }) {
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [detail, setDetail] = useState<Exhibit | null>(null)
  const total = exhibits.filter((exhibit) => exhibit.year === year).length
  const collection = exhibits.filter(
    (exhibit) =>
      exhibit.year === year &&
      (category === 'all' || exhibit.category === category),
  )
  return (
    <section
      className="museum-section content-section"
      id="museum"
      aria-labelledby="museum-heading"
    >
      <div className="section-kicker">
        <span className="section-index">01 / THE MUSEUM</span>
        <span className="era-chip">
          <i />
          {year} COLLECTION
        </span>
      </div>
      <div className="section-heading">
        <div>
          <h2 id="museum-heading" tabIndex={-1}>
            Inside the era<span className="accent-text">.</span>
          </h2>
          <p>
            Big ideas. Familiar objects. The things that changed everything.
          </p>
        </div>
        <div className="collection-note">
          <span className="micro-label">YOU ARE EXPLORING</span>
          <strong>
            {eras[year].label} <ArrowUpRight size={18} />
          </strong>
        </div>
      </div>
      <div className="museum-toolbar">
        <div
          className="category-filters"
          aria-label="Filter museum by category"
        >
          <button
            className={category === 'all' ? 'active' : ''}
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
          >
            All exhibits <span>{String(total).padStart(2, '0')}</span>
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              className={category === item.id ? 'active' : ''}
              onClick={() => setCategory(item.id)}
              aria-pressed={category === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="exhibit-count" aria-live="polite">
          {String(collection.length).padStart(2, '0')} OBJECT
          {collection.length === 1 ? '' : 'S'}
        </span>
      </div>
      <div className="exhibit-grid" key={year}>
        {collection.map((exhibit) => (
          <button
            className="exhibit-card"
            key={exhibit.id}
            onClick={() => setDetail(exhibit)}
            aria-label={`Explore ${exhibit.name}`}
          >
            <div className="exhibit-image">
              <span className="exhibit-type">
                {categories.find((item) => item.id === exhibit.category)?.label}
              </span>
              <span className="exhibit-serial">
                {String(exhibits.indexOf(exhibit) + 1).padStart(3, '0')}
              </span>
              <DeviceArt
                year={year}
                category={exhibit.category}
                variant={exhibit.id === 'ai-assistants' ? 'ai' : undefined}
              />
              <span className="exhibit-image-tag">{exhibit.tag}</span>
            </div>
            <div className="exhibit-card-content">
              <div>
                <h3>{exhibit.name}</h3>
                <p>{exhibit.subtitle}</p>
              </div>
              <span className="exhibit-open" aria-hidden="true">
                <ArrowUpRight size={19} />
              </span>
            </div>
            <div className="exhibit-card-footer">
              <span>{exhibit.date}</span>
              <span>EXPLORE OBJECT</span>
            </div>
          </button>
        ))}
      </div>
      <p className="museum-footnote">
        <span>Small collection. Extraordinary impact.</span>
        <span>
          Original vector illustrations · Historical sources in every exhibit
        </span>
      </p>
      {detail && (
        <DetailPanel exhibit={detail} onClose={() => setDetail(null)} />
      )}
    </section>
  )
}
