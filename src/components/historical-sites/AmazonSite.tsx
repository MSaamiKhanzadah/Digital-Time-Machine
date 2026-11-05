import { useEffect, useState } from 'react'
import type { CSSProperties, FormEvent, MouseEvent } from 'react'
import {
  museumProducts,
  readMuseumRoute,
  samplePrice,
} from '../../data/historicalCommerce'
import type { MuseumProduct } from '../../data/historicalCommerce'
import type { HistoricalSiteProps } from '../../types/historicalBrowser'
import '../../styles/historical-commerce.css'

const cartKey = 'digital-time-machine-sample-cart'
function readCart(): Record<string, number> {
  try {
    const saved: unknown = JSON.parse(sessionStorage.getItem(cartKey) || '{}')
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {}
    return Object.fromEntries(
      Object.entries(saved).filter(
        ([id, quantity]) =>
          museumProducts.some((item) => item.id === id) &&
          Number.isInteger(quantity) &&
          Number(quantity) > 0 &&
          Number(quantity) <= 20,
      ),
    )
  } catch {
    return {}
  }
}

function ProductIllustration({ product }: { product: MuseumProduct }) {
  return (
    <div
      className={`hs-amz-product-art hs-amz-art-${product.kind}`}
      style={{ '--hs-amz-product-color': product.color } as CSSProperties}
      role="img"
      aria-label={`Original sample illustration of ${product.title}`}
    >
      {product.kind === 'book' ? (
        <div className="hs-amz-book">
          <span className="hs-amz-book-imprint">MUSEUM PRESS</span>
          <strong>{product.coverTitle}</strong>
          <span className="hs-amz-book-mark" aria-hidden="true">
            ✳
          </span>
          <span className="hs-amz-book-edition">An imaginary edition</span>
        </div>
      ) : (
        <svg viewBox="0 0 260 240" aria-hidden="true">
          {product.kind === 'mouse' && (
            <g>
              <path
                d="M130 77C65 4 196 24 181 0"
                fill="none"
                stroke="#7a8588"
                strokeWidth="4"
              />
              <rect
                x="77"
                y="75"
                width="106"
                height="140"
                rx="49"
                fill={product.color}
              />
              <path
                d="M130 76V127M79 132H181"
                stroke="#c1c6c6"
                strokeWidth="2"
              />
              <rect
                x="125"
                y="98"
                width="10"
                height="25"
                rx="5"
                fill="#bfc9c9"
              />
              <path d="M92 155V175" stroke="#859398" strokeWidth="3" />
            </g>
          )}
          {product.kind === 'player' && (
            <g>
              <rect
                x="65"
                y="17"
                width="130"
                height="211"
                rx="15"
                fill={product.color}
                stroke="#7f929a"
                strokeWidth="2"
              />
              <rect
                x="79"
                y="35"
                width="102"
                height="76"
                rx="3"
                fill="#485f68"
              />
              <text
                x="130"
                y="57"
                textAnchor="middle"
                fontSize="9"
                fill="#f5f8dc"
                fontFamily="monospace"
              >
                MUSEUM MIX
              </text>
              <path
                d="M92 72H166M92 83H153M92 94H161"
                stroke="#b7d1c5"
                strokeWidth="3"
              />
              <circle cx="130" cy="164" r="41" fill="#f4f7f5" />
              <circle cx="130" cy="164" r="15" fill="#aabfc4" />
              <path d="M127 190L135 195L127 200Z" fill="#6f838b" />
            </g>
          )}
          {product.kind === 'headphones' && (
            <g>
              <path
                d="M63 157V111A67 67 0 0 1 197 111V157"
                fill="none"
                stroke={product.color}
                strokeWidth="24"
              />
              <path
                d="M63 111A67 67 0 0 1 197 111"
                fill="none"
                stroke="#84958a"
                strokeWidth="9"
              />
              <rect
                x="43"
                y="132"
                width="47"
                height="77"
                rx="20"
                fill={product.color}
              />
              <rect
                x="170"
                y="132"
                width="47"
                height="77"
                rx="20"
                fill={product.color}
              />
              <rect
                x="77"
                y="140"
                width="14"
                height="62"
                rx="6"
                fill="#708577"
              />
              <rect
                x="169"
                y="140"
                width="14"
                height="62"
                rx="6"
                fill="#708577"
              />
            </g>
          )}
        </svg>
      )}
    </div>
  )
}

