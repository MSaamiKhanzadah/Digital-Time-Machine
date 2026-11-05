import {
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { BookOpen, List, Search, Settings2 } from 'lucide-react'
import type { HistoricalSiteProps } from '../../types/historicalBrowser'
import {
  communitySources,
  searchWikiArticles,
  wikiArticles,
  type WikiArticle,
} from '../../data/historicalCommunity'
import '../../styles/historical-community.css'

export default function WikipediaSite({
  year,
  path,
  navigate,
}: HistoricalSiteProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const early = year < 2005
  const modern = year >= 2020
  const root = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [contents, setContents] = useState(true)
  const [sources, setSources] = useState(false)
  const [tools, setTools] = useState(false)
  const [largeText, setLargeText] = useState(false)
  let route: URL
  try {
    route = new URL(path, 'https://wikipedia.local')
  } catch {
    route = new URL('/missing', 'https://wikipedia.local')
  }
  const searchTerm = route.searchParams.get('q') || ''
  const article = wikiArticles.find(
    (item) => item.id === route.searchParams.get('id'),
  )
  const isSearch = route.pathname === '/search'
  const isArticle = route.pathname === '/article'
  const isHome = route.pathname === '/'
  const results = searchWikiArticles(searchTerm, year)
  const link = (label: ReactNode, target: string, className?: string) => (
    <a
      className={className}
      href="#web-lab"
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        navigate(target)
      }}
    >
      {label}
    </a>
  )
  const articleLink = (item: WikiArticle, className?: string) =>
    link(item.title, `/article?id=${item.id}`, className)
  const visibleSections =
    article?.sections
      .map((section) => ({
        ...section,
        facts: section.facts.filter((fact) => fact.year <= year),
      }))
      .filter((section) => section.facts.length) || []
  const sourceIds = new Set(
    visibleSections.flatMap((section) =>
      section.facts.map((fact) => fact.source),
    ),
  )
  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }
  function jump(id: string) {
    const element = root.current?.querySelector<HTMLElement>(
      `#hs-wiki-${instanceId}-${id}`,
    )
    element?.focus({ preventScroll: true })
    element?.scrollIntoView({ behavior: 'auto', block: 'nearest' })
  }
  const searchForm = (
    <form
      className="hs-wiki-search"
      onSubmit={search}
      role="search"
      aria-label="Search this recreated encyclopedia"
    >
      <label
        className="hs-community-sr-only"
        htmlFor={`hs-wiki-search-${instanceId}`}
      >
        Search Wikipedia recreation
      </label>
      <input
        id={`hs-wiki-search-${instanceId}`}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={early ? 'Enter a topic' : 'Search this local encyclopedia'}
        maxLength={160}
      />
      <button type="submit">
        {modern ? (
          <>
            <Search size={16} aria-hidden="true" />
            <span>Search</span>
          </>
        ) : (
          'Search'
        )}
      </button>
    </form>
  )
  const logo = (
    <>
      {!early && (
        <span className="hs-wiki-emblem" aria-hidden="true">
          W
        </span>
      )}
      <span>
        <strong>{early ? 'Wikipedia' : 'WIKIPEDIA'}</strong>
        <small>The Free Encyclopedia</small>
      </span>
    </>
  )
  const toc = (
    <div className="hs-wiki-toc">
      <div className="hs-wiki-toc-heading">
        <strong>Contents</strong>
        <button
          type="button"
          onClick={() => setContents((shown) => !shown)}
          aria-expanded={contents}
        >
          {contents ? 'hide' : 'show'}
        </button>
      </div>
      {contents && (
        <ol>
          <li>
            <button type="button" onClick={() => jump('article-top')}>
              Introduction
            </button>
          </li>
          {visibleSections.map((section) => (
            <li key={section.id}>
              <button type="button" onClick={() => jump(section.id)}>
                {section.title}
              </button>
            </li>
          ))}
          <li>
            <button type="button" onClick={() => jump('related')}>
              Related topics
            </button>
          </li>
        </ol>
      )}
    </div>
  )

  if (year < 2001)
    return (
      <div className="hs-wiki-site hs-wiki-early">
        <h1>Wikipedia had not launched yet</h1>
        <p>
          Choose 2001 or later to explore this original educational recreation.
        </p>
      </div>
    )
  return (
    <div
      ref={root}
      className={`hs-wiki-site ${early ? 'hs-wiki-early' : modern ? 'hs-wiki-modern' : 'hs-wiki-classic'}${largeText ? ' hs-wiki-large-text' : ''}`}
    >
      <header className="hs-wiki-header">
        {link(logo, '/', 'hs-wiki-wordmark')}
        {modern && searchForm}
        {modern && (
          <button
            className="hs-wiki-tools-toggle"
            aria-label="Appearance"
            type="button"
            onClick={() => setTools((shown) => !shown)}
            aria-expanded={tools}
          >
            <Settings2 size={18} aria-hidden="true" />
            <span>Appearance</span>
          </button>
        )}
      </header>
      <div className="hs-wiki-museum-note">
        <BookOpen size={14} aria-hidden="true" />
        <span>
          Original educational recreation · {year} design study · Museum text,
          not an archived Wikipedia page.
        </span>
      </div>
      <div className="hs-wiki-layout">
        {!early && (
          <aside
            className="hs-wiki-sidebar"
            aria-label={
              modern && isArticle && article
                ? 'Article contents'
                : 'Encyclopedia navigation'
            }
          >
            {modern && isArticle && article ? (
              toc
            ) : (
              <>
                <div className="hs-wiki-side-group">
                  <strong>Navigation</strong>
                  {link('Main page', '/')}
                  {link('All six topics', '/search?q=')}
                  {link('World Wide Web', '/article?id=web')}
                  {link('Internet', '/article?id=internet')}
                </div>
                <div className="hs-wiki-side-group">
                  <strong>Explore the collection</strong>
                  {link('Computing', '/article?id=computer')}
                  {link('Artificial intelligence', '/article?id=ai')}
                  {link('About Wikipedia', '/article?id=wikipedia')}
                </div>
                {!modern && (
                  <div className="hs-wiki-side-search">{searchForm}</div>
                )}
              </>
            )}
          </aside>
        )}
        <main className="hs-wiki-main">
          {early && (
            <nav
              className="hs-wiki-early-nav"
              aria-label="Encyclopedia navigation"
            >
              {link('HomePage', '/')} | {link('Browse topics', '/search?q=')} |{' '}
              {link('About this encyclopedia', '/article?id=wikipedia')}
            </nav>
          )}
          {early && searchForm}
          {isHome ? (
            <>
              <div className="hs-wiki-page-title">
                <h1>{early ? 'Welcome to Wikipedia!' : 'Main Page'}</h1>
                {!early && (
                  <span>
                    From Wikipedia, the free encyclopedia · local museum edition
                  </span>
                )}
              </div>
              <section className="hs-wiki-welcome">
                <div>
                  <h2>
                    {early ? 'The free encyclopedia' : 'Welcome to Wikipedia,'}
                  </h2>
                  <p>
                    {early
                      ? 'An experiment in writing an encyclopedia together. Follow a blue link to begin.'
                      : 'the free encyclopedia that anyone can explore.'}
                  </p>
                  <p className="hs-wiki-local-count">
                    Six original museum articles · Information through {year}
                  </p>
                </div>
                {!early && (
                  <ul>
                    {wikiArticles.slice(0, 3).map((item) => (
                      <li key={item.id}>{articleLink(item)}</li>
                    ))}
                  </ul>
                )}
              </section>
              <div className="hs-wiki-home-grid">
                <section className="hs-wiki-featured">
                  <h2>
                    {early ? 'A starting point' : 'From today’s featured topic'}
                  </h2>
                  <h3>{articleLink(wikiArticles[0])}</h3>
                  <p>{wikiArticles[0].introduction}</p>
                  <p>
                    The story connects{' '}
                    {link('computer networks', '/article?id=internet')},{' '}
                    {link('search engines', '/article?id=search')}, and{' '}
                    {link('collaborative knowledge', '/article?id=wikipedia')}.
                    Each topic opens another path through the collection.
                  </p>
                  {link('Read the article →', '/article?id=web')}
                </section>
                <section className="hs-wiki-topic-panel">
                  <h2>
                    {early
                      ? 'Explore some subjects'
                      : 'In this local encyclopedia'}
                  </h2>
                  <ul>
                    {wikiArticles.map((item) => (
                      <li key={item.id}>
                        {articleLink(item)}
                        <span>{item.subtitle}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <aside className="hs-wiki-about-scene">
                <h2>A page shaped by its time</h2>
                <p>
                  {early
                    ? 'This sparse, text-first scene evokes Wikipedia’s beginnings in 2001. Early wiki pages emphasized links and quick navigation rather than polished visual design.'
                    : modern
                      ? 'This scene evokes a modern encyclopedia: a readable central column, a contents panel, and adjustable text. Its six articles are original summaries, with dated milestones limited to the selected year.'
                      : 'This scene evokes the classic encyclopedia layout: navigation on the left, a broad article column, blue links, and a compact table of contents.'}{' '}
                  Use search or follow a topic to explore.
                </p>
              </aside>
            </>
          ) : isSearch ? (
            <>
              <div className="hs-wiki-page-title">
                <h1>
                  {searchTerm
                    ? `Search results for “${searchTerm}”`
                    : 'Browse all topics'}
                </h1>
                <span>
                  {results.length} local{' '}
                  {results.length === 1 ? 'article' : 'articles'} · Information
                  through {year}
                </span>
              </div>
              {results.length ? (
                <ol className="hs-wiki-results">
                  {results.map((item) => (
                    <li key={item.id}>
                      <h2>{articleLink(item)}</h2>
                      <p>{item.introduction}</p>
                      <span>{item.subtitle}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="hs-wiki-empty">
                  <h2>No article matched that search</h2>
                  <p>
                    This collection contains six topics. Try “web”, “computers”,
                    “network”, or “artificial intelligence”. Results only
                    include milestone information available by {year}.
                  </p>
                  {link('Browse all six articles', '/search?q=')}
                </div>
              )}
            </>
          ) : isArticle && article ? (
            <>
              <div
                className="hs-wiki-page-title"
                id={`hs-wiki-${instanceId}-article-top`}
                tabIndex={-1}
              >
                <h1>{article.title}</h1>
                <span>
                  From Wikipedia, the free encyclopedia · original museum
                  summary
                </span>
              </div>
              <div className="hs-wiki-article-meta">
                <span>Information through {year}</span>
                <button
                  type="button"
                  onClick={() => setLargeText((large) => !large)}
                  aria-pressed={largeText}
                >
                  {largeText ? 'Use standard text' : 'Use larger text'}
                </button>
                {modern && (
                  <button
                    type="button"
                    onClick={() => setContents((shown) => !shown)}
                    aria-expanded={contents}
                  >
                    <List size={14} aria-hidden="true" />
                    {contents ? 'Hide contents' : 'Show contents'}
                  </button>
                )}
              </div>
              <p className="hs-wiki-introduction">{article.introduction}</p>
              <aside className="hs-wiki-infobox">
                <strong>{article.title}</strong>
                <span>{article.subtitle}</span>
                <dl>
                  <dt>Collection</dt>
                  <dd>History of computing</dd>
                  <dt>Edition</dt>
                  <dd>{year} educational scene</dd>
                  <dt>Articles</dt>
                  <dd>Six local topics</dd>
                </dl>
              </aside>
              {(!modern || early) && toc}
              <div className="hs-wiki-article-body">
                {visibleSections.map((section) => (
                  <section key={section.id} className="hs-wiki-section">
                    <h2
                      id={`hs-wiki-${instanceId}-${section.id}`}
                      tabIndex={-1}
                    >
                      {section.title}
                    </h2>
                    {section.facts.map((fact, index) => (
                      <p key={index}>{fact.text}</p>
                    ))}
                  </section>
                ))}
              </div>
              <section className="hs-wiki-related">
                <h2 id={`hs-wiki-${instanceId}-related`} tabIndex={-1}>
                  Related topics
                </h2>
                <ul>
                  {article.related.map((id) => {
                    const related = wikiArticles.find((item) => item.id === id)!
                    return (
                      <li key={id}>
                        {articleLink(related)} <span>— {related.subtitle}</span>
                      </li>
                    )
                  })}
                </ul>
              </section>
              <section className="hs-wiki-sources">
                <button
                  type="button"
                  onClick={() => setSources((shown) => !shown)}
                  aria-expanded={sources}
                >
                  {sources
                    ? 'Hide reference sources'
                    : 'Show reference sources'}
                </button>
                {sources && (
                  <>
                    <p>
                      Institutional references used for this original museum
                      writing. These are source citations, not live page
                      content; no reference is fetched by the exhibit.
                    </p>
                    <ul>
                      {communitySources
                        .filter((source) => sourceIds.has(source.id))
                        .map((source) => (
                          <li key={source.id}>
                            <strong>{source.title}</strong>
                            <code>{source.url}</code>
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </section>
            </>
          ) : (
            <div className="hs-wiki-empty">
              <h1>{isArticle ? 'Article not found' : 'Page not found'}</h1>
              <p>
                This local encyclopedia has six original articles. Choose a
                topic or search the collection to continue.
              </p>
              {link('Browse all topics', '/search?q=')}
            </div>
          )}
        </main>
        {modern && tools && (
          <aside className="hs-wiki-appearance">
            <h2>Appearance</h2>
            <p>Text size</p>
            <button
              type="button"
              aria-pressed={!largeText}
              onClick={() => setLargeText(false)}
            >
              Standard
            </button>
            <button
              type="button"
              aria-pressed={largeText}
              onClick={() => setLargeText(true)}
            >
              Large
            </button>
            <p>Changes apply only to this local scene.</p>
          </aside>
        )}
      </div>
      <footer className="hs-wiki-footer">
        Digital Time Machine · Original educational recreation · Local text and
        navigation · Not affiliated with Wikimedia
      </footer>
    </div>
  )
}
