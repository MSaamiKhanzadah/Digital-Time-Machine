import { useRef, useState } from 'react'

export const PREDICTIONS_KEY = 'dtm.predictions.v1'

export interface Prediction {
  id: string
  title: string
  prediction: string
  createdAt: string
  targetYear: number
  confidence: number
  reasoning: string
}
export type PredictionDraft = Omit<Prediction, 'id' | 'createdAt'>

function isPrediction(value: unknown): value is Prediction {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    item.id.length > 0 &&
    item.id.length <= 100 &&
    typeof item.title === 'string' &&
    item.title.trim().length > 0 &&
    item.title.length <= 80 &&
    typeof item.prediction === 'string' &&
    item.prediction.trim().length > 0 &&
    item.prediction.length <= 1000 &&
    typeof item.reasoning === 'string' &&
    item.reasoning.length <= 1000 &&
    typeof item.createdAt === 'string' &&
    /^\d{4}-\d{2}-\d{2}T/.test(item.createdAt) &&
    Number.isFinite(Date.parse(item.createdAt)) &&
    typeof item.targetYear === 'number' &&
    Number.isInteger(item.targetYear) &&
    item.targetYear >= 1900 &&
    item.targetYear <= 2100 &&
    typeof item.confidence === 'number' &&
    Number.isInteger(item.confidence) &&
    item.confidence >= 0 &&
    item.confidence <= 100
  )
}

function loadPredictions(): {
  items: Prediction[]
  warning: string
  blocked: boolean
} {
  let raw: string | null
  try {
    raw = window.localStorage.getItem(PREDICTIONS_KEY)
  } catch {
    return {
      items: [],
      blocked: true,
      warning:
        'Browser storage is unavailable. Changes stay in this tab only and will be lost on reload. Existing browser data has not been changed.',
    }
  }
  if (raw === null) return { items: [], warning: '', blocked: false }
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error('Invalid collection')
    const ids = new Set<string>()
    const items: Prediction[] = []
    for (const entry of parsed) {
      if (isPrediction(entry) && !ids.has(entry.id)) {
        items.push(entry)
        ids.add(entry.id)
      }
    }
    if (items.length !== parsed.length)
      return {
        items,
        blocked: true,
        warning:
          'Some stored capsule data is invalid. Valid predictions are shown, and the original stored data has been left untouched. Changes stay in this tab only and will be lost on reload.',
      }
    return { items, warning: '', blocked: false }
  } catch {
    return {
      items: [],
      blocked: true,
      warning:
        'Stored capsule data could not be read. It has been left untouched. New predictions stay in this tab only and will be lost on reload.',
    }
  }
}

export function validatePrediction(draft: PredictionDraft): string | null {
  const minimumYear = new Date().getFullYear() + 1
  if (!draft.title.trim() || draft.title.length > 80)
    return 'Add a title of 1–80 characters.'
  if (!draft.prediction.trim() || draft.prediction.length > 1000)
    return 'Write a prediction of 1–1,000 characters.'
  if (draft.reasoning.length > 1000)
    return 'Keep your reasoning within 1,000 characters.'
  if (
    !Number.isInteger(draft.targetYear) ||
    draft.targetYear < minimumYear ||
    draft.targetYear > 2100
  )
    return `Choose a whole target year from ${minimumYear} to 2100.`
  if (
    !Number.isInteger(draft.confidence) ||
    draft.confidence < 0 ||
    draft.confidence > 100
  )
    return 'Confidence must be a whole number from 0 to 100.'
  return null
}

export default function usePredictions() {
  const [initial] = useState(loadPredictions)
  const [predictions, setPredictions] = useState(initial.items)
  const [warning, setWarning] = useState(initial.warning)
  const [persistence, setPersistence] = useState<'ready' | 'saved' | 'session'>(
    initial.blocked ? 'session' : 'ready',
  )
  const current = useRef(initial.items)

  function commit(items: Prediction[]) {
    current.current = items
    setPredictions(items)
    if (initial.blocked) {
      setPersistence('session')
      return false
    }
    try {
      window.localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(items))
      setWarning('')
      setPersistence('saved')
      return true
    } catch {
      setWarning(
        'Browser storage could not save these changes. Your collection is available in this tab only; the latest changes will be lost on reload. You can try saving again.',
      )
      setPersistence('session')
      return false
    }
  }

  function create(draft: PredictionDraft) {
    const error = validatePrediction(draft)
    if (error) return { error, saved: false }
    const item: Prediction = {
      ...draft,
      title: draft.title.trim(),
      prediction: draft.prediction.trim(),
      reasoning: draft.reasoning.trim(),
      id:
        globalThis.crypto?.randomUUID?.() ??
        `capsule-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: new Date().toISOString(),
    }
    return { error: null, saved: commit([...current.current, item]) }
  }

  function update(id: string, draft: PredictionDraft) {
    const error = validatePrediction(draft)
    if (error) return { error, saved: false }
    if (!current.current.some((item) => item.id === id))
      return {
        error: 'This prediction is no longer in the collection.',
        saved: false,
      }
    return {
      error: null,
      saved: commit(
        current.current.map((item) =>
          item.id === id
            ? {
                ...item,
                ...draft,
                title: draft.title.trim(),
                prediction: draft.prediction.trim(),
                reasoning: draft.reasoning.trim(),
              }
            : item,
        ),
      ),
    }
  }

  function remove(id: string) {
    return commit(current.current.filter((item) => item.id !== id))
  }
  function retrySave() {
    return commit(current.current)
  }

  return {
    predictions,
    warning,
    persistence,
    canRetry: !initial.blocked,
    create,
    update,
    remove,
    retrySave,
  }
}