export default function AmazonSite({
  year,
  path,
  navigate,
}: HistoricalSiteProps) {
  const route = readMuseumRoute(path)
  const query = route.searchParams.get('q') || ''
  const [search, setSearch] = useState(query)
  const [cart, setCart] = useState<Record<string, number>>(readCart)
  const [message, setMessage] = useState('')
  const [lastOrder, setLastOrder] = useState<{
    count: number
    total: number
  } | null>(null)
  const era =
    year < 2005 ? '1995' : year < 2015 ? '2005' : year < 2026 ? '2015' : '2026'
  const available = museumProducts.filter((item) => item.availableFrom <= year)
  const items = available.filter((item) => cart[item.id])
  const count = items.reduce((sum, item) => sum + cart[item.id], 0)
  const total = items.reduce((sum, item) => sum + item.price * cart[item.id], 0)
  const laterItems = museumProducts.filter(
    (item) => item.availableFrom > year && cart[item.id],
  ).length
  const product =
    route.pathname === '/product'
      ? available.find((item) => item.id === route.searchParams.get('id'))
      : undefined
  const results = available.filter((item) =>
    `${item.title} ${item.kind} ${item.description} ${item.details.join(' ')}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  )

  useEffect(() => setSearch(query), [query])
  useEffect(() => setMessage(''), [path, year])
  useEffect(() => {
    try {
      sessionStorage.setItem(cartKey, JSON.stringify(cart))
    } catch {
      /* Cart still works in memory if storage is unavailable. */
    }
  }, [cart])

  const follow =
    (destination: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      navigate(destination)
    }
  const searchProducts = (event: FormEvent) => {
    event.preventDefault()
    navigate(`/search?q=${encodeURIComponent(search.trim())}`)
  }
  const addToCart = (item: MuseumProduct) => {
    setCart((existing) => ({
      ...existing,
      [item.id]: Math.min((existing[item.id] || 0) + 1, 20),
    }))
    setMessage(
      `${item.title} added to your simulated cart. Maximum 20 of each sample item.`,
    )
  }
  const order = () => {
    if (!count) return
    setLastOrder({ count, total })
    setCart((existing) =>
      Object.fromEntries(
        Object.entries(existing).filter(
          ([id]) => !available.some((item) => item.id === id),
        ),
      ),
    )
    navigate('/order-confirmation')
  }
  const productCard = (item: MuseumProduct) => (
    <article className="hs-amz-product-card" key={item.id}>
      <a
        className="hs-amz-art-link"
        href={`/product?id=${item.id}`}
        onClick={follow(`/product?id=${item.id}`)}
        aria-label={`View ${item.title}`}
      >
        <ProductIllustration product={item} />
      </a>
      <div className="hs-amz-card-copy">
        <span className="hs-amz-item-type">
          {item.kind === 'book'
            ? 'Fictional museum book'
            : 'Sample electronics'}
        </span>
        <h3>
          <a
            href={`/product?id=${item.id}`}
            onClick={follow(`/product?id=${item.id}`)}
          >
            {item.title}
          </a>
        </h3>
        <p>
          {item.kind === 'book'
            ? 'by Museum Press · imaginary edition'
            : 'Museum collection · original sample'}
        </p>
        <strong className="hs-amz-price">{samplePrice(item.price)}</strong>
        <span className="hs-amz-price-label">sample price</span>
        <a
          className="hs-amz-details-link"
          href={`/product?id=${item.id}`}
          onClick={follow(`/product?id=${item.id}`)}
        >
          More information →
        </a>
      </div>
    </article>
  )

  if (year < 1995)
    return (
      <div className="hs-commerce-unavailable">
        <h2>This bookstore recreation begins in 1995</h2>
        <p>
          Amazon opened its online bookstore in 1995. Choose 1995 or later to
          browse the original sample inventory.
        </p>
      </div>
    )

  const knownRoute = [
    '/',
    '/search',
    '/product',
    '/cart',
    '/order-confirmation',
  ].includes(route.pathname)
  return (
    <div className={`hs-amz-site hs-amz-era-${era}`} data-site="amazon">
      <header className="hs-amz-header">
        <a
          className="hs-amz-logo"
          href="/"
          onClick={follow('/')}
          aria-label="Amazon home"
        >
          amazon<span>.com</span>
          <small>
            {era === '1995'
              ? 'Earth’s biggest bookstore — recreated'
              : 'a little bit of everything'}
          </small>
        </a>
        <form className="hs-amz-search" role="search" onSubmit={searchProducts}>
          <input
            type="search"
            aria-label="Search products"
            placeholder={
              era === '1995'
                ? 'Search our sample books'
                : 'Search the sample store'
            }
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search products</button>
        </form>
        <a
          className="hs-amz-cart-link"
          href="/cart"
          onClick={follow('/cart')}
          aria-label="View cart"
        >
          <span aria-hidden="true">{era === '1995' ? '' : '▱ '}</span>Cart (
          {count})
        </a>
      </header>
      <nav className="hs-amz-nav" aria-label="Store departments">
        <a href="/" onClick={follow('/')}>
          {era === '1995' ? 'Welcome' : 'All products'}
        </a>
        <a href="/search?q=book" onClick={follow('/search?q=book')}>
          Books
        </a>
        {year >= 2005 && (
          <a
            href="/search?q=electronics"
            onClick={follow('/search?q=electronics')}
          >
            Electronics
          </a>
        )}
        <a href="/search?q=web" onClick={follow('/search?q=web')}>
          Discover the web
        </a>
      </nav>
      <div className="hs-amz-simulation-note">
        Educational store simulation · Original sample inventory · No real
        purchases
      </div>
      <main className="hs-amz-main">
        {!knownRoute || (route.pathname === '/product' && !product) ? (
          <div className="hs-commerce-empty">
            <h2>This item is not in the {year} collection</h2>
            <p>
              Try a book title, browse the store, or select a later year to see
              electronics.
            </p>
            <a href="/" onClick={follow('/')}>
              Return to the store
            </a>
          </div>
        ) : route.pathname === '/order-confirmation' ? (
          <section className="hs-amz-confirmation">
            {lastOrder ? (
              <>
                <span className="hs-amz-confirmation-check" aria-hidden="true">
                  ✓
                </span>
                <h2>Your simulated order is complete</h2>
                <p>
                  You explored how an online store turns a catalog into a
                  shopping cart and an order.
                </p>
                <p>
                  {lastOrder.count} sample{' '}
                  {lastOrder.count === 1 ? 'item' : 'items'} · Simulated total{' '}
                  <strong>{samplePrice(lastOrder.total)}</strong>
                </p>
                <p>
                  No payment was taken. No goods will be shipped. No personal
                  information was collected.
                </p>
              </>
            ) : (
              <>
                <h2>No simulated order yet</h2>
                <p>
                  Add a sample item to your cart to try the store’s local order
                  flow.
                </p>
              </>
            )}
            <a href="/" onClick={follow('/')}>
              Continue exploring the sample store
            </a>
          </section>
        ) : route.pathname === '/cart' ? (
          <section className="hs-amz-cart">
            <h2>Your shopping cart</h2>
            <p className="hs-amz-cart-intro">
              A local simulation. Quantities and sample totals update here; no
              checkout details are needed.
            </p>
            {laterItems > 0 && (
              <p className="hs-amz-era-note">
                {laterItems} saved sample{' '}
                {laterItems === 1 ? 'product belongs' : 'products belong'} to a
                later era. Choose a later year to see them again.
              </p>
            )}
            {items.length ? (
              <div className="hs-amz-cart-layout">
                <div>
                  {items.map((item) => (
                    <article className="hs-amz-cart-item" key={item.id}>
                      <ProductIllustration product={item} />
                      <div>
                        <h3>
                          <a
                            href={`/product?id=${item.id}`}
                            onClick={follow(`/product?id=${item.id}`)}
                          >
                            {item.title}
                          </a>
                        </h3>
                        <p>{samplePrice(item.price)} each · sample price</p>
                        <div className="hs-amz-cart-actions">
                          <label>
                            Quantity{' '}
                            <input
                              type="number"
                              min="1"
                              max="20"
                              value={cart[item.id]}
                              aria-label={`Quantity for ${item.title}`}
                              onChange={(event) => {
                                const quantity = Number(event.target.value)
                                if (Number.isFinite(quantity))
                                  setCart((existing) => ({
                                    ...existing,
                                    [item.id]: Math.max(
                                      1,
                                      Math.min(20, Math.floor(quantity)),
                                    ),
                                  }))
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            aria-label={`Remove ${item.title}`}
                            onClick={() =>
                              setCart((existing) =>
                                Object.fromEntries(
                                  Object.entries(existing).filter(
                                    ([id]) => id !== item.id,
                                  ),
                                ),
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <strong className="hs-amz-line-total">
                        {samplePrice(item.price * cart[item.id])}
                      </strong>
                    </article>
                  ))}
                </div>
                <aside className="hs-amz-order-summary">
                  <h3>Sample order summary</h3>
                  <p>
                    {count} {count === 1 ? 'item' : 'items'}
                  </p>
                  <p>
                    Simulated subtotal <strong>{samplePrice(total)}</strong>
                  </p>
                  <p>Shipping and tax: not applicable to this exhibit.</p>
                  <button
                    className="hs-amz-buy-button"
                    type="button"
                    onClick={order}
                  >
                    Place simulated order
                  </button>
                  <small>
                    No payment. No delivery. Just a little web history.
                  </small>
                </aside>
              </div>
            ) : (
              <div className="hs-commerce-empty">
                <h3>Your cart is empty</h3>
                <p>Choose a sample book or product to try the shopping flow.</p>
                <a href="/" onClick={follow('/')}>
                  Browse the sample store
                </a>
              </div>
            )}
          </section>
        ) : product ? (
          <div className="hs-amz-detail">
            <div className="hs-amz-detail-art">
              <ProductIllustration product={product} />
            </div>
            <div className="hs-amz-detail-copy">
              <p className="hs-amz-item-type">
                {product.kind === 'book'
                  ? 'Books · Fictional museum edition'
                  : 'Electronics · Original museum prop'}
              </p>
              <h2>{product.title}</h2>
              <p className="hs-amz-byline">
                {product.kind === 'book'
                  ? 'by Museum Press (fictional)'
                  : 'from the Museum Collection (fictional)'}
              </p>
              <hr />
              <p>{product.description}</p>
              <ul>
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className="hs-amz-price">
                {samplePrice(product.price)}{' '}
                <span className="hs-amz-price-label">sample price</span>
              </p>
              <p className="hs-amz-price-explainer">
                An invented price for this demonstration, not an original
                historical retail price.
              </p>
              <button
                className="hs-amz-buy-button"
                type="button"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
              <div className="hs-amz-added" role="status">
                {message}
              </div>
              {message && (
                <a href="/cart" onClick={follow('/cart')}>
                  Go to your simulated cart →
                </a>
              )}
            </div>
          </div>
        ) : (
          <>
            <section className="hs-amz-welcome">
              <div>
                <span className="hs-amz-eyebrow">
                  {era === '1995'
                    ? 'A BOOKSTORE AT YOUR DESK'
                    : era === '2005'
                      ? 'BOOKS, BITS & EVERYDAY DISCOVERIES'
                      : 'THE MUSEUM MARKETPLACE'}
                </span>
                <h2>
                  {route.pathname === '/search'
                    ? `Search results${query ? ` for “${query}”` : ''}`
                    : era === '1995'
                      ? 'Welcome to the world of books.'
                      : era === '2005'
                        ? 'More to discover. Still one click away.'
                        : 'Find a little piece of computing history.'}
                </h2>
                <p>
                  {route.pathname === '/search'
                    ? `${results.length} sample ${results.length === 1 ? 'item' : 'items'} in the ${year} collection.`
                    : era === '1995'
                      ? 'Browse our small, carefully chosen collection of imaginary books. Find a title, read about it, and try a shopping cart.'
                      : 'A hand-picked collection of fictional books and electronics. Explore the way shopping on the web changed.'}
                </p>
              </div>
              {route.pathname !== '/search' && (
                <div className="hs-amz-welcome-decoration" aria-hidden="true">
                  {era === '1995'
                    ? 'BOOKS\n& IDEAS'
                    : 'small finds.\nbig ideas.'}
                </div>
              )}
            </section>
            <div className="hs-amz-catalog-heading">
              <h3>
                {route.pathname === '/search'
                  ? 'Matching sample inventory'
                  : era === '1995'
                    ? 'Books we invite you to discover'
                    : 'Explore the collection'}
              </h3>
              <span>{results.length} sample items</span>
            </div>
            {results.length ? (
              <div className="hs-amz-product-grid">
                {results.map(productCard)}
              </div>
            ) : (
              <div className="hs-commerce-empty">
                <h3>No sample items found</h3>
                <p>
                  Try “web”, “book”, or choose 2005 or later for electronics.
                </p>
                <a href="/" onClick={follow('/')}>
                  Browse all available items
                </a>
              </div>
            )}
          </>
        )}
      </main>
      <footer className="hs-commerce-disclosure">
        <strong>
          Original educational recreation · {year} interface style
        </strong>
        <p>
          All inventory and prices are invented museum samples, not archived
          listings or historical retail prices. Books are fictional editions.
          The cart is stored only in this browser tab’s session.
        </p>
        <details>
          <summary>Historical context & reference</summary>
          <p>
            Amazon opened its online bookstore in 1995 and later expanded into
            many categories. The{' '}
            {era === '1995'
              ? 'simple, book-focused'
              : era === '2005'
                ? 'department-based'
                : 'dark-header marketplace'}{' '}
            layout interprets that evolution rather than reproducing an exact
            dated page.{' '}
            <a
              href="https://www.aboutamazon.com/about-us"
              target="_blank"
              rel="noreferrer"
            >
              About Amazon (external reference)
            </a>
            .
          </p>
        </details>
      </footer>
    </div>
  )
}
