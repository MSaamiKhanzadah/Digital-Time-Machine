import { useState } from 'react'
import { ArrowDownUp, ArrowUpRight, MoveRight } from 'lucide-react'
import {
  categories,
  exhibits,
  type CategoryId,
  type EraYear,
} from '../data/history'
import DeviceArt from './DeviceArt'
import { storageExhibits } from '../data/storage'

const years: EraYear[] = [1995, 2010, 2026]

export default function Comparison() {
  const [category, setCategory] = useState<CategoryId | 'storage'>('computers')
  const [from, setFrom] = useState<EraYear>(1995)
  const [to, setTo] = useState<EraYear>(2026)
  return (
    <section
      className="comparison-section content-section"
      id="compare"
      aria-labelledby="comparison-heading"
    >
      <div className="section-kicker">
        <span className="section-index">03 / THEN & NOW</span>
        <span className="micro-label">PROGRESS, SIDE BY SIDE</span>
      </div>
      <div className="section-heading">
        <div>
          <h2 id="comparison-heading">
            Look how far we’ve come<span className="accent-text">.</span>
          </h2>
          <p>Same purpose. A whole different world.</p>
        </div>
        <label className="comparison-category">
          COMPARE
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as CategoryId | 'storage')
            }
          >
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id === 'internet'
                  ? 'Websites'
                  : item.id === 'programming'
                    ? 'Programming tools'
                    : item.id === 'mobile'
                      ? 'Mobile phones'
                      : item.label}
              </option>
            ))}
            <option value="storage">Storage technology</option>
          </select>
        </label>
      </div>
      <div className="comparison-grid">
        {([from, to] as EraYear[]).map((year, side) => {
          const exhibit =
            category === 'storage'
              ? storageExhibits[year]
              : exhibits.find(
                  (item) => item.year === year && item.category === category,
                )!
          return (
            <article className="comparison-card" key={side}>
              <div className="comparison-card-heading">
                <label>
                  {year < (side === 0 ? to : from) ? 'THEN' : 'NOW'}
                  <select
                    aria-label={
                      side === 0 ? 'Compare from era' : 'Compare to era'
                    }
                    value={year}
                    onChange={(event) => {
                      const next = Number(event.target.value) as EraYear
                      if (side === 0) {
                        if (next === to) setTo(from)
                        setFrom(next)
                      } else {
                        if (next === from) setFrom(to)
                        setTo(next)
                      }
                    }}
                  >
                    {years.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <ArrowUpRight size={21} />
              </div>
              <DeviceArt
                year={year}
                category={category === 'storage' ? 'software' : category}
              />
              <div className="comparison-copy">
                <span className="micro-label accent-text">{exhibit.date}</span>
                <h3>{exhibit.name}</h3>
                <p>{exhibit.description}</p>
                <ul>
                  {exhibit.facts.slice(0, 2).map((fact) => (
                    <li key={fact}>
                      <MoveRight size={15} />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
                <a href={exhibit.source.url} target="_blank" rel="noreferrer">
                  Source: {exhibit.source.label}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          )
        })}
        <button
          className="comparison-swap"
          onClick={() => {
            setFrom(to)
            setTo(from)
          }}
          aria-label="Swap comparison eras"
        >
          <ArrowDownUp size={20} />
        </button>
      </div>
      <div className="comparison-caption">
        <span className="micro-label">
          {Math.abs(to - from)} YEARS OF EVOLUTION
        </span>
        <p>Technology changes. Our curiosity stays the same.</p>
      </div>
    </section>
  )
}
