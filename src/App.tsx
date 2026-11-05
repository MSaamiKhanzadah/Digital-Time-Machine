import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Clock3,
  Command,
  Github,
  History,
  MoveUpRight,
  Sparkles,
} from 'lucide-react'
import { eras, type EraYear } from './data/history'
import TimeCore from './components/TimeCore'
import Timeline from './components/Timeline'
import Museum from './components/Museum'
import Comparison from './components/Comparison'
import DesktopSimulation from './components/DesktopSimulation'

function Logo({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${small ? 'brand-small' : ''}`}
      aria-label="Digital Time Machine home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 40 40">
          <path d="M9 29V11h17v18M16 29V18h17v11M6 29h29" />
        </svg>
      </span>
      <span>
        DIGITAL
        <br />
        TIME MACHINE<span className="brand-dot">®</span>
      </span>
    </a>
  )
}

export default function App() {
  const [year, setYear] = useState<EraYear>(2026)
  const [transitioning, setTransitioning] = useState(false)
  const [traveling, setTraveling] = useState(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const travelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const era = eras[year]
  useEffect(() => {
    document.documentElement.dataset.era = String(year)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        'content',
        year === 1995 ? '#c0c0c0' : year === 2010 ? '#e7f2fa' : '#f5f3ed',
      )
  }, [year])
  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current)
      if (travelTimer.current) clearTimeout(travelTimer.current)
    },
    [],
  )
  function selectEra(next: EraYear) {
    if (next === year) return
    setYear(next)
    setTransitioning(true)
    if (transitionTimer.current) clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => setTransitioning(false), 700)
  }
  function travel() {
    setTraveling(true)
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    document.getElementById('museum')?.scrollIntoView({
      behavior: reduced ? 'instant' : 'smooth',
      block: 'start',
    })
    document.getElementById('museum-heading')?.focus({ preventScroll: true })
    if (travelTimer.current) clearTimeout(travelTimer.current)
    travelTimer.current = setTimeout(() => setTraveling(false), 800)
  }
  return (
    <div
      className={`app-shell era-${year} ${transitioning ? 'era-arriving' : ''}`}
      id="top"
    >
      <a className="skip-link" href="#museum">
        Skip to the museum
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav aria-label="Main navigation">
            <a href="#eras">Explore eras</a>
            <a href="#desktop">The time capsule</a>
            <a href="#compare">
              Then & now <ArrowUpRight size={12} />
            </a>
          </nav>
          <div className="header-status">
            <i />
            <span>SYSTEM ONLINE</span>
            <span className="status-time">EST. 1995</span>
          </div>
        </div>
      </header>
      <main>
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="tiny-star" aria-hidden="true">
                <Asterisk size={20} strokeWidth={1.2} />
              </span>{' '}
              AN INTERACTIVE JOURNEY THROUGH TECHNOLOGY
            </div>
            <h1 id="hero-title" key={year}>
              {era.headline[0]}
              <br />
              <em>{era.headline[1]}</em>
            </h1>
            <p className="hero-intro">{era.intro}</p>
            <div className="hero-actions">
              <button className="travel-button" onClick={travel}>
                {traveling
                  ? 'Arriving in ' + year + '…'
                  : 'Travel Through Time'}
                <ArrowUpRight size={20} />
              </button>
              <span className="hero-hint">
                <Clock3 size={15} /> No flux capacitor required.
              </span>
            </div>
            <div className="hero-bottom">
              <span className="hero-mini-icon">
                <History size={18} />
              </span>
              <p>
                <strong>Experience the Evolution of Technology.</strong>
                <span>
                  Three eras. Countless discoveries. One time machine.
                </span>
              </p>
              <ArrowDownRight className="hero-bottom-arrow" size={23} />
            </div>
          </div>
          <div className="hero-visual">
            <TimeCore year={year} />
            <div className="visual-caption">
              <span>
                <i /> NOW EXPLORING <strong>{year}</strong>
              </span>
              <span>
                {era.label} <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </section>
        <div className="page-width">
          <Timeline year={year} onChange={selectEra} />
        </div>
        <div className="era-strip">
          <div className="page-width">
            <span>
              <Sparkles size={15} /> {era.signal}
            </span>
            <span>
              {year === 1995
                ? 'YOU’VE GOT A WHOLE NEW WORLD TO DISCOVER.'
                : year === 2010
                  ? 'LIKE. SHARE. CONNECT. REPEAT.'
                  : 'TODAY’S ORDINARY WAS YESTERDAY’S IMPOSSIBLE.'}
              <ArrowDown size={14} />
            </span>
          </div>
        </div>
        <div className="page-width">
          <Museum year={year} />
          <section
            className="desktop-section content-section"
            id="desktop"
            aria-labelledby="desktop-heading"
          >
            <div className="section-kicker">
              <span className="section-index">02 / THE TIME CAPSULE</span>
              <span className="era-chip">
                <span aria-hidden="true">▣</span> INTERACTIVE / 1995
              </span>
            </div>
            <div className="section-heading">
              <div>
                <h2 id="desktop-heading">
                  Less scrolling. More clicking
                  <span className="accent-text">.</span>
                </h2>
                <p>Back when the desktop was a place. Make yourself at home.</p>
              </div>
              <span className="desktop-instruction">
                <Command size={16} /> CLICK, DRAG & DISCOVER
              </span>
            </div>
            <DesktopSimulation />
            <div className="desktop-caption">
              <span>
                <i /> A LIGHTWEIGHT SIMULATION, INSPIRED BY WINDOWS 95
              </span>
              <span>
                Open a folder. Browse the early web. Feel the nostalgia.
              </span>
            </div>
          </section>
          <Comparison />
        </div>
        <section className="endnote">
          <div className="page-width endnote-inner">
            <Asterisk
              className="endnote-symbol"
              size={105}
              strokeWidth={1.3}
              aria-hidden="true"
            />
            <div>
              <span className="micro-label">
                THE NEXT GREAT IDEA STARTS WITH CURIOSITY
              </span>
              <h2>
                Every future begins
                <br />
                with a little <em>wonder.</em>
              </h2>
            </div>
            <a href="#eras" className="endnote-link">
              Take another trip <MoveUpRight size={24} />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer page-width">
        <div className="footer-top">
          <Logo small />
          <p>
            A small museum of very big ideas.
            <br />
            Made for the endlessly curious.
          </p>
          <a
            className="github-link"
            href="https://github.com/MSaamiKhanzadah/Digital-Time-Machine"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={17} /> Built in the open <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DIGITAL TIME MACHINE</span>
          <span>PAST / PRESENT / POSSIBILITY</span>
          <a href="#top">BACK TO THE FUTURE ↑</a>
        </div>
      </footer>
      <div role="status" aria-live="polite" className="sr-only">
        Now exploring {year}, {era.label}.
      </div>
    </div>
  )
}
