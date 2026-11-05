export const webYears = [
  1995, 1998, 2000, 2001, 2004, 2005, 2010, 2015, 2026,
] as const
export type WebYear = (typeof webYears)[number]
export type WebArticleId = 'web' | 'computers' | 'browsers'
export type HistoricalSiteId =
  'google' | 'youtube' | 'amazon' | 'wikipedia' | 'facebook'
export const historicalSites: {
  id: HistoricalSiteId
  name: string
  launched: WebYear
  debut: string
}[] = [
  {
    id: 'google',
    name: 'Google',
    launched: 1998,
    debut: 'Search becomes a starting point for the web.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    launched: 2005,
    debut: 'A new place to share and watch web video.',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    launched: 1995,
    debut: 'An online bookstore opens its virtual doors.',
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    launched: 2001,
    debut: 'A free encyclopedia that people can edit together.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    launched: 2004,
    debut: 'A college social network begins at Harvard.',
  },
]

export const webEras: Record<
  WebYear,
  {
    browser: string
    title: string
    summary: string
    html: string
    css: string
    javascript: string
  }
> = {
  1995: {
    browser: 'Navigator-style browser',
    title: 'Before Google',
    summary:
      'A browser was a new doorway to the web. Google did not launch until 1998; there is no Google homepage to recreate here.',
    html: 'HTML 2.0 was published as RFC 1866 in November 1995.',
    css: 'CSS1 became a W3C Recommendation in December 1996. This 1995 browser appearance is recreated using present-day CSS.',
    javascript:
      'JavaScript was created in 1995 and first shipped in Netscape Navigator 2.0 beta later that year; it was not an established Navigator 1.x feature.',
  },
  1998: {
    browser: 'Late-1990s browser',
    title: 'A smaller, handmade web',
    summary:
      'The beta search page put one text box above blocks of useful links. Browse this original interpretation of the early Google layout.',
    html: 'HTML 4.0 was a W3C Recommendation by December 1997. Tables were widely used for page layout.',
    css: 'CSS1 was a Recommendation; CSS2 followed in May 1998. Browser support still varied.',
    javascript:
      'JavaScript could validate forms and react to clicks. Search itself required a server; this recreation uses a local collection.',
  },
  2000: {
    browser: 'Internet Explorer 5–style',
    title: 'Search becomes a daily habit',
    summary:
      'IE5 arrived in 1999. Toolbars, menu bars and square controls framed an increasingly useful web. There are no built-in browser tabs here.',
    html: 'HTML 4.01 became a W3C Recommendation in December 1999.',
    css: 'Stylesheets increasingly separated presentation from HTML, with uneven browser support.',
    javascript:
      'Scripts added form checks and interactive menus. This local simulation makes no network requests.',
  },
  2005: {
    browser: 'Internet Explorer 6–style',
    title: 'The web starts to feel like software',
    summary:
      'IE6 was released in 2001. Web applications grew more interactive, but native IE tabs would arrive with IE7 in 2006.',
    html: 'HTML 4.01 remained the established HTML Recommendation.',
    css: 'CSS2-era layouts often used floats; browser inconsistencies made implementation difficult.',
    javascript:
      'AJAX techniques supported updates without reloading a whole page. The term was popularized in 2005.',
  },
  2001: {
    browser: 'Internet Explorer 6–style',
    title: 'New ways to connect',
    summary:
      'IE6 was released in 2001. This browser uses one page per window; native Internet Explorer tabs arrived in 2006.',
    html: 'HTML 4.01 was the established W3C Recommendation.',
    css: 'Stylesheets were increasingly common, with support varying between browsers.',
    javascript:
      'JavaScript supported form validation and interactive pages. The search collection here is local.',
  },
  2004: {
    browser: 'Internet Explorer 6–style',
    title: 'A more participatory web',
    summary:
      'The web was becoming a place to contribute, publish and connect. IE6 still had no built-in browser tabs.',
    html: 'HTML 4.01 remained the established W3C Recommendation.',
    css: 'CSS layouts spread, while floats and browser compatibility shaped how pages were built.',
    javascript:
      'Scripts made interfaces more responsive. Modern JavaScript syntax and browser capabilities would come later.',
  },
  2010: {
    browser: 'Early Chrome–style',
    title: 'Fast, social, always open',
    summary:
      'Chrome launched in 2008. Its tabs and combined address/search bar made room for a simpler browser and a familiar, centered search page.',
    html: 'HTML5 was still a draft in 2010. It became a W3C Recommendation in October 2014.',
    css: 'CSS developed as modules. Gradients, rounded corners and richer layouts spread as support improved.',
    javascript:
      'Faster engines helped power interactive applications. This scene omits later voice, Lens, apps-grid and AI controls.',
  },
  2015: {
    browser: 'Flat-design browser',
    title: 'A web for every screen',
    summary:
      'Flatter interfaces, responsive layouts and a new sans-serif Google wordmark reflected a web used on phones as well as desktops.',
    html: 'HTML5 had become a W3C Recommendation in 2014.',
    css: 'Media queries and flexible layouts supported websites across many screen sizes.',
    javascript:
      'ECMAScript 2015 standardized features including let, const, classes and promises.',
  },
  2026: {
    browser: 'Modern browser',
    title: 'The living web',
    summary:
      'A representative current design: rounded search, responsive spacing and optional shortcuts. This is a capability snapshot, not an archived 2026 release.',
    html: 'HTML is maintained as a Living Standard by WHATWG.',
    css: 'Modern CSS includes Grid, Flexbox, custom properties and container queries, with support depending on the feature and browser.',
    javascript:
      'JavaScript continues to evolve through ECMAScript releases. Modern interfaces can update locally without leaving the page.',
  },
}

