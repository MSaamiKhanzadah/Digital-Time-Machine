import { useId, useEffect, useState } from 'react'
import type { CSSProperties, FormEvent, MouseEvent } from 'react'
import { museumVideos, readMuseumRoute } from '../../data/historicalCommerce'
import type { MuseumVideo } from '../../data/historicalCommerce'
import type { HistoricalSiteProps } from '../../types/historicalBrowser'
import '../../styles/historical-commerce.css'

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0')}`

function VideoIllustration({ video }: { video: MuseumVideo }) {
  return (
    <svg
      viewBox="0 0 640 360"
      role="img"
      aria-label={`Original illustration: ${video.title}`}
    >
      <rect
        width="640"
        height="360"
        fill={video.subject === 'phone' ? '#c8dfe1' : '#e9dfc8'}
      />
      <path d="M0 300H640V360H0Z" fill="#bbae92" />
      <path
        d="M0 300H640M65 0V300M575 0V300"
        stroke="#6f7468"
        strokeWidth="2"
        opacity=".25"
      />
      {video.subject === 'computer' && (
        <g>
          {[100, 250, 400].map((x, i) => (
            <g key={x} transform={`translate(${x} 60)`}>
              <rect
                width="130"
                height="245"
                rx="3"
                fill={i === 1 ? '#42655b' : '#48525a'}
              />
              <rect x="10" y="12" width="110" height="35" fill="#d7d3bc" />
              <path
                d="M15 64H115M15 109H115M15 154H115M15 199H115"
                stroke="#192d31"
                strokeWidth="5"
              />
              {[0, 1, 2, 3].map((row) => (
                <g key={row}>
                  <circle
                    className="hs-yt-blink"
                    cx="25"
                    cy={84 + row * 45}
                    r="6"
                    fill="#f3bc57"
                    style={{ animationDelay: `${i * 0.2 + row * 0.35}s` }}
                  />
                  <circle
                    className="hs-yt-blink"
                    cx="47"
                    cy={84 + row * 45}
                    r="6"
                    fill="#91c9a6"
                    style={{ animationDelay: `${row * 0.4}s` }}
                  />
                  <path
                    d={`M70 ${84 + row * 45}H110`}
                    stroke="#a6afa4"
                    strokeWidth="4"
                  />
                </g>
              ))}
            </g>
          ))}
          <text
            x="320"
            y="42"
            textAnchor="middle"
            fill="#36453e"
            fontSize="17"
            fontFamily="monospace"
          >
            THINKING IN ROOMS, NOT POCKETS
          </text>
        </g>
      )}
      {video.subject === 'mouse' && (
        <g>
          <rect x="240" y="50" width="285" height="195" rx="8" fill="#536765" />
          <rect x="254" y="64" width="257" height="165" fill="#9bc6c1" />
          <path
            d="M365 246V279H304H460"
            fill="none"
            stroke="#536765"
            strokeWidth="17"
          />
          <rect
            x="278"
            y="91"
            width="77"
            height="63"
            fill="#f0e8d4"
            stroke="#547570"
            strokeWidth="3"
          />
          <text
            x="287"
            y="118"
            fill="#354f49"
            fontSize="15"
            fontFamily="monospace"
          >
            HELLO!
          </text>
          <path
            className="hs-yt-cursor"
            d="M379 139V184L390 174L401 192L411 186L400 168H417Z"
            fill="#fff"
            stroke="#24413c"
            strokeWidth="3"
          />
          <path
            d="M153 198C96 111 172 93 188 46"
            fill="none"
            stroke="#526361"
            strokeWidth="5"
          />
          <rect
            x="111"
            y="190"
            width="90"
            height="110"
            rx="40"
            fill="#e8e6d9"
            stroke="#526361"
            strokeWidth="4"
          />
          <path d="M156 191V235M112 237H200" stroke="#526361" strokeWidth="3" />
        </g>
      )}
      {video.subject === 'modem' && (
        <g>
          <rect x="50" y="93" width="170" height="127" rx="6" fill="#647a76" />
          <rect x="61" y="104" width="148" height="100" fill="#c3d0b1" />
          <text
            x="84"
            y="145"
            fill="#2c5546"
            fontSize="17"
            fontFamily="monospace"
          >
            CONNECTING
          </text>
          <path d="M135 220V253M80 258H190" stroke="#647a76" strokeWidth="12" />
          <path
            className="hs-yt-signal"
            d="M222 169H250L259 144L273 195L290 142L308 192L321 167H349"
            fill="none"
            stroke="#b65b34"
            strokeWidth="5"
          />
          <rect
            x="350"
            y="140"
            width="180"
            height="92"
            rx="8"
            fill="#f6f0dd"
            stroke="#7c7e65"
            strokeWidth="4"
          />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              className="hs-yt-blink"
              key={i}
              cx={374 + i * 28}
              cy="182"
              r="5"
              fill="#55775b"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <text
            x="440"
            y="211"
            textAnchor="middle"
            fill="#59634b"
            fontSize="13"
            fontFamily="monospace"
          >
            A GATEWAY TO THE WEB
          </text>
          <path
            d="M530 174H578V72"
            fill="none"
            stroke="#7c7e65"
            strokeWidth="4"
          />
          <text
            x="320"
            y="57"
            textAnchor="middle"
            fill="#514c3d"
            fontSize="18"
            fontFamily="monospace"
          >
            ONE PHONE LINE. A WORLD OF LINKS.
          </text>
        </g>
      )}
      {video.subject === 'phone' && (
        <g>
          <rect x="75" y="78" width="262" height="173" rx="7" fill="#425e62" />
          <rect x="88" y="91" width="236" height="143" fill="#f6f3e7" />
          <rect x="99" y="103" width="214" height="23" fill="#67989a" />
          <path
            d="M106 145H293M106 160H250M106 175H280M106 190H232"
            stroke="#afb9ac"
            strokeWidth="7"
          />
          <path
            d="M207 252V280M149 282H264"
            stroke="#425e62"
            strokeWidth="12"
          />
          <path
            className="hs-yt-signal"
            d="M352 159H407M387 144L407 159L387 174"
            fill="none"
            stroke="#aa5d37"
            strokeWidth="5"
          />
          <rect
            x="431"
            y="65"
            width="124"
            height="224"
            rx="18"
            fill="#344d52"
          />
          <rect x="442" y="84" width="102" height="177" fill="#f6f3e7" />
          <g className="hs-yt-phone-content">
            <rect x="451" y="103" width="84" height="42" fill="#c47c58" />
            <path
              d="M451 160H534M451 175H520M451 190H532M451 205H514M451 220H531"
              stroke="#9aaea4"
              strokeWidth="6"
            />
          </g>
          <circle cx="493" cy="274" r="6" fill="#9aafaa" />
          <text
            x="320"
            y="36"
            textAnchor="middle"
            fill="#36595a"
            fontSize="17"
            fontFamily="monospace"
          >
            THE WEB BECOMES PORTABLE
          </text>
        </g>
      )}
      <text x="20" y="339" fill="#41483d" fontSize="12" fontFamily="monospace">
        ORIGINAL MUSEUM ANIMATION · SILENT
      </text>
    </svg>
  )
}

