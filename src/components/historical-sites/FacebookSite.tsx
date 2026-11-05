import { useId, useState, type FormEvent } from 'react'
import {
  BookOpen,
  ChevronRight,
  Home,
  MessageCircle,
  Search,
  ThumbsUp,
  Users,
} from 'lucide-react'
import type { HistoricalSiteProps } from '../../types/historicalBrowser'
import '../../styles/historical-facebook.css'

type Person = {
  id: string
  name: string
  initials: string
  color: string
  course: string
  interest: string
  bio: string
}
type DemoPost = {
  id: string
  author: string
  text: string
  era: number
  likes: number
}
const people: Person[] = [
  {
    id: 'maya',
    name: 'Maya Chen',
    initials: 'MC',
    color: '#8d573c',
    course: 'Computer Science',
    interest: 'Photography, student radio, small inventions',
    bio: 'Usually in the library sketching a new idea. Looking for people to build things with.',
  },
  {
    id: 'jordan',
    name: 'Jordan Ellis',
    initials: 'JE',
    color: '#466c4d',
    course: 'History',
    interest: 'Old maps, community gardens, cycling',
    bio: 'Collecting stories about our campus and the people who make it interesting.',
  },
  {
    id: 'sam',
    name: 'Sam Rivera',
    initials: 'SR',
    color: '#705584',
    course: 'Visual Arts',
    interest: 'Printmaking, music, museum visits',
    bio: 'Making posters for imaginary bands and finding inspiration in everyday places.',
  },
  {
    id: 'alex',
    name: 'Alex Morgan',
    initials: 'AM',
    color: '#456783',
    course: 'Environmental Studies',
    interest: 'Hiking, board games, shared meals',
    bio: 'A good walk and a good conversation are my favorite way to spend an afternoon.',
  },
]
const initialPosts: DemoPost[] = [
  {
    id: 'classic-1',
    author: 'maya',
    text: 'Our fictional campus photo walk is this afternoon. I am bringing a camera and a notebook. What should we photograph?',
    era: 2010,
    likes: 7,
  },
  {
    id: 'classic-2',
    author: 'jordan',
    text: 'Found a beautiful old map in the campus collection. Imagining how students found their way around before online maps.',
    era: 2010,
    likes: 4,
  },
  {
    id: 'classic-3',
    author: 'sam',
    text: 'Finished a new print for our imaginary student exhibition. The ink is finally dry!',
    era: 2010,
    likes: 11,
  },
  {
    id: 'modern-1',
    author: 'maya',
    text: 'A small weekend project: a digital scrapbook for our fictional community garden. What would you put on the first page?',
    era: 2026,
    likes: 18,
  },
  {
    id: 'modern-2',
    author: 'alex',
    text: 'Logging off for a walk by the river. Our imaginary hiking club has room for one more story, one more sketch, and plenty of snacks.',
    era: 2026,
    likes: 26,
  },
  {
    id: 'modern-3',
    author: 'sam',
    text: 'A reminder from this fictional studio: making something slowly is still making something. Today, a new block print.',
    era: 2026,
    likes: 12,
  },
  {
    id: 'early-feed',
    author: 'jordan',
    text: 'Putting together a reading group for our fictional campus. Add a book recommendation in the comments.',
    era: 2006,
    likes: 0,
  },
]

function Avatar({
  person,
  large = false,
}: {
  person: Person
  large?: boolean
}) {
  return (
    <span
      className={`hs-fb-avatar${large ? ' hs-fb-avatar-large' : ''}`}
      style={{ backgroundColor: person.color }}
      aria-hidden="true"
    >
      {person.initials}
    </span>
  )
}

