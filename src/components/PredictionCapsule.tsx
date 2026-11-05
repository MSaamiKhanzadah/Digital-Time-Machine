import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  LockKeyhole,
  Pencil,
  Plus,
  Save,
  Trash2,
} from 'lucide-react'
import usePredictions, {
  type Prediction,
  type PredictionDraft,
} from '../hooks/usePredictions'
import '../styles/capsule.css'

function emptyDraft(): PredictionDraft {
  return {
    title: '',
    prediction: '',
    targetYear: new Date().getFullYear() + 10,
    confidence: 60,
    reasoning: '',
  }
}
function dateLabel(iso: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso))
}

export default function PredictionCapsule() {
  const {
    predictions,
    warning,
    persistence,
    canRetry,
    create,
    update,
    remove,
    retrySave,
  } = usePredictions()
  const [editing, setEditing] = useState<string | 'new' | null>(null)
  const [draft, setDraft] = useState<PredictionDraft>(emptyDraft)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [revisited, setRevisited] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const titleInput = useRef<HTMLInputElement>(null)
  const createButton = useRef<HTMLButtonElement>(null)
  const cancelDelete = useRef<HTMLButtonElement>(null)
  const revisitHeading = useRef<HTMLHeadingElement>(null)
  const currentYear = new Date().getFullYear()
  const items = [...predictions].sort(
    (a, b) =>
      Date.parse(b.createdAt) - Date.parse(a.createdAt) ||
      a.id.localeCompare(b.id),
  )
  const selected = predictions.find((item) => item.id === revisited)
  useEffect(() => {
    if (editing) titleInput.current?.focus()
  }, [editing])
  useEffect(() => {
    if (deleting) cancelDelete.current?.focus()
  }, [deleting])
  useEffect(() => {
    if (revisited) revisitHeading.current?.focus()
  }, [revisited])

  function openForm(item?: Prediction) {
    setDraft(
      item
        ? {
            title: item.title,
            prediction: item.prediction,
            targetYear: item.targetYear,
            confidence: item.confidence,
            reasoning: item.reasoning,
          }
        : emptyDraft(),
    )
    setEditing(item?.id ?? 'new')
    setError('')
    setNotice('')
    setDeleting(null)
    setRevisited(null)
  }
  function finishForm() {
    const previous = editing
    setEditing(null)
    setError('')
    requestAnimationFrame(() => {
      if (previous && previous !== 'new')
        document.getElementById(`capsule-edit-${previous}`)?.focus()
      else createButton.current?.focus()
    })
  }
  function save(event: FormEvent) {
    event.preventDefault()
    const result = editing === 'new' ? create(draft) : update(editing!, draft)
    if (result.error) {
      setError(result.error)
      return
    }
    setNotice(
      result.saved
        ? 'Prediction saved in this browser.'
        : 'Prediction kept for this session only. It has not been saved to browser storage.',
    )
    finishForm()
  }
  function cancelDeletion(id: string) {
    setDeleting(null)
    requestAnimationFrame(() =>
      document.getElementById(`capsule-delete-${id}`)?.focus(),
    )
  }

  return (
    <section className="capsule-explorer" aria-labelledby="capsule-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">A NOTE TO YOUR FUTURE SELF</span>
          <h2 id="capsule-heading">
            What happens next<span className="accent-text">?</span>
          </h2>
          <p>
            Make a prediction about technology. Record why you believe it, then
            return to see how your thinking changes.
          </p>
        </div>
        <LockKeyhole
          className="capsule-heading-icon"
          size={33}
          aria-hidden="true"
        />
      </div>
      <div className="capsule-toolbar">
        <div className="capsule-local">
          <LockKeyhole size={14} aria-hidden="true" />
          <span>
            LOCAL ONLY
            <span>Stored in this browser. No account or cloud backup.</span>
          </span>
        </div>
        <button
          ref={createButton}
          type="button"
          className="feature-button"
          onClick={() => openForm()}
          disabled={editing !== null}
        >
          <Plus size={15} aria-hidden="true" />
          New prediction
        </button>
      </div>
      {warning && (
        <div className="capsule-warning" role="alert">
          <strong>Storage notice</strong>
          <p>{warning}</p>
          {canRetry && (
            <button
              type="button"
              className="feature-button secondary"
              onClick={() => {
                const saved = retrySave()
                setNotice(
                  saved
                    ? 'Collection saved in this browser.'
                    : 'Still available for this session only. Browser storage has not saved these changes.',
                )
              }}
            >
              Try saving again
            </button>
          )}
        </div>
      )}
      <p className="capsule-status" role="status">
        {notice ||
          (persistence === 'session'
            ? 'Session only · browser storage has not saved these changes.'
            : `${predictions.length} ${predictions.length === 1 ? 'prediction' : 'predictions'} · ${persistence === 'saved' ? 'saved in this browser' : 'browser storage ready'}`)}
      </p>
      {editing !== null && (
        <form
          className="capsule-form"
          onSubmit={save}
          aria-labelledby="capsule-form-heading"
        >
          <div className="capsule-form-top">
            <span className="feature-label">
              {editing === 'new'
                ? 'START A NEW CAPSULE'
                : 'REVISE YOUR THINKING'}
            </span>
            <h3 id="capsule-form-heading">
              {editing === 'new'
                ? 'A glimpse of the future.'
                : 'Edit your prediction.'}
            </h3>
            <p>
              {editing === 'new'
                ? 'Give your idea a date, a confidence level, and a reason.'
                : 'Your original creation date stays with this prediction.'}
            </p>
          </div>
          {error && (
            <p
              id="capsule-form-error"
              className="capsule-form-error"
              role="alert"
            >
              {error}
            </p>
          )}
          <label className="feature-form-label" htmlFor="capsule-title">
            Title{' '}
            <input
              id="capsule-title"
              ref={titleInput}
              className="feature-input"
              value={draft.title}
              maxLength={80}
              required
              onChange={(event) =>
                setDraft({ ...draft, title: event.target.value })
              }
              placeholder="A world powered by…"
              aria-describedby={error ? 'capsule-form-error' : undefined}
            />
          </label>
          <label className="feature-form-label" htmlFor="capsule-prediction">
            Your prediction{' '}
            <textarea
              id="capsule-prediction"
              aria-label="Your prediction"
              className="feature-input"
              value={draft.prediction}
              maxLength={1000}
              required
              rows={4}
              onChange={(event) =>
                setDraft({ ...draft, prediction: event.target.value })
              }
              placeholder="By this year, I think…"
            />
            <span className="capsule-field-hint">
              {draft.prediction.length} / 1,000 characters
            </span>
          </label>
          <div className="capsule-form-pair">
            <label className="feature-form-label" htmlFor="capsule-year">
              Target year{' '}
              <input
                id="capsule-year"
                aria-label="Target year"
                className="feature-input"
                type="number"
                min={currentYear + 1}
                max={2100}
                step={1}
                required
                value={Number.isNaN(draft.targetYear) ? '' : draft.targetYear}
                onChange={(event) =>
                  setDraft({ ...draft, targetYear: event.target.valueAsNumber })
                }
              />
              <span className="capsule-field-hint">{currentYear + 1}–2100</span>
            </label>
            <label className="feature-form-label" htmlFor="capsule-confidence">
              Confidence (%){' '}
              <input
                id="capsule-confidence"
                aria-label="Confidence (%)"
                className="feature-input"
                type="number"
                min={0}
                max={100}
                step={1}
                required
                value={Number.isNaN(draft.confidence) ? '' : draft.confidence}
                onChange={(event) =>
                  setDraft({ ...draft, confidence: event.target.valueAsNumber })
                }
              />
              <span className="capsule-field-hint">
                0 = uncertain · 100 = certain
              </span>
            </label>
          </div>
          <label className="feature-form-label" htmlFor="capsule-reasoning">
            Reasoning <span className="capsule-optional">Optional</span>
            <textarea
              id="capsule-reasoning"
              aria-label="Reasoning"
              className="feature-input"
              value={draft.reasoning}
              maxLength={1000}
              rows={3}
              onChange={(event) =>
                setDraft({ ...draft, reasoning: event.target.value })
              }
              placeholder="What makes this seem possible?"
            />
            <span className="capsule-field-hint">
              {draft.reasoning.length} / 1,000 characters
            </span>
          </label>
          <div className="capsule-form-actions">
            <button type="submit" className="feature-button">
              <Save size={14} aria-hidden="true" />
              {persistence === 'session' && !canRetry
                ? 'Keep for this session'
                : 'Save prediction'}
            </button>
            <button
              type="button"
              className="feature-button secondary"
              onClick={finishForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {selected && (
        <article
          className="capsule-revisit"
          aria-labelledby="capsule-revisit-heading"
        >
          <span className="feature-label">OPENED FOR REFLECTION</span>
          <h3 id="capsule-revisit-heading" ref={revisitHeading} tabIndex={-1}>
            {selected.title}
          </h3>
          <p className="capsule-revisit-prediction">{selected.prediction}</p>
          <p className="capsule-revisit-meta">
            Written {dateLabel(selected.createdAt)} · Target{' '}
            {selected.targetYear} · {selected.confidence}% confidence
          </p>
          <h4>Your original reasoning</h4>
          <p>{selected.reasoning || 'No reasoning was recorded.'}</p>
          <div className="capsule-reflection">
            <Clock3 size={18} aria-hidden="true" />
            <p>
              {selected.targetYear <= currentYear
                ? 'The target year has arrived. What happened, and what would you predict differently today?'
                : `You’re looking toward ${selected.targetYear}. What new evidence would change your confidence?`}
            </p>
          </div>
          <div className="capsule-form-actions">
            <button
              type="button"
              className="feature-button"
              onClick={() => openForm(selected)}
            >
              <Pencil size={13} aria-hidden="true" />
              Edit this prediction
            </button>
            <button
              type="button"
              className="feature-button secondary"
              onClick={() => {
                const id = revisited
                setRevisited(null)
                requestAnimationFrame(() =>
                  document.getElementById(`capsule-revisit-${id}`)?.focus(),
                )
              }}
            >
              Close reflection
            </button>
          </div>
        </article>
      )}
      {!items.length && editing === null ? (
        <div className="capsule-empty">
          <div className="capsule-illustration" aria-hidden="true">
            <span>TO: THE FUTURE</span>
            <Clock3 size={45} strokeWidth={1} />
            <i>OPEN WHEN CURIOUS</i>
          </div>
          <div>
            <span className="feature-label">
              THE COLLECTION STARTS WITH YOU
            </span>
            <h3>
              Leave an idea
              <br />
              <em>for tomorrow.</em>
            </h3>
            <p>
              Will computers feel different in ten years? Will a familiar
              technology disappear? Put your hunch on record.
            </p>
            <button
              type="button"
              className="feature-button"
              onClick={() => openForm()}
            >
              Write your first prediction
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        items.length > 0 && (
          <div className="capsule-collection">
            <div className="capsule-collection-heading">
              <h3>Your predictions</h3>
              <span>NEWEST FIRST · ORIGINAL CREATION DATE</span>
            </div>
            <div className="capsule-grid">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="capsule-card"
                  aria-label={`Prediction: ${item.title}`}
                >
                  <div className="capsule-card-top">
                    <span className="feature-label">LOOKING TOWARD</span>
                    <span className="capsule-target">{item.targetYear}</span>
                  </div>
                  <h4>{item.title}</h4>
                  <p className="capsule-card-prediction">{item.prediction}</p>
                  <div className="capsule-confidence">
                    <span>{item.confidence}% confidence</span>
                    <span
                      className="capsule-confidence-track"
                      aria-hidden="true"
                    >
                      <i style={{ width: `${item.confidence}%` }} />
                    </span>
                  </div>
                  <div className="capsule-created">
                    <CalendarDays size={12} aria-hidden="true" />
                    <time dateTime={item.createdAt}>
                      Created {dateLabel(item.createdAt)}
                    </time>
                  </div>
                  {deleting === item.id ? (
                    <div
                      className="capsule-delete-confirm"
                      role="group"
                      aria-label={`Confirm deletion of ${item.title}`}
                    >
                      <p>Delete this prediction?</p>
                      <button
                        type="button"
                        className="capsule-confirm-delete"
                        onClick={() => {
                          const saved = remove(item.id)
                          setDeleting(null)
                          if (revisited === item.id) setRevisited(null)
                          setNotice(
                            saved
                              ? 'Prediction deleted from this browser.'
                              : 'Prediction removed for this session only. The stored collection has not been updated.',
                          )
                          createButton.current?.focus()
                        }}
                      >
                        Delete permanently
                      </button>
                      <button
                        type="button"
                        ref={cancelDelete}
                        onClick={() => cancelDeletion(item.id)}
                      >
                        Keep prediction
                      </button>
                    </div>
                  ) : (
                    <div className="capsule-card-actions">
                      <button
                        type="button"
                        id={`capsule-revisit-${item.id}`}
                        onClick={() => {
                          setRevisited(item.id)
                          setEditing(null)
                          setError('')
                        }}
                      >
                        <Clock3 size={13} aria-hidden="true" />
                        Revisit
                      </button>
                      <button
                        type="button"
                        id={`capsule-edit-${item.id}`}
                        onClick={() => openForm(item)}
                      >
                        <Pencil size={12} aria-hidden="true" />
                        Edit
                      </button>
                      <button
                        type="button"
                        id={`capsule-delete-${item.id}`}
                        onClick={() => setDeleting(item.id)}
                      >
                        <Trash2 size={12} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )
      )}
      <p className="feature-notice">
        This capsule belongs to this browser on this device. Clearing site data
        or using a different browser can remove or hide your collection. It has
        no scheduled delivery, automatic reminders, or cloud backup.
      </p>
    </section>
  )
}
