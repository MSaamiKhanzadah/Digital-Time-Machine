import { useState } from 'react'
import { ArrowUpRight, Monitor, Scale } from 'lucide-react'
import { computerSpecLabels, museumComputers } from '../data/computers'
import DeviceArt from './DeviceArt'
import '../styles/collections.css'

export default function ComputerMuseum() {
  const [selectedId, setSelectedId] = useState('ibm-pc')
  const [firstId, setFirstId] = useState('ibm-pc')
  const [secondId, setSecondId] = useState('m1-air')
  const selected =
    museumComputers.find((item) => item.id === selectedId) ?? museumComputers[0]
  const first =
    museumComputers.find((item) => item.id === firstId) ?? museumComputers[0]
  const second =
    museumComputers.find((item) => item.id === secondId) ?? museumComputers[5]

  return (
    <section className="computer-museum" aria-labelledby="computer-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">
            SIX WINDOWS INTO PERSONAL COMPUTING
          </span>
          <h2 id="computer-heading">
            Meet the machines<span className="accent-text">.</span>
          </h2>
          <p>
            Open an exhibit to inspect its configuration, then compare two
            machines across the decades.
          </p>
        </div>
        <Monitor size={34} aria-hidden="true" />
      </div>
      <div
        className="computer-gallery"
        role="group"
        aria-label="Computer exhibits"
      >
        {museumComputers.map((computer) => (
          <button
            key={computer.id}
            type="button"
            className="computer-card"
            aria-pressed={selectedId === computer.id}
            onClick={() => setSelectedId(computer.id)}
          >
            <DeviceArt
              variant={
                computer.id === 'ibm-pc'
                  ? 'ibm'
                  : computer.id === 'macintosh'
                    ? 'macintosh'
                    : computer.id === 'mac-mini'
                      ? 'mini'
                      : undefined
              }
              year={computer.illustrationEra}
              category="computers"
            />
            <span className="computer-card-year">{computer.year}</span>
            <strong>{computer.name}</strong>
            <span className="computer-card-action">
              Inspect exhibit <ArrowUpRight size={12} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      <p className="computer-art-note">
        Original interpretive illustrations evoke each period; they are not
        photographs or exact depictions of the listed models.
      </p>
      <article
        className="computer-detail"
        aria-labelledby="computer-detail-title"
        aria-live="polite"
      >
        <div className="computer-detail-copy">
          <span className="feature-label">
            {selected.year} / {selected.manufacturer}
          </span>
          <h3 id="computer-detail-title">{selected.name}</h3>
          <p>{selected.significance}</p>
          <p className="computer-config-note">{selected.note}</p>
          <a
            className="feature-source"
            href={selected.source.url}
            target="_blank"
            rel="noreferrer"
          >
            {selected.source.label}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <dl className="computer-specs">
          {computerSpecLabels.map(([key, label]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{selected[key]}</dd>
            </div>
          ))}
        </dl>
      </article>
      <section
        className="computer-comparison"
        aria-labelledby="computer-comparison-heading"
      >
        <div className="computer-comparison-heading">
          <div>
            <span className="feature-label">SIDE BY SIDE</span>
            <h3 id="computer-comparison-heading">Compare two configurations</h3>
          </div>
          <Scale size={25} aria-hidden="true" />
        </div>
        <div className="computer-comparison-controls">
          <label>
            First computer
            <select
              aria-label="First computer"
              value={firstId}
              onChange={(event) => setFirstId(event.target.value)}
            >
              {museumComputers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.year} · {item.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Second computer
            <select
              aria-label="Second computer"
              value={secondId}
              onChange={(event) => setSecondId(event.target.value)}
            >
              {museumComputers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.year} · {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div
          className="computer-table-scroll"
          role="region"
          aria-label="Computer specification comparison"
          tabIndex={0}
        >
          <table className="computer-comparison-table">
            <caption>
              Specifications for {first.name} and {second.name}
            </caption>
            <thead>
              <tr>
                <th scope="col">Specification</th>
                <th scope="col">{first.name}</th>
                <th scope="col">{second.name}</th>
              </tr>
            </thead>
            <tbody>
              {computerSpecLabels.map(([key, label]) => (
                <tr key={key}>
                  <th scope="row">{label}</th>
                  <td>{first[key]}</td>
                  <td>{second[key]}</td>
                </tr>
              ))}
              <tr>
                <th scope="row">Source</th>
                {[first, second].map((item, index) => (
                  <td key={index}>
                    <a
                      className="feature-source"
                      href={item.source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.source.label}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="feature-notice">
          Prices are nominal US launch prices where listed, without inflation
          adjustment. Clock speed alone does not compare performance across
          processor architectures. The Windows 95 entry describes OS
          requirements rather than a particular retail computer.
        </p>
      </section>
    </section>
  )
}