export default function FacebookSite({
  year,
  path,
  navigate,
}: HistoricalSiteProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const campus = year < 2006
  const modern = year >= 2020
  const [query, setQuery] = useState('')
  const [connected, setConnected] = useState<string[]>(['jordan'])
  const [posts, setPosts] = useState<DemoPost[]>(initialPosts)
  const [draft, setDraft] = useState('')
  const [likes, setLikes] = useState<string[]>([])
  const [comments, setComments] = useState<Record<string, string[]>>({})
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})
  const [openComments, setOpenComments] = useState<string[]>([])
  const [notice, setNotice] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const route = new URL(path, 'https://local.museum')
  const searchTerm = route.searchParams.get('q') || ''
  const profile = people.find(
    (person) => person.id === route.searchParams.get('id'),
  )
  const isDirectory =
    campus || route.pathname === '/directory' || route.pathname === '/search'
  const results = people.filter((person) =>
    `${person.name} ${person.course} ${person.interest}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  )
  const knownRoute = ['/', '/directory', '/search', '/profile'].includes(
    route.pathname,
  )
  const feedPosts = posts.filter(
    (post) =>
      post.era === year ||
      post.era === (modern ? 2026 : year >= 2010 ? 2010 : 2006),
  )

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }
  function toggleConnect(id: string) {
    setConnected((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    )
  }
  function publish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!draft.trim()) return
    setPosts((current) => [
      {
        id: `local-${Date.now()}`,
        author: 'maya',
        text: draft.trim(),
        era: year,
        likes: 0,
      },
      ...current,
    ])
    setDraft('')
    setNotice('Your fictional post was added to this local demo.')
  }
  function addComment(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault()
    const content = (commentDrafts[id] || '').trim()
    if (!content) return
    setComments((current) => ({
      ...current,
      [id]: [...(current[id] || []), content],
    }))
    setCommentDrafts((current) => ({ ...current, [id]: '' }))
  }
  function personLink(person: Person) {
    return (
      <button
        type="button"
        className="hs-fb-person-link"
        onClick={() => navigate(`/profile?id=${person.id}`)}
      >
        {person.name}
      </button>
    )
  }
  function directory() {
    return (
      <section className="hs-fb-panel">
        <div className="hs-fb-section-title">
          <h2>
            {searchTerm
              ? `People matching “${searchTerm}”`
              : 'Northbridge University directory'}
          </h2>
          <span>{results.length} fictional profiles</span>
        </div>
        <p className="hs-fb-muted">
          Explore a fictional campus. Search by name, subject, or interest.
        </p>
        <div className="hs-fb-people-grid">
          {results.map((person) => (
            <article className="hs-fb-directory-card" key={person.id}>
              <Avatar person={person} />
              <div>
                {personLink(person)}
                <p>{person.course}</p>
                <p className="hs-fb-muted">{person.interest}</p>
                <button
                  type="button"
                  className="hs-fb-small-button"
                  onClick={() => toggleConnect(person.id)}
                  aria-pressed={connected.includes(person.id)}
                >
                  {connected.includes(person.id)
                    ? 'Connected · remove'
                    : 'Connect'}
                </button>
              </div>
            </article>
          ))}
        </div>
        {results.length === 0 && (
          <div className="hs-fb-empty">
            <p>No fictional people match that search.</p>
            <button
              type="button"
              className="hs-fb-primary"
              onClick={() => {
                setQuery('')
                navigate('/directory')
              }}
            >
              Browse all people
            </button>
          </div>
        )}
      </section>
    )
  }
  function postCard(post: DemoPost) {
    const person =
      people.find((candidate) => candidate.id === post.author) || people[0]
    const commentList = comments[post.id] || []
    const isLiked = likes.includes(post.id)
    return (
      <article className="hs-fb-post hs-fb-panel" key={post.id}>
        <div className="hs-fb-post-person">
          <Avatar person={person} />
          <div>
            {personLink(person)}
            <span className="hs-fb-post-meta">
              Fictional post · {year} demo
            </span>
          </div>
        </div>
        <p className="hs-fb-post-text">{post.text}</p>
        <div className="hs-fb-post-counts">
          {year >= 2009 && (
            <span>
              {post.likes + Number(isLiked)}{' '}
              {post.likes + Number(isLiked) === 1 ? 'like' : 'likes'}
            </span>
          )}
          <span>
            {commentList.length}{' '}
            {commentList.length === 1 ? 'comment' : 'comments'}
          </span>
        </div>
        <div className="hs-fb-post-actions">
          {year >= 2009 && (
            <button
              type="button"
              aria-pressed={isLiked}
              onClick={() =>
                setLikes((current) =>
                  isLiked
                    ? current.filter((id) => id !== post.id)
                    : [...current, post.id],
                )
              }
            >
              <ThumbsUp size={16} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
          )}
          <button
            type="button"
            aria-expanded={openComments.includes(post.id)}
            onClick={() =>
              setOpenComments((current) =>
                current.includes(post.id)
                  ? current.filter((id) => id !== post.id)
                  : [...current, post.id],
              )
            }
          >
            <MessageCircle size={16} />
            Comment
          </button>
        </div>
        {openComments.includes(post.id) && (
          <div className="hs-fb-comments">
            {commentList.map((comment, index) => (
              <div className="hs-fb-comment" key={`${post.id}-${index}`}>
                <strong>You · fictional participant</strong>
                <p>{comment}</p>
              </div>
            ))}
            <form onSubmit={(event) => addComment(event, post.id)}>
              <label
                className="hs-fb-sr-only"
                htmlFor={`comment-${instanceId}-${post.id}`}
              >
                Comment on {person.name}'s fictional post
              </label>
              <input
                id={`comment-${instanceId}-${post.id}`}
                value={commentDrafts[post.id] || ''}
                onChange={(event) =>
                  setCommentDrafts((current) => ({
                    ...current,
                    [post.id]: event.target.value,
                  }))
                }
                placeholder="Write a fictional comment…"
                maxLength={500}
                required
              />
              <button type="submit" className="hs-fb-primary">
                Post
              </button>
            </form>
          </div>
        )}
      </article>
    )
  }

  if (year < 2004)
    return (
      <div className="hs-fb-site hs-fb-campus">
        <div className="hs-fb-empty">
          <h2>Facebook had not launched in {year}</h2>
          <p>
            Select 2004 or a later year in the browser to explore this
            educational recreation.
          </p>
        </div>
      </div>
    )

  return (
    <div
      className={`hs-fb-site ${campus ? 'hs-fb-campus' : modern ? 'hs-fb-modern' : 'hs-fb-classic'}`}
    >
      <header className="hs-fb-header">
        <button
          type="button"
          className="hs-fb-wordmark"
          onClick={() => navigate('/')}
        >
          {campus ? '[ thefacebook ]' : 'facebook'}
          <span>{campus ? 'a campus directory' : 'a place to connect'}</span>
        </button>
        <form className="hs-fb-search" onSubmit={search}>
          <label
            className="hs-fb-sr-only"
            htmlFor={`hs-fb-search-${instanceId}`}
          >
            Search fictional people
          </label>
          <input
            id={`hs-fb-search-${instanceId}`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={modern ? 'Search this demo' : 'Search people'}
          />
          <button type="submit" aria-label="Search fictional people">
            <Search size={17} />
          </button>
        </form>
        <button
          type="button"
          className="hs-fb-header-profile"
          onClick={() => navigate('/profile?id=maya')}
        >
          Maya's demo profile
        </button>
      </header>
      <div className="hs-fb-disclaimer">
        <BookOpen size={15} />
        <span>
          Original educational recreation · All people, campus details, and
          posts are fictional. Local demo, no accounts.
        </span>
      </div>
      <div className="hs-fb-layout">
        <nav className="hs-fb-navigation" aria-label="Facebook demo navigation">
          <span className="hs-fb-nav-title">
            {campus ? 'Campus network' : 'Your demo space'}
          </span>
          {!campus && (
            <button
              type="button"
              className={route.pathname === '/' ? 'hs-fb-nav-active' : ''}
              onClick={() => navigate('/')}
            >
              <Home size={18} />
              News Feed
            </button>
          )}
          <button
            type="button"
            className={
              isDirectory && route.pathname !== '/profile'
                ? 'hs-fb-nav-active'
                : ''
            }
            onClick={() => navigate('/directory')}
          >
            <Users size={18} />
            {campus ? 'Browse campus' : 'Find people'}
          </button>
          <button
            type="button"
            className={
              route.pathname === '/profile' && profile?.id === 'maya'
                ? 'hs-fb-nav-active'
                : ''
            }
            onClick={() => navigate('/profile?id=maya')}
          >
            <Avatar person={people[0]} />
            My demo profile
          </button>
          <div className="hs-fb-network-note">
            <strong>Northbridge University</strong>
            <span>Fictional campus network</span>
            <span>
              {connected.length} demo{' '}
              {connected.length === 1 ? 'connection' : 'connections'}
            </span>
          </div>
          <button
            type="button"
            className="hs-fb-history-toggle"
            onClick={() => setShowHistory((shown) => !shown)}
            aria-expanded={showHistory}
          >
            <BookOpen size={17} />
            {showHistory ? 'Hide historical context' : 'Historical context'}
          </button>
        </nav>
        <main className="hs-fb-main">
          {showHistory && (
            <aside className="hs-fb-history hs-fb-panel">
              <h2>Reading this recreation</h2>
              <p>
                {campus
                  ? 'Facebook began as a college social directory in 2004. This scene concentrates on profiles and campus discovery; it does not include the News Feed, introduced in 2006, or the Like button, introduced in 2009.'
                  : modern
                    ? 'This present-day scene uses a wider social feed, rounded cards, and compact navigation. Its fictional posts are museum illustrations, not records of real events.'
                    : 'By 2010, the News Feed and Like button had become familiar parts of Facebook. This scene illustrates those interaction patterns with entirely fictional content.'}
              </p>
              <p>
                Historical references:{' '}
                <a
                  href="https://about.fb.com/news/2014/02/ten-years-of-facebook/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Meta: Ten Years of Facebook
                </a>
                ;{' '}
                <a
                  href="https://www.britannica.com/money/Facebook"
                  target="_blank"
                  rel="noreferrer"
                >
                  Britannica: Facebook
                </a>
                . Layout and museum writing are original, not archived copies.
              </p>
            </aside>
          )}
          {!knownRoute ? (
            <section className="hs-fb-panel hs-fb-empty">
              <h2>This demo page is not in the directory</h2>
              <p>
                Try searching for a fictional person, or return to the{' '}
                {campus ? 'campus directory' : 'feed'}.
              </p>
              <button
                type="button"
                className="hs-fb-primary"
                onClick={() => navigate('/')}
              >
                Return home
              </button>
            </section>
          ) : route.pathname === '/profile' ? (
            profile ? (
              <>
                <section className="hs-fb-profile hs-fb-panel">
                  {modern && (
                    <div className="hs-fb-profile-cover" aria-hidden="true">
                      <span>Connections start with a conversation.</span>
                    </div>
                  )}
                  <div className="hs-fb-profile-heading">
                    <Avatar person={profile} large />
                    <div>
                      <h1>{profile.name}</h1>
                      <p>Fictional student · Northbridge University</p>
                      <p className="hs-fb-muted">{profile.course}</p>
                    </div>
                  </div>
                  <div className="hs-fb-profile-controls">
                    <button
                      type="button"
                      className="hs-fb-primary"
                      onClick={() => toggleConnect(profile.id)}
                      aria-pressed={connected.includes(profile.id)}
                    >
                      {connected.includes(profile.id)
                        ? 'Connected · remove connection'
                        : 'Connect with ' + profile.name.split(' ')[0]}
                    </button>
                    <button
                      type="button"
                      className="hs-fb-small-button"
                      onClick={() => navigate('/directory')}
                    >
                      Browse directory
                    </button>
                  </div>
                  <div className="hs-fb-profile-about">
                    <h2>About this fictional person</h2>
                    <p>{profile.bio}</p>
                    <dl>
                      <dt>Studies</dt>
                      <dd>{profile.course}</dd>
                      <dt>Interests</dt>
                      <dd>{profile.interest}</dd>
                      <dt>Network</dt>
                      <dd>Northbridge University · fictional campus</dd>
                    </dl>
                  </div>
                </section>
                {!campus && (
                  <section aria-label={`${profile.name}'s fictional posts`}>
                    <h2 className="hs-fb-subheading">Fictional posts</h2>
                    {feedPosts.filter((post) => post.author === profile.id)
                      .length ? (
                      feedPosts
                        .filter((post) => post.author === profile.id)
                        .map(postCard)
                    ) : (
                      <div className="hs-fb-panel hs-fb-empty">
                        This fictional profile has not posted in this era.
                      </div>
                    )}
                  </section>
                )}
              </>
            ) : (
              <section className="hs-fb-panel hs-fb-empty">
                <h2>Profile not found</h2>
                <p>That person is not part of this fictional campus.</p>
                <button
                  type="button"
                  className="hs-fb-primary"
                  onClick={() => navigate('/directory')}
                >
                  Browse fictional people
                </button>
              </section>
            )
          ) : isDirectory ? (
            directory()
          ) : (
            <>
              <div className="hs-fb-feed-title">
                <h1>
                  {modern ? 'Your community, in the moment.' : 'News Feed'}
                </h1>
                <span>Fictional stories · {year}</span>
              </div>
              <form className="hs-fb-composer hs-fb-panel" onSubmit={publish}>
                <div className="hs-fb-composer-heading">
                  <Avatar person={people[0]} />
                  <label htmlFor={`hs-fb-post-${instanceId}`}>
                    {modern
                      ? 'What would you like to share?'
                      : 'Share a fictional update'}
                  </label>
                </div>
                <textarea
                  id={`hs-fb-post-${instanceId}`}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write a post for this local museum demo…"
                  maxLength={1200}
                  required
                />
                <div className="hs-fb-composer-bottom">
                  <span>Posting as fictional Maya Chen</span>
                  <button type="submit" className="hs-fb-primary">
                    Share post
                  </button>
                </div>
              </form>
              <p className="hs-fb-notice" role="status">
                {notice}
              </p>
              <section aria-label="Fictional community feed">
                {feedPosts.map(postCard)}
              </section>
            </>
          )}
        </main>
        <aside className="hs-fb-right">
          <section className="hs-fb-panel">
            <h2>{campus ? 'Meet your campus' : 'People in this demo'}</h2>
            {people.slice(1).map((person) => (
              <div className="hs-fb-suggestion" key={person.id}>
                <Avatar person={person} />
                <div>
                  {personLink(person)}
                  <p>{person.course}</p>
                </div>
                <button
                  type="button"
                  className="hs-fb-icon-button"
                  aria-label={`View ${person.name}'s fictional profile`}
                  onClick={() => navigate(`/profile?id=${person.id}`)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </section>
          <section className="hs-fb-era-note">
            <span>{year} · DESIGN STUDY</span>
            <p>
              {campus
                ? 'Small profiles. Campus connections. The early social web.'
                : modern
                  ? 'A familiar social feed, reimagined as a museum exhibit.'
                  : 'The feed brings status updates and conversations together.'}
            </p>
            <p>Use the browser year control to explore another era.</p>
          </section>
        </aside>
      </div>
      <footer className="hs-fb-footer">
        Digital Time Machine · Original recreation for learning · Fictional
        content only
      </footer>
    </div>
  )
}
