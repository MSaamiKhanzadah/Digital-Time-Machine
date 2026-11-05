import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Clock3,
  Github,
  History,
  MoveUpRight,
  Sparkles,
} from 'lucide-react'
import { eras, type EraYear } from './data/history'
import { milestones, type TimelineYear } from './data/timeline'
import TimeCore from './components/TimeCore'
import Timeline from './components/Timeline'
import Museum from './components/Museum'
import ArchiveSnapshot from './components/ArchiveSnapshot'
import './styles/experience.css'

const ExploreHub = lazy(() => import('./components/ExploreHub'))
const ExperienceHub = lazy(() => import('./components/ExperienceHub'))

type View = 'travel' | 'explore' | 'experience'
function viewForHash(): View {
  if (
    [
      '#explore',
      '#compare',
      '#evolution',
      '#ai',
      '#companies',
      '#computers',
    ].includes(location.hash)
  )
    return 'explore'
  if (
    ['#experience', '#desktop', '#web-lab', '#challenges', '#capsule'].includes(
      location.hash,
    )
  )
    return 'experience'
  return 'travel'
}
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
        TIME MACHINE
      </span>
    </a>
  )
}
export default function App() {
  const [selectedYear, setSelectedYear] = useState<TimelineYear>(2026)
  const [view, setView] = useState<View>(viewForHash)
  const [visited, setVisited] = useState({
    travel: view === 'travel',
    explore: view === 'explore',
    experience: view === 'experience',
  })
  useEffect(() => {
    setVisited((current) =>
      current[view] ? current : { ...current, [view]: true },
    )
  }, [view])
  const [transitioning, setTransitioning] = useState(false)
  const [traveling, setTraveling] = useState(false)
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const travelTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const immersive = milestones[selectedYear].immersive
  const year: EraYear = immersive ?? 2026
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
  useEffect(() => {
    const onHashChange = () => {
      setView(viewForHash())
      requestAnimationFrame(() =>
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: 'instant', block: 'start' }),
      )
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])
  useEffect(
    () => () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current)
      if (travelTimer.current) clearTimeout(travelTimer.current)
    },
    [],
  )
  function selectEra(next: TimelineYear) {
    if (next === selectedYear) return
    setSelectedYear(next)
    setTransitioning(true)
    if (transitionTimer.current) clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => setTransitioning(false), 700)
  }
  function travel() {
    setTraveling(true)
    document.getElementById('museum')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
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
      <a
        className="skip-link"
        href={view === 'travel' ? '#museum' : `#${view}-heading`}
      >
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="main-navigation" aria-label="Main navigation">
            {(['travel', 'explore', 'experience'] as View[]).map(
              (item, index) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setView(item)}
                  aria-current={view === item ? 'page' : undefined}
                >
                  <span className="nav-index">0{index + 1}</span>
                  {item === 'travel'
                    ? 'Travel Through Time'
                    : item === 'explore'
                      ? 'Explore Technology'
                      : 'Experience the Past'}
                </a>
              ),
            )}
          </nav>
          <div className="header-status">
            <i />
            <span>SYSTEM ONLINE</span>
            <span className="status-time">1950 — 2026</span>
          </div>
        </div>
      </header>
      <main>
        <div hidden={view !== 'travel'} id="travel" className="view-panel">
          <section className="hero page-width" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="tiny-star" aria-hidden="true">
                  <Asterisk size={20} strokeWidth={1.2} />
                </span>{' '}
                AN INTERACTIVE JOURNEY THROUGH TECHNOLOGY
              </div>
              <h1 id="hero-title" key={selectedYear}>
                {immersive ? era.headline[0] : 'Every era'}
                <br />
                <em>{immersive ? era.headline[1] : 'has a story.'}</em>
              </h1>
              <p className="hero-intro">
                {immersive ? era.intro : milestones[selectedYear].description}
              </p>
              <div className="hero-actions">
                <button className="travel-button" onClick={travel}>
                  {traveling
                    ? `Arriving in ${selectedYear}…`
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
                    Twelve destinations. Three immersive eras. One time machine.
                  </span>
                </p>
                <ArrowDownRight className="hero-bottom-arrow" size={23} />
              </div>
            </div>
            <div className="hero-visual">
              <TimeCore year={year} destination={selectedYear} />
              <div className="visual-caption">
                <span>
                  <i /> NOW EXPLORING <strong>{selectedYear}</strong>
                </span>
                <span>
                  {immersive ? era.label : 'Historical snapshot'}{' '}
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </section>
          <div className="page-width">
            <Timeline year={selectedYear} onChange={selectEra} />
          </div>
          <div className="era-strip">
            <div className="page-width">
              <span>
                <Sparkles size={15} />
                {immersive ? era.signal : 'THE ARCHIVE IS OPEN'}
              </span>
              <span>
                EVERY BREAKTHROUGH HAS A BACKSTORY.
                <ArrowDown size={14} />
              </span>
            </div>
          </div>
          <div className="page-width">
            {immersive ? (
              <Museum year={year} />
            ) : (
              <ArchiveSnapshot year={selectedYear} onSelect={selectEra} />
            )}
          </div>
          <div className="journey-paths page-width">
            <a href="#explore" onClick={() => setView('explore')}>
              <span className="micro-label">FOLLOW THE IDEAS</span>
              <strong>
                Explore Technology <ArrowUpRight size={20} />
              </strong>
              <p>
                Trace connections and compare the tools that changed our lives.
              </p>
            </a>
            <a href="#experience" onClick={() => setView('experience')}>
              <span className="micro-label">GET YOUR HANDS ON HISTORY</span>
              <strong>
                Experience the Past <ArrowUpRight size={20} />
              </strong>
              <p>
                Open a desktop, browse a different web, and discover by doing.
              </p>
            </a>
          </div>
        </div>
        <div
          hidden={view !== 'explore'}
          id="explore"
          className="view-panel page-width"
        >
          {(view === 'explore' || visited.explore) && (
            <Suspense
              fallback={
                <div className="hub-loading" role="status">
                  <History size={25} />
                  <span>Opening the technology archive…</span>
                </div>
              }
            >
              <ExploreHub />
            </Suspense>
          )}
        </div>
        <div
          hidden={view !== 'experience'}
          id="experience"
          className="view-panel page-width"
        >
          {(view === 'experience' || visited.experience) && (
            <Suspense
              fallback={
                <div className="hub-loading" role="status">
                  <History size={25} />
                  <span>Preparing your playground…</span>
                </div>
              }
            >
              <ExperienceHub />
            </Suspense>
          )}
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
            <a
              href="#eras"
              onClick={() => setView('travel')}
              className="endnote-link"
            >
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
            <Github size={17} />
            Built in the open
            <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DIGITAL TIME MACHINE</span>
          <span>PAST / PRESENT / POSSIBILITY</span>
          <a href="#top" onClick={() => setView('travel')}>
            BACK TO THE FUTURE ↑
          </a>
        </div>
      </footer>
      <div role="status" aria-live="polite" className="sr-only">
        Now exploring {selectedYear},{' '}
        {immersive ? era.label : milestones[selectedYear].title}.
      </div>
    </div>
  )
}
