import { ArrowRight, BookOpen, Check } from 'lucide-react'
import { milestones, type TimelineYear } from '../data/timeline'
import { eras, type EraYear } from '../data/history'

export default function ArchiveSnapshot({
  year,
  onSelect,
}: {
  year: TimelineYear
  onSelect: (year: EraYear) => void
}) {
  const milestone = milestones[year]
  return (
    <section
      id="museum"
      className="archive-snapshot content-section"
      aria-labelledby="museum-heading"
    >
      <div className="section-kicker">
        <span className="section-index">ARCHIVE / {year}</span>
        <span className="era-chip">HISTORICAL SNAPSHOT</span>
      </div>
      <div className="archive-overview">
        <div>
          <h2 id="museum-heading" tabIndex={-1}>
            {milestone.title}
          </h2>
          <p>{milestone.description}</p>
          <ul>
            {milestone.facts.map((fact) => (
              <li key={fact}>
                <Check size={17} />
                {fact}
              </li>
            ))}
          </ul>
          <a
            className="source-link"
            href={milestone.source.url}
            target="_blank"
            rel="noreferrer"
          >
            <BookOpen size={16} />
            Read more · {milestone.source.label}
            <ArrowRight size={15} />
          </a>
        </div>
        <aside>
          <span className="micro-label">READY TO STEP INSIDE?</span>
          <h3>Enter an immersive era.</h3>
          <p>
            This stop is a concise historical overview. Explore a complete
            collection and a transformed interface in these three eras.
          </p>
          {([1995, 2010, 2026] as EraYear[]).map((era) => (
            <button key={era} onClick={() => onSelect(era)}>
              <strong>{era}</strong>
              <span>{eras[era].label}</span>
              <ArrowRight size={16} />
            </button>
          ))}
        </aside>
      </div>
    </section>
  )
}