export const webSources = [
  { label: 'Google’s company history', url: 'https://about.google/our-story/' },
  {
    label: 'The original 1998 Google paper',
    url: 'https://infolab.stanford.edu/~backrub/google.html',
  },
  {
    label: 'HTML 2.0 · RFC 1866 (1995)',
    url: 'https://www.rfc-editor.org/rfc/rfc1866',
  },
  {
    label: 'CSS1 Recommendation (1996)',
    url: 'https://www.w3.org/TR/REC-CSS1/',
  },
  {
    label: 'HTML5 Recommendation (2014)',
    url: 'https://www.w3.org/TR/2014/REC-html5-20141028/',
  },
  { label: 'HTML Living Standard', url: 'https://html.spec.whatwg.org/' },
] as const

export const webArticles: Record<
  WebArticleId,
  {
    title: string
    category: string
    keywords: string
    introduction: string
    events: { year: number; text: string }[]
  }
> = {
  web: {
    title: 'How the World Wide Web began',
    category: 'WEB HISTORY',
    keywords:
      'web internet network history search google html css javascript tim berners lee',
    introduction:
      'The internet is the network. The World Wide Web is one way to use it: linked documents that a browser can request and display.',
    events: [
      {
        year: 1989,
        text: 'In 1989, Tim Berners-Lee proposed an information-management system at CERN. Hypertext links would let people move between related documents.',
      },
      {
        year: 1991,
        text: 'By 1991, the first website explained the World Wide Web project. Browsers, servers and URLs made its linked pages possible.',
      },
      {
        year: 1993,
        text: 'In 1993, CERN made the web’s software freely available. Mosaic helped introduce graphical web browsing to a wider audience.',
      },
      {
        year: 1998,
        text: 'Google was founded in 1998. Its early research described using the web’s link structure to help rank search results.',
      },
      {
        year: 2010,
        text: 'By 2010, the web supported rich applications and growing mobile use. HTML5 was still a draft, rather than a final W3C Recommendation.',
      },
      {
        year: 2026,
        text: 'Today, HTML is a Living Standard. The web still connects pages through links, alongside responsive interfaces and interactive applications.',
      },
    ],
  },
  computers: {
    title: 'A short history of the personal computer',
    category: 'COMPUTING',
    keywords:
      'computer pc mac apple technology hardware machine silicon laptop',
    introduction:
      'Personal computing grew from the idea that a computer could be a tool for one person, rather than a machine shared by a whole institution.',
    events: [
      {
        year: 1975,
        text: 'The Altair 8800 reached hobbyists in 1975. Early personal-computer enthusiasts shared knowledge through clubs, magazines and demonstrations.',
      },
      {
        year: 1981,
        text: 'The IBM PC launched in 1981. An ecosystem of compatible machines and software helped personal computers spread into workplaces and homes.',
      },
      {
        year: 1984,
        text: 'The Macintosh arrived in 1984 with a graphical interface and a mouse. Earlier research systems and commercial products had already explored these ideas.',
      },
      {
        year: 1995,
        text: 'Windows 95 combined a graphical desktop with a Start menu and taskbar. Connecting to the web became a growing reason to own a computer.',
      },
      {
        year: 2010,
        text: 'By 2010, laptops, smartphones and tablets offered different ways to use personal software and the web.',
      },
      {
        year: 2026,
        text: 'Current computers range from small embedded devices to powerful workstations. Their interfaces still build on ideas developed across decades.',
      },
    ],
  },
  browsers: {
    title: 'Meet your web browser',
    category: 'BROWSERS',
    keywords:
      'browser chrome netscape explorer navigator safari firefox software links tabs',
    introduction:
      'A browser turns a web address into a page you can read and interact with. Its own controls have changed alongside the pages inside it.',
    events: [
      {
        year: 1994,
        text: 'Netscape Navigator first appeared in 1994. Early browsers gave the address field, navigation buttons and menu bar a prominent place.',
      },
      {
        year: 1998,
        text: 'Late-1990s browsers generally displayed one page per window. People found new pages through links, directories, and search engines.',
      },
      {
        year: 2006,
        text: 'Internet Explorer 7 introduced built-in tabbed browsing in 2006. Other browsers had already helped popularize tabs.',
      },
      {
        year: 2008,
        text: 'Chrome launched in 2008 with tabs above the address bar. Its omnibox combined entering an address with entering a search.',
      },
      {
        year: 2026,
        text: 'Modern browsers support responsive sites, accessibility tools and powerful web applications. Their basic Back, Forward and Home controls remain familiar.',
      },
    ],
  },
}

export function rankedWebArticles(query: string): WebArticleId[] {
  const words = query
    .toLowerCase()
    .split(/\W+/)
    .filter(
      (word) =>
        word.length > 2 && !['the', 'and', 'how', 'for', 'from'].includes(word),
    )
  return (Object.keys(webArticles) as WebArticleId[])
    .sort((a, b) => {
      const score = (id: WebArticleId) =>
        words.filter((word) => webArticles[id].keywords.includes(word)).length
      return score(b) - score(a)
    })
    .filter((id) =>
      words.some(
        (word) =>
          webArticles[id].keywords.includes(word) ||
          webArticles[id].title.toLowerCase().includes(word),
      ),
    )
}