export default function YouTubeSite({
  year,
  path,
  navigate,
}: HistoricalSiteProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const collection = museumVideos.filter((item) => item.availableFrom <= year)
  const route = readMuseumRoute(path)
  const query = route.searchParams.get('q') || ''
  const [search, setSearch] = useState(query)
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [comments, setComments] = useState<Record<string, string[]>>({})
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  const video =
    route.pathname === '/watch'
      ? collection.find((item) => item.id === route.searchParams.get('id'))
      : undefined
  const era =
    year < 2010 ? '2005' : year < 2015 ? '2010' : year < 2026 ? '2015' : '2026'

  useEffect(() => setSearch(query), [query])
  useEffect(() => {
    setPlaying(false)
    setElapsed(0)
    setComment('')
    setMessage('')
  }, [path, year])
  useEffect(() => {
    if (!playing || !video) return
    const timer = window.setInterval(() => {
      setElapsed((time) => {
        if (time + 1 >= video.duration) {
          setPlaying(false)
          return video.duration
        }
        return time + 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [playing, video])

  const follow =
    (destination: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      navigate(destination)
    }
  const searchVideos = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(search.trim())}`)
  }
  const postComment = (event: FormEvent) => {
    event.preventDefault()
    if (!video || !comment.trim()) {
      setMessage('Write a comment before posting.')
      return
    }
    setComments((existing) => ({
      ...existing,
      [video.id]: [...(existing[video.id] || []), comment.trim()],
    }))
    setComment('')
    setMessage('Your comment was added locally.')
  }
  const card = (item: MuseumVideo, compact = false) => (
    <article
      className={`hs-yt-card${compact ? ' hs-yt-card-compact' : ''}`}
      key={item.id}
    >
      <a
        className="hs-yt-thumbnail"
        href={`/watch?id=${item.id}`}
        onClick={follow(`/watch?id=${item.id}`)}
        aria-label={`Watch ${item.title}`}
      >
        <VideoIllustration video={item} />
        <span className="hs-yt-duration">{formatTime(item.duration)}</span>
      </a>
      <div className="hs-yt-card-copy">
        <h3>
          <a
            href={`/watch?id=${item.id}`}
            onClick={follow(`/watch?id=${item.id}`)}
          >
            {item.title}
          </a>
        </h3>
        <p>{item.creator}</p>
        <p>{item.views} sample views · Original museum clip</p>
      </div>
    </article>
  )

  if (year < 2005)
    return (
      <div className="hs-commerce-unavailable">
        <h2>YouTube was not available in {year}</h2>
        <p>
          YouTube launched in 2005. Choose 2005 or later to explore this
          original interactive recreation.
        </p>
      </div>
    )

  const knownRoute = ['/', '/search', '/watch'].includes(route.pathname)
  const results = collection.filter((item) =>
    `${item.title} ${item.description} ${item.subject}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  )

  return (
    <div className={`hs-yt-site hs-yt-era-${era}`} data-site="youtube">
      <header className="hs-yt-header">
        <a
          className="hs-yt-logo"
          href="/"
          onClick={follow('/')}
          aria-label="YouTube home"
        >
          <span>You</span>
          <strong>Tube</strong>
          {era === '2005' && <small>Broadcast Yourself™</small>}
        </a>
        <form className="hs-yt-search" onSubmit={searchVideos} role="search">
          <input
            type="search"
            aria-label="Search videos"
            placeholder="Search videos"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search videos</button>
        </form>
        {era !== '2005' && (
          <span className="hs-yt-local-badge">MUSEUM EDITION</span>
        )}
      </header>
      <nav className="hs-yt-topnav" aria-label="Video categories">
        <a href="/" onClick={follow('/')}>
          Home
        </a>
        <a href="/search?q=computer" onClick={follow('/search?q=computer')}>
          Computing
        </a>
        <a href="/search?q=web" onClick={follow('/search?q=web')}>
          The web
        </a>
        <a href="/search?q=mouse" onClick={follow('/search?q=mouse')}>
          Everyday technology
        </a>
      </nav>
      <div className="hs-yt-body">
        {!video && era !== '2005' && (
          <aside className="hs-yt-sidebar">
            <strong>Explore</strong>
            <a href="/" onClick={follow('/')}>
              <span aria-hidden="true">⌂</span> Home
            </a>
            <a href="/search?q=computer" onClick={follow('/search?q=computer')}>
              <span aria-hidden="true">▣</span> Computing
            </a>
            <a href="/search?q=web" onClick={follow('/search?q=web')}>
              <span aria-hidden="true">◎</span> The web
            </a>
            <p>Four little stories from the history of computing.</p>
          </aside>
        )}
        <main className="hs-yt-main">
          {!knownRoute || (route.pathname === '/watch' && !video) ? (
            <div className="hs-commerce-empty">
              <h2>That video page is not in this collection</h2>
              <p>
                Try a video title, or explore the four original museum clips.
              </p>
              <a href="/" onClick={follow('/')}>
                Browse all videos
              </a>
            </div>
          ) : video ? (
            <div className="hs-yt-watch-layout">
              <div>
                <div
                  className={`hs-yt-player${playing ? ' hs-yt-is-playing' : ''}`}
                  style={
                    {
                      '--hs-yt-play-progress': `${(elapsed / video.duration) * 100}%`,
                    } as CSSProperties
                  }
                >
                  <VideoIllustration video={video} />
                  <div className="hs-yt-player-controls">
                    <button
                      type="button"
                      aria-label={playing ? 'Pause video' : 'Play video'}
                      onClick={() => {
                        if (elapsed >= video.duration) setElapsed(0)
                        setPlaying(!playing)
                      }}
                    >
                      {playing
                        ? 'Ⅱ Pause'
                        : elapsed >= video.duration
                          ? '↻ Replay'
                          : '▶ Play'}
                    </button>
                    <span
                      className="hs-yt-player-time"
                      aria-label="Playback time"
                    >
                      {formatTime(elapsed)} / {formatTime(video.duration)}
                    </span>
                    <span className="hs-yt-player-silent">
                      Silent illustration
                    </span>
                    <input
                      aria-label="Video progress"
                      type="range"
                      min="0"
                      max={video.duration}
                      step="1"
                      value={elapsed}
                      onChange={(event) =>
                        setElapsed(Number(event.target.value))
                      }
                    />
                  </div>
                </div>
                <h2 className="hs-yt-watch-title">{video.title}</h2>
                <div className="hs-yt-channel">
                  <span className="hs-yt-avatar" aria-hidden="true">
                    M
                  </span>
                  <div>
                    <strong>{video.creator}</strong>
                    <p>
                      {video.views} sample views · Original museum animation
                    </p>
                  </div>
                </div>
                <p className="hs-yt-description">{video.description}</p>
                <section className="hs-yt-comments" aria-label="Video comments">
                  <h3>Comments ({(comments[video.id] || []).length})</h3>
                  <p>
                    Join the exhibit. Comments stay in this open museum session.
                  </p>
                  {(comments[video.id] || []).map((text, index) => (
                    <div className="hs-yt-comment" key={`${video.id}-${index}`}>
                      <strong>You · museum visitor</strong>
                      <p>{text}</p>
                    </div>
                  ))}
                  <form onSubmit={postComment}>
                    <label htmlFor={`hs-yt-comment-${instanceId}`}>
                      Write a comment
                    </label>
                    <textarea
                      id={`hs-yt-comment-${instanceId}`}
                      aria-label="Write a comment"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      maxLength={500}
                      rows={3}
                    />
                    <button type="submit">Post comment</button>
                    <span role="status">{message}</span>
                  </form>
                </section>
              </div>
              <aside className="hs-yt-related">
                <h3>Related videos</h3>
                {collection
                  .filter((item) => item.id !== video.id)
                  .map((item) => card(item, true))}
              </aside>
            </div>
          ) : (
            <>
              <div className="hs-yt-section-heading">
                <h2>
                  {route.pathname === '/search'
                    ? `Search results${query ? ` for “${query}”` : ''}`
                    : era === '2005'
                      ? 'Featured Videos'
                      : 'A little history. A lot to discover.'}
                </h2>
                <span>{results.length} videos</span>
              </div>
              {route.pathname !== '/search' && (
                <p className="hs-yt-welcome">
                  {era === '2005'
                    ? 'Welcome to our little video collection. Click a thumbnail and start watching!'
                    : 'Original animated stories from the computing museum.'}
                </p>
              )}
              {results.length ? (
                <div className="hs-yt-grid">
                  {results.map((item) => card(item))}
                </div>
              ) : (
                <div className="hs-commerce-empty">
                  <h3>No videos found</h3>
                  <p>Try “computer”, “mouse”, “web”, or “dial-up”.</p>
                  <a href="/" onClick={follow('/')}>
                    Browse all videos
                  </a>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <footer className="hs-commerce-disclosure">
        <strong>
          Original educational recreation · {year} interface style
        </strong>
        <p>
          These four illustrated clips, view counts, and comments are museum
          samples. They are not archived YouTube pages or historical uploads.
        </p>
        <details>
          <summary>Historical context & reference</summary>
          <p>
            YouTube launched in 2005. Early video directories gave way to
            channels, recommendations, and responsive app interfaces. This
            exhibit interprets those changes; it does not reproduce an exact
            dated page.{' '}
            <a href="https://about.youtube/" target="_blank" rel="noreferrer">
              About YouTube (external reference)
            </a>
            .
          </p>
        </details>
      </footer>
    </div>
  )
}
