import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react'
import { timelineYears, type EraYear } from '../data/history'

const available: EraYear[] = [1995, 2010, 2026]

export default function Timeline({
  year,
  onChange,
}: {
  year: EraYear
  onChange: (year: EraYear) => void
}) {
  const index = available.indexOf(year)
  return (
    <section
      className="timeline-section"
      aria-label="Choose your era"
      id="eras"
    >
      <div className="timeline-heading">
        <span className="micro-label">
          PICK A YEAR. CHANGE YOUR PERSPECTIVE.
        </span>
        <span className="timeline-hint">
          <i /> 3 ERAS READY TO EXPLORE
        </span>
      </div>
      <div className="timeline-track">
        {timelineYears.map((item) => {
          const enabled = available.includes(item as EraYear)
          return (
            <button
              key={item}
              className={`timeline-stop ${item === year ? 'is-selected' : ''}`}
              disabled={!enabled}
              onClick={() => onChange(item as EraYear)}
              aria-pressed={enabled ? item === year : undefined}
              aria-label={`${item}${enabled ? ', explore this era' : ', coming soon'}`}
            >
              <span className="timeline-year">{item}</span>
              <span className="timeline-rail">
                <i />
              </span>
              <span className="timeline-caption">
                {enabled ? (
                  item === 1995 ? (
                    'The early web'
                  ) : item === 2010 ? (
                    'The social web'
                  ) : (
                    'The AI age'
                  )
                ) : (
                  <>
                    <LockKeyhole size={10} /> Coming soon
                  </>
                )}
              </span>
            </button>
          )
        })}
      </div>
      <div className="timeline-mobile-controls">
        <button
          disabled={index === 0}
          onClick={() => onChange(available[index - 1])}
          aria-label="Previous available era"
        >
          <ArrowLeft size={17} />
        </button>
        <span>EXPLORE {index + 1} / 3</span>
        <button
          disabled={index === available.length - 1}
          onClick={() => onChange(available[index + 1])}
          aria-label="Next available era"
        >
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  )
}
