import { ArrowLeft, ArrowRight, ArrowUpRight, Milestone } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { milestones, timelineStops, type TimelineYear } from '../data/timeline'

export default function Timeline({
  year,
  onChange,
}: {
  year: TimelineYear
  onChange: (year: TimelineYear) => void
}) {
  const index = timelineStops.indexOf(year)
  const milestone = milestones[year]
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const rail = track.current
    const selected = rail?.querySelector<HTMLButtonElement>(
      '[aria-pressed="true"]',
    )
    if (!rail || !selected) return
    const left =
      rail.scrollLeft +
      selected.getBoundingClientRect().left -
      rail.getBoundingClientRect().left -
      (rail.clientWidth - selected.clientWidth) / 2
    rail.scrollTo({
      left,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    })
  }, [year])
  return (
    <section
      className="timeline-section expanded-timeline"
      aria-label="Choose your era"
      id="eras"
    >
      <div className="timeline-heading">
        <span className="micro-label">
          76 YEARS OF IDEAS. WHERE WILL YOU GO?
        </span>
        <span className="timeline-hint">
          <i /> 12 DESTINATIONS · 3 IMMERSIVE ERAS
        </span>
      </div>
      <div
        className="timeline-track"
        ref={track}
        role="group"
        aria-label="Timeline destinations"
      >
        {timelineStops.map((item) => (
          <button
            key={item}
            className={`timeline-stop ${item === year ? 'is-selected' : ''}`}
            onClick={() => onChange(item)}
            aria-pressed={item === year}
            aria-label={`${item}, explore this era`}
          >
            <span className="timeline-year">{item}</span>
            <span className="timeline-rail">
              <i />
            </span>
            <span className="timeline-caption">
              {milestones[item].immersive
                ? 'Full experience'
                : 'Archive snapshot'}
            </span>
          </button>
        ))}
      </div>
      <div className="timeline-range">
        <span>1950</span>
        <label className="sr-only" htmlFor="year-slider">
          Travel year
        </label>
        <input
          id="year-slider"
          type="range"
          min={0}
          max={timelineStops.length - 1}
          step={1}
          value={index}
          aria-valuetext={`${year}: ${milestone.title}`}
          onChange={(event) =>
            onChange(timelineStops[Number(event.target.value)])
          }
        />
        <span>2026</span>
        <div className="timeline-step-controls">
          <button
            disabled={index === 0}
            onClick={() => onChange(timelineStops[index - 1])}
            aria-label="Previous timeline destination"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            disabled={index === timelineStops.length - 1}
            onClick={() => onChange(timelineStops[index + 1])}
            aria-label="Next timeline destination"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <div className="timeline-milestone" aria-live="polite">
        <span className="milestone-year">
          <Milestone size={20} />
          {year}
        </span>
        <div>
          <span className="micro-label">
            {milestone.immersive
              ? 'IMMERSIVE COLLECTION'
              : 'HISTORICAL SNAPSHOT'}
          </span>
          <h2>{milestone.title}</h2>
          <p>{milestone.subtitle}</p>
        </div>
        <a
          href={milestone.source.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Read the source for ${year}: ${milestone.source.label}`}
        >
          Source <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  )
}
