import { useId, useState } from 'react'
import type { ComponentType, FormEvent, MouseEvent, ReactNode } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Globe2,
  Home,
  LockKeyhole,
  RotateCw,
  Search,
  Sparkles,
} from 'lucide-react'
import {
  rankedWebArticles,
  webArticles,
  webEras,
  webSources,
  webYears,
  historicalSites,
} from '../data/webHistory'
import type {
  HistoricalSiteId,
  WebArticleId,
  WebYear,
} from '../data/webHistory'
import type { HistoricalSiteProps } from '../types/historicalBrowser'
import { siteDesignContext, siteReferences } from '../data/siteEvolution'
import '../styles/web-lab.css'
import YouTubeSite from './historical-sites/YouTubeSite'
import AmazonSite from './historical-sites/AmazonSite'
import WikipediaSite from './historical-sites/WikipediaSite'
import FacebookSite from './historical-sites/FacebookSite'

type BrowserRoute =
  | { kind: 'home' }
  | { kind: 'search'; query: string }
  | { kind: 'reading'; article: WebArticleId; query: string }
  | { kind: 'missing'; address: string; site?: HistoricalSiteId }
  | { kind: 'site'; site: Exclude<HistoricalSiteId, 'google'>; path: string }
type CodeLanguage = 'HTML' | 'CSS' | 'JavaScript'
export type HistoricalSiteRenderers = Partial<
  Record<HistoricalSiteId, ComponentType<HistoricalSiteProps>>
>

function routeAddress(route: BrowserRoute): string {
  if (route.kind === 'home') return 'google.local'
  if (route.kind === 'search')
    return `google.local/search?q=${encodeURIComponent(route.query)}`
  if (route.kind === 'reading') return `history.local/${route.article}`
  if (route.kind === 'site')
    return `${route.site}.local${route.path === '/' ? '' : route.path}`
  return route.address
}

function Wordmark({ year, small = false }: { year: WebYear; small?: boolean }) {
  return (
    <div
      className={`web-lab-wordmark ${small ? 'web-lab-wordmark-small' : ''}`}
      aria-label="Google-inspired search"
    >
      <span>G</span>
      <span>o</span>
      <span>o</span>
      <span>g</span>
      <span>l</span>
      <span>e</span>
      {year === 1998 && !small && <sup>Beta!</sup>}
    </div>
  )
}

function codeFor(year: WebYear, language: CodeLanguage): string {
  if (language === 'HTML')
    return year <= 2005
      ? '<form action="/search" method="get">\n  <p>Search the web:</p>\n  <input name="q" type="text">\n  <input type="submit" value="Google Search">\n</form>\n<!-- A real search needs a server. -->'
      : '<form role="search">\n  <label for="query">Search the web</label>\n  <input id="query" name="q" type="search">\n  <button type="submit">Google Search</button>\n</form>'
  if (language === 'CSS')
    return year === 1995
      ? '/* CSS1 was recommended in 1996.\n   This 1995 scene is rendered with modern\n   CSS as an educational recreation, not\n   code intended for a 1995 browser. */'
      : year <= 2005
        ? '/* Period-inspired presentation. */\nbody { font-family: "Times New Roman", serif; }\n.search-panel {\n  text-align: center;\n  background-color: #eeeeee;\n}'
        : year === 2010
          ? '.search-button {\n  border: 1px solid #aaa;\n  background: #eee;\n  border-radius: 2px;\n}\n/* Support varied across 2010 browsers. */'
          : '.search-box {\n  display: flex;\n  border: 1px solid #dfe1e5;\n  border-radius: 999px;\n}\n@media (max-width: 600px) {\n  .shortcuts { grid-template-columns: 1fr; }\n}'
  return year === 1995
    ? '// JavaScript was created in 1995.\n// Navigator 2.0 beta introduced it later\n// that year. Navigator 1.x did not have\n// this established scripting capability.'
    : year <= 2005
      ? '// An illustrative early-style script.\nfunction showHelp() {\n  alert("Type a topic in the search box.");\n}\n// The search index lived on a server.'
      : year === 2010
        ? '// An illustrative 2010-style handler.\nform.addEventListener("submit", function (event) {\n  event.preventDefault();\n  showLocalResults(input.value);\n});\n// HTML5 was still a draft in 2010.'
        : '// Simplified local recreation logic.\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  showLocalResults(input.value.trim());\n});\n// Examples are read-only; no code is executed.'
}

export function HistoricalBrowser({
  initialYear = 1998,
  initialSite = 'google',
  compact = false,
  siteRenderers = {},
}: {
  initialYear?: WebYear
  initialSite?: HistoricalSiteId
  compact?: boolean
  siteRenderers?: HistoricalSiteRenderers
}) {
  const instanceId = useId()
  const [year, setYear] = useState<WebYear>(initialYear)
  const [history, setHistory] = useState<BrowserRoute[]>([
    initialSite === 'google'
      ? { kind: 'home' }
      : { kind: 'site', site: initialSite, path: '/' },
  ])
  const [position, setPosition] = useState(0)
  const [address, setAddress] = useState(`${initialSite}.local`)
  const [query, setQuery] = useState('')
  const [announcement, setAnnouncement] = useState(
    'Google-inspired homepage loaded locally.',
  )
  const [showChanges, setShowChanges] = useState(false)
  const [showCode, setShowCode] = useState(false)
  const [language, setLanguage] = useState<CodeLanguage>('HTML')
  const route = history[position]
  const selectedSite =
    (route.kind === 'site' || route.kind === 'missing'
      ? route.site
      : 'google') || 'google'
  const site = historicalSites.find((item) => item.id === selectedSite)!
  const SiteComponent = siteRenderers[selectedSite]
  const siteContext = siteDesignContext(selectedSite, year)
  const sceneYear = year === 2001 || year === 2004 ? 2005 : year
  const resultIds = rankedWebArticles(
    route.kind === 'search' ? route.query : query,
  )
  const era = webEras[year]
  const availableSites = historicalSites.filter(
    (item) => item.id === 'google' || siteRenderers[item.id],
  )
  const navigate = (next: BrowserRoute) => {
    setHistory((previous) => [...previous.slice(0, position + 1), next])
    setPosition(position + 1)
    setAddress(routeAddress(next))
    setQuery(
      next.kind === 'search' || next.kind === 'reading' ? next.query : '',
    )
    setAnnouncement(
      next.kind === 'search'
        ? `Local results loaded for ${next.query}.`
        : next.kind === 'reading'
          ? `${webArticles[next.article].title} loaded locally.`
          : next.kind === 'missing'
            ? 'Address not found in this local collection.'
            : 'Homepage loaded locally.',
    )
  }
  const moveHistory = (offset: number) => {
    const nextPosition = position + offset
    if (nextPosition < 0 || nextPosition >= history.length) return
    const next = history[nextPosition]
    setPosition(nextPosition)
    setAddress(routeAddress(next))
    setQuery(
      next.kind === 'search' || next.kind === 'reading' ? next.query : '',
    )
    setAnnouncement(
      `${offset < 0 ? 'Back' : 'Forward'}: ${routeAddress(next)}.`,
    )
  }
  const changeYear = (next: WebYear) => {
    setYear(next)
    setAnnouncement(
      next < site.launched
        ? `${next} selected. ${site.name} launched in ${site.launched}.`
        : `${next} selected. Your page and browsing history are preserved.`,
    )
  }
  const search = (event: FormEvent) => {
    event.preventDefault()
    const cleaned = query.trim()
    if (!cleaned) return
    navigate({ kind: 'search', query: cleaned })
  }
  const visitAddress = (event: FormEvent) => {
    event.preventDefault()
    const entered = address.trim()
    try {
      const url = new URL(
        entered.includes('://') ? entered : `https://${entered}`,
      )
      if (
        !['https:', 'http:'].includes(url.protocol) ||
        url.username ||
        url.password
      )
        throw new Error('Unknown local address')
      if (
        url.hostname === 'google.local' &&
        ['/', '/index.html'].includes(url.pathname)
      )
        navigate({ kind: 'home' })
      else if (
        url.hostname === 'google.local' &&
        url.pathname === '/search' &&
        url.searchParams.get('q')?.trim()
      )
        navigate({ kind: 'search', query: url.searchParams.get('q')!.trim() })
      else if (
        url.hostname === 'history.local' &&
        Object.hasOwn(webArticles, url.pathname.slice(1))
      )
        navigate({
          kind: 'reading',
          article: url.pathname.slice(1) as WebArticleId,
          query,
        })
      else if (
        historicalSites.some(
          (item) => item.id !== 'google' && `${item.id}.local` === url.hostname,
        )
      )
        navigate({
          kind: 'site',
          site: url.hostname.split('.')[0] as Exclude<
            HistoricalSiteId,
            'google'
          >,
          path: `${url.pathname}${url.search}`,
        })
      else navigate({ kind: 'missing', address: entered, site: selectedSite })
    } catch {
      navigate({
        kind: 'missing',
        address: entered || '(empty address)',
        site: selectedSite,
      })
    }
  }
  const localLink = (
    event: MouseEvent<HTMLAnchorElement>,
    next: BrowserRoute,
  ) => {
    event.preventDefault()
    navigate(next)
  }
  const link = (text: ReactNode, next: BrowserRoute, className?: string) => (
    <a
      className={className}
      href="#web-lab"
      onClick={(event) => localLink(event, next)}
    >
      {text}
    </a>
  )
  const searchForm = (results = false) => (
    <form
      className={`web-lab-search-form ${results ? 'web-lab-search-form-results' : ''}`}
      onSubmit={(event) => search(event)}
      role="search"
      aria-label="Local recreated search"
    >
      {!results && year <= 2005 && (
        <label
          className="web-lab-search-label"
          htmlFor={`web-search-${instanceId}`}
        >
          Search the web using Google
        </label>
      )}
      <div className="web-lab-search-box">
        {year >= 2015 && <Search size={19} aria-hidden="true" />}
        <input
          id={`web-search-${instanceId}`}
          aria-label="Search the recreated web"
          type="search"
          autoComplete="off"
          placeholder={
            year >= 2015 ? 'Try “web history” or “computers”' : undefined
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          required
          maxLength={160}
        />
        {results && (
          <button aria-label="Google Search" type="submit">
            <Search size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      {!results && (
        <div className="web-lab-search-actions">
          <button type="submit">Google Search</button>
          <button
            type="button"
            onClick={() => {
              if (query.trim() && !rankedWebArticles(query.trim()).length)
                navigate({ kind: 'search', query: query.trim() })
              else if (query.trim())
                navigate({
                  kind: 'reading',
                  article: rankedWebArticles(query.trim())[0] || 'web',
                  query: query.trim(),
                })
              else
                navigate({
                  kind: 'reading',
                  article: 'web',
                  query: 'web history',
                })
            }}
          >
            I’m Feeling Lucky
          </button>
        </div>
      )}
    </form>
  )

  return (
    <div className={`web-lab ${compact ? 'web-lab-compact' : ''}`}>
      <div className="web-lab-controls">
        <div>
          <span className="feature-label">CHOOSE YOUR YEAR</span>
          <label className="web-lab-mobile-year">
            Browser year
            <select
              aria-label="Browser year"
              value={year}
              onChange={(event) =>
                changeYear(Number(event.target.value) as WebYear)
              }
            >
              {webYears.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
          <div
            className="web-lab-year-options"
            role="group"
            aria-label="Web era"
          >
            {webYears.map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`${value} web era`}
                aria-pressed={year === value}
                onClick={() => changeYear(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="web-lab-site-select">
          <Globe2 size={17} aria-hidden="true" />
          <label>
            Website
            <select
              aria-label="Website"
              value={selectedSite}
              onChange={(event) => {
                const next = event.target.value as HistoricalSiteId
                navigate(
                  next === 'google'
                    ? { kind: 'home' }
                    : { kind: 'site', site: next, path: '/' },
                )
              }}
            >
              {availableSites.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <span className="web-lab-local-badge">LOCAL</span>
        </div>
      </div>
      <div className="web-lab-era-caption">
        <span>{era.title}</span>
        <span>
          {era.browser} / {year}
        </span>
      </div>
      <section
        className={`web-lab-browser web-lab-browser-${sceneYear}`}
        data-year={year}
        aria-label={`${year} simulated browser`}
      >
        <div className="web-lab-browser-title">
          <span>
            <Globe2 size={14} aria-hidden="true" />
            {year < 2010
              ? `${year === 1995 ? 'Netscape-inspired Navigator' : year <= 1998 ? 'Navigator-inspired browser' : 'Microsoft Internet Explorer-inspired'} — ${route.kind === 'reading' ? webArticles[route.article].title : site.name}`
              : `${site.name} — original educational recreation`}
          </span>
          <span className="web-lab-window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        {year < 2010 && (
          <div className="web-lab-menu-bar" aria-hidden="true">
            File <span>Edit</span> View <span>Go</span> Bookmarks{' '}
            <span>Help</span>
          </div>
        )}
        {year >= 2010 && (
          <div className="web-lab-tab-strip">
            <span className="web-lab-current-tab">
              <Globe2 size={13} aria-hidden="true" />
              {route.kind === 'reading' ? 'History reading room' : site.name}
            </span>
          </div>
        )}
        <div className="web-lab-toolbar">
          <div className="web-lab-navigation">
            <button
              type="button"
              aria-label="Browser Back"
              disabled={position === 0}
              onClick={() => moveHistory(-1)}
            >
              <ArrowLeft size={19} aria-hidden="true" />
              {year < 2010 && <span>Back</span>}
            </button>
            <button
              type="button"
              aria-label="Browser Forward"
              disabled={position === history.length - 1}
              onClick={() => moveHistory(1)}
            >
              <ArrowRight size={19} aria-hidden="true" />
              {year < 2010 && <span>Forward</span>}
            </button>
            <button
              type="button"
              aria-label="Browser Refresh"
              onClick={() => {
                setAddress(routeAddress(route))
                setQuery(
                  route.kind === 'search' || route.kind === 'reading'
                    ? route.query
                    : '',
                )
                setAnnouncement(
                  `Page refreshed locally: ${routeAddress(route)}. Browsing history preserved.`,
                )
              }}
            >
              <RotateCw size={17} aria-hidden="true" />
              {year < 2010 && <span>Reload</span>}
            </button>
            <button
              type="button"
              aria-label="Browser Home"
              onClick={() =>
                navigate(
                  selectedSite === 'google'
                    ? { kind: 'home' }
                    : { kind: 'site', site: selectedSite, path: '/' },
                )
              }
            >
              <Home size={17} aria-hidden="true" />
              {year < 2010 && <span>Home</span>}
            </button>
          </div>
          <form className="web-lab-address-form" onSubmit={visitAddress}>
            <label htmlFor={`web-address-${instanceId}`}>
              {year < 2010 ? (
                'Location:'
              ) : (
                <LockKeyhole size={13} aria-label="Local simulation" />
              )}
            </label>
            <input
              id={`web-address-${instanceId}`}
              aria-label="Simulated web address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            <button type="submit" aria-label="Go to simulated address">
              Go
            </button>
          </form>
        </div>
        <div
          className={`web-lab-viewport web-lab-google-${year} web-lab-google-${sceneYear}`}
        >
          {year < site.launched ? (
            <div className="web-lab-unavailable">
              <span className="web-lab-date-stamp">YOU ARE IN {year}</span>
              <h3>{site.name} wasn’t here yet.</h3>
              <p>
                {site.name} launched in {site.launched}.{' '}
                {selectedSite === 'google'
                  ? 'In 1995, people explored the web through directories, links and earlier search engines.'
                  : site.debut}
              </p>
              <p>
                This scene keeps the timeline honest: there is no invented{' '}
                {year} {site.name} homepage.
              </p>
              <button type="button" onClick={() => changeYear(site.launched)}>
                Travel to {site.name}’s {site.launched} debut{' '}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          ) : route.kind === 'missing' ? (
            <div className="web-lab-missing">
              <span className="web-lab-date-stamp">
                LOCAL ADDRESS NOT FOUND
              </span>
              <h3>This address is outside the time machine</h3>
              <p>
                <strong>{route.address}</strong> is not in this small recreated
                collection. No external request was made.
              </p>
              <p>
                Try <code>google.local</code>,{' '}
                <code>google.local/search?q=web</code>, or{' '}
                <code>history.local/web</code>.
              </p>
              <button type="button" onClick={() => navigate({ kind: 'home' })}>
                Return to the search homepage
              </button>
            </div>
          ) : route.kind === 'site' ? (
            SiteComponent ? (
              <SiteComponent
                year={year}
                path={route.path}
                navigate={(path) => {
                  if (
                    path.startsWith('/') &&
                    !path.startsWith('//') &&
                    path.length <= 2048
                  )
                    navigate({ kind: 'site', site: route.site, path })
                  else
                    navigate({
                      kind: 'missing',
                      address: path,
                      site: route.site,
                    })
                }}
              />
            ) : (
              <div className="web-lab-missing">
                <h3>This collection is not available</h3>
                <p>
                  Choose a website from the menu to explore a local recreation.
                </p>
              </div>
            )
          ) : route.kind === 'reading' ? (
            <article className="web-lab-reading">
              <div className="web-lab-reading-masthead">
                <span>THE HISTORY READING ROOM</span>
                <span>{year} EDITION</span>
              </div>
              <span className="web-lab-article-category">
                {webArticles[route.article].category}
              </span>
              <h3>{webArticles[route.article].title}</h3>
              <p className="web-lab-reading-lede">
                {webArticles[route.article].introduction}
              </p>
              {webArticles[route.article].events
                .filter((event) => event.year <= year)
                .map((event) => (
                  <p key={event.year}>
                    <strong>{event.year}</strong> {event.text}
                  </p>
                ))}
              <div className="web-lab-reading-footer">
                Original educational reading · events shown through {year}
                <br />
                {link('← Back to your search results', {
                  kind: 'search',
                  query: route.query || 'web history',
                })}
              </div>
            </article>
          ) : route.kind === 'search' ? (
            <div className="web-lab-results">
              <div className="web-lab-results-top">
                {link(<Wordmark year={year} small />, { kind: 'home' })}
                {searchForm(true)}
              </div>
              <div className="web-lab-results-nav">
                Web <span>Local collection</span>
                <span>{year} edition</span>
              </div>
              <h3>Search results for “{route.query}”</h3>
              <p className="web-lab-result-count">
                {resultIds.length} locally written{' '}
                {resultIds.length === 1 ? 'result' : 'results'} · educational
                mock search
              </p>
              <p className="web-lab-search-context">
                Explore our technology history collection. Results are ranked
                from these three articles, not the live web.
              </p>
              {!resultIds.length && (
                <div className="web-lab-no-results">
                  <h4>No matches in this local collection</h4>
                  <p>
                    Try a topic our three articles cover: web history,
                    computers, or browsers.
                  </p>
                  {link('Explore web history', {
                    kind: 'search',
                    query: 'web history',
                  })}
                </div>
              )}
              {resultIds.map((id) => (
                <article className="web-lab-result" key={id}>
                  <span className="web-lab-result-address">
                    history.local / {id}
                  </span>
                  <h4>
                    {link(
                      webArticles[id].title,
                      { kind: 'reading', article: id, query: route.query },
                      'web-lab-result-link',
                    )}
                  </h4>
                  <p>{webArticles[id].introduction}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="web-lab-google-home">
              <div className="web-lab-google-top-links">
                {year >= 2000 && (
                  <>
                    {link('About Google', {
                      kind: 'reading',
                      article: 'web',
                      query: 'Google',
                    })}
                    {year >= 2005 &&
                      link('Web history', {
                        kind: 'reading',
                        article: 'browsers',
                        query: 'browser history',
                      })}
                  </>
                )}
              </div>
              <div className="web-lab-google-center">
                <Wordmark year={year} />
                {searchForm()}
                {year >= 2010 && (
                  <p className="web-lab-home-prompt">
                    A little curiosity goes a long way. Try{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('web history')
                        navigate({ kind: 'search', query: 'web history' })
                      }}
                    >
                      web history
                    </button>
                    .
                  </p>
                )}
                {year >= 2026 && (
                  <div className="web-lab-modern-shortcuts">
                    {(['web', 'computers', 'browsers'] as WebArticleId[]).map(
                      (id) => (
                        <div key={id}>
                          {link(
                            <>
                              <span className="web-lab-shortcut-icon">
                                {id === 'web' ? (
                                  <Globe2 size={19} />
                                ) : id === 'computers' ? (
                                  <Code2 size={19} />
                                ) : (
                                  <Sparkles size={19} />
                                )}
                              </span>
                              <span>
                                {id === 'web'
                                  ? 'Discover the web'
                                  : id === 'computers'
                                    ? 'Explore computers'
                                    : 'Meet the browser'}
                              </span>
                              <ArrowUpRight size={14} />
                            </>,
                            {
                              kind: 'reading',
                              article: id,
                              query: 'web history',
                            },
                          )}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
              {year === 1998 ? (
                <div className="web-lab-1998-link-table">
                  <div>
                    Special Searches
                    <br />
                    {link('Technology history', {
                      kind: 'search',
                      query: 'technology history',
                    })}
                    <br />
                    {link('Computers', { kind: 'search', query: 'computers' })}
                  </div>
                  <div>
                    {link('Help!', {
                      kind: 'reading',
                      article: 'browsers',
                      query: 'browsers',
                    })}
                    <br />
                    {link('About Google', {
                      kind: 'reading',
                      article: 'web',
                      query: 'Google',
                    })}
                    <br />
                    {link('Search tips', {
                      kind: 'search',
                      query: 'web search',
                    })}
                  </div>
                  <div>
                    Explore something new.
                    <br />
                    {link('Visit the reading room', {
                      kind: 'reading',
                      article: 'web',
                      query: 'web history',
                    })}
                    <br />
                    <small>No email or account needed.</small>
                  </div>
                </div>
              ) : (
                <div className="web-lab-google-footer">
                  {link('About this search', {
                    kind: 'reading',
                    article: 'web',
                    query: 'search',
                  })}
                  {link('How browsers work', {
                    kind: 'reading',
                    article: 'browsers',
                    query: 'browsers',
                  })}
                  <span>Local recreation · {year}</span>
                </div>
              )}
              <p className="web-lab-in-page-note">
                Original educational recreation · simulated results
              </p>
            </div>
          )}
        </div>
        <div className="web-lab-browser-status">
          <span>
            <i />
            Local simulation — no external browsing
          </span>
          <span>{year}</span>
        </div>
      </section>
      <p className="web-lab-announcement" role="status" aria-live="polite">
        {announcement}
      </p>
      {!compact && (
        <>
          <div className="web-lab-explain-actions">
            <button
              type="button"
              aria-expanded={showChanges}
              aria-controls={`web-lab-changes-${instanceId}`}
              onClick={() => setShowChanges(!showChanges)}
            >
              What changed?{' '}
              <ChevronDown
                size={15}
                className={showChanges ? 'web-lab-chevron-open' : ''}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              aria-expanded={showCode}
              aria-controls={`web-lab-code-${instanceId}`}
              onClick={() => setShowCode(!showCode)}
            >
              <Code2 size={15} aria-hidden="true" />
              View code <ChevronDown size={15} aria-hidden="true" />
            </button>
            <span>Same website. A different era.</span>
          </div>
          {showChanges && (
            <section
              id={`web-lab-changes-${instanceId}`}
              className="web-lab-changes"
              aria-label="What changed in this web era"
            >
              <div>
                <span className="feature-label">{year} / INTERFACE</span>
                <h3>
                  {year < site.launched
                    ? `Before ${site.name}`
                    : `${site.name}: ${siteContext.title}`}
                </h3>
                <p>
                  {year < site.launched
                    ? `${site.name} launched in ${site.launched}. This earlier stop intentionally has no invented interface.`
                    : siteContext.layout}
                </p>
              </div>
              <dl>
                {year >= site.launched && (
                  <>
                    <div>
                      <dt>Interaction</dt>
                      <dd>{siteContext.interaction}</dd>
                    </div>
                    <div>
                      <dt>User expectations</dt>
                      <dd>{siteContext.expectations}</dd>
                    </div>
                  </>
                )}
                <div>
                  <dt>HTML</dt>
                  <dd>{era.html}</dd>
                </div>
                <div>
                  <dt>CSS</dt>
                  <dd>{era.css}</dd>
                </div>
                <div>
                  <dt>JavaScript</dt>
                  <dd>{era.javascript}</dd>
                </div>
              </dl>
            </section>
          )}
          {showCode && (
            <section
              id={`web-lab-code-${instanceId}`}
              className="web-lab-code"
              aria-label="Read-only code examples"
            >
              <div className="web-lab-code-heading">
                <span>UNDER THE SURFACE / {year}</span>
                <span>READ ONLY · ILLUSTRATIVE SNIPPETS</span>
              </div>
              <div
                className="web-lab-code-tabs"
                role="group"
                aria-label="Code language"
              >
                {(['HTML', 'CSS', 'JavaScript'] as CodeLanguage[]).map(
                  (value) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={value === language}
                      onClick={() => setLanguage(value)}
                    >
                      {value}
                    </button>
                  ),
                )}
              </div>
              <pre tabIndex={0} aria-label={`${language} code example`}>
                <code>{codeFor(year, language)}</code>
              </pre>
              <p>
                {language === 'HTML'
                  ? era.html
                  : language === 'CSS'
                    ? era.css
                    : era.javascript}
              </p>
            </section>
          )}
          <div className="web-lab-source-note">
            <span className="feature-label">THE REAL HISTORY</span>
            <p>
              These pages are original {site.name}-inspired educational
              recreations, not archived screenshots or an official {site.name}{' '}
              product. Browser styling is representative. Search and reading
              pages are simulated locally; source links below open real
              reference sites.
            </p>
            <div>
              {selectedSite !== 'google' && (
                <a
                  className="feature-source"
                  href={siteReferences[selectedSite].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteReferences[selectedSite].label}
                  <ArrowUpRight size={12} />
                </a>
              )}
              {webSources.map((source) => (
                <a
                  key={source.url}
                  className="feature-source"
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {source.label}
                  <ArrowUpRight size={12} aria-hidden="true" />
                  <span className="web-lab-sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function WebTimeLabContent({
  siteRenderers = {},
}: {
  siteRenderers?: HistoricalSiteRenderers
}) {
  const [comparing, setComparing] = useState(false)
  const [comparisonSite, setComparisonSite] =
    useState<HistoricalSiteId>('google')
  return (
    <section aria-labelledby="web-lab-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">
            THE HISTORICAL INTERNET EXPLORER
          </span>
          <h2 id="web-lab-heading">
            Explore the Old Internet<span className="accent-text">.</span>
          </h2>
          <p>
            Familiar websites. Entirely different eras. Pick a year, explore a
            small recreated web, then follow the links and find your way back.
          </p>
        </div>
        <span className="web-lab-recreation-label">
          <Globe2 size={15} aria-hidden="true" />
          Original educational recreation
        </span>
      </div>
      <HistoricalBrowser siteRenderers={siteRenderers} />
      <div className="web-lab-comparison-intro">
        <div>
          <span className="feature-label">THEN, MEET NOW</span>
          <h3>See the change side by side.</h3>
          <p>
            Open two independent browsers. Choose each year and website, then
            explore both at your own pace.
          </p>
        </div>
        <label className="web-lab-comparison-site">
          Comparison website
          <select
            aria-label="Comparison website"
            value={comparisonSite}
            onChange={(event) =>
              setComparisonSite(event.target.value as HistoricalSiteId)
            }
          >
            {historicalSites
              .filter((item) => item.id === 'google' || siteRenderers[item.id])
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
        </label>
        <button
          type="button"
          className="feature-button secondary"
          aria-expanded={comparing}
          aria-controls="web-lab-comparison"
          onClick={() => setComparing(!comparing)}
        >
          {comparing ? 'Close comparison' : 'Compare websites'}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
      {comparing && (
        <section
          id="web-lab-comparison"
          className="web-lab-comparison"
          aria-label="Website comparison"
        >
          <div aria-label="Earlier website">
            <span className="feature-label">01 / EARLIER</span>
            <HistoricalBrowser
              key={`${comparisonSite}-earlier`}
              initialSite={comparisonSite}
              initialYear={
                historicalSites.find((site) => site.id === comparisonSite)!
                  .launched
              }
              compact
              siteRenderers={siteRenderers}
            />
          </div>
          <div aria-label="Later website">
            <span className="feature-label">02 / LATER</span>
            <HistoricalBrowser
              key={`${comparisonSite}-later`}
              initialSite={comparisonSite}
              initialYear={2026}
              compact
              siteRenderers={siteRenderers}
            />
          </div>
        </section>
      )}
    </section>
  )
}

export default function WebTimeLab() {
  return (
    <WebTimeLabContent
      siteRenderers={{
        youtube: YouTubeSite,
        amazon: AmazonSite,
        wikipedia: WikipediaSite,
        facebook: FacebookSite,
      }}
    />
  )
}
