import type { HistoricalSiteId } from './webHistory'

export const siteReferences: Record<
  HistoricalSiteId,
  { label: string; url: string }
> = {
  google: {
    label: 'Google · Our story',
    url: 'https://about.google/our-story/',
  },
  youtube: {
    label: 'YouTube · Our story',
    url: 'https://www.youtube.com/howyoutubeworks/our-story/',
  },
  amazon: {
    label: 'Amazon · About us',
    url: 'https://www.aboutamazon.com/about-us',
  },
  wikipedia: {
    label: 'Wikimedia Foundation · Wikipedia',
    url: 'https://wikimediafoundation.org/our-work/wikipedia/',
  },
  facebook: {
    label: 'Meta · Ten years of Facebook',
    url: 'https://about.fb.com/news/2014/02/ten-years-of-facebook/',
  },
}

/** Describes the educational design study, without claiming exact archived capabilities. */
export function siteDesignContext(site: HistoricalSiteId, year: number) {
  const modern = year >= 2015
  const descriptions: Record<
    HistoricalSiteId,
    { title: string; layout: string; interaction: string; expectations: string }
  > = {
    google: {
      title:
        year <= 1998
          ? 'A search box becomes a starting point'
          : modern
            ? 'Search for every screen'
            : 'A familiar place to begin',
      layout:
        year <= 1998
          ? 'A sparse serif page and blocks of text links put search at the center.'
          : modern
            ? 'Rounded controls, generous whitespace, and responsive spacing prioritize the query.'
            : 'A large wordmark, square controls, and text-heavy results keep navigation simple.',
      interaction:
        'Type a query, open a locally written result, and use the browser history to return. Search is simulated, not a live index.',
      expectations:
        'Finding a useful answer quickly became a core expectation of the web.',
    },
    youtube: {
      title:
        year <= 2005
          ? 'A directory of shared clips'
          : modern
            ? 'Video becomes an application'
            : 'A growing video community',
      layout:
        year <= 2005
          ? 'Small thumbnails, simple lists, and blue links evoke early video sharing.'
          : modern
            ? 'Larger cards, cleaner navigation, and a prominent player adapt to different screens.'
            : 'A recognizable header and a related-video column surround the watch page.',
      interaction:
        'Search the original museum clips, play or pause an illustrative animation, and add a local comment. These are sample clips, not archived uploads.',
      expectations:
        'Users increasingly expected easy discovery, playback controls, and conversation around video.',
    },
    amazon: {
      title:
        year <= 1998
          ? 'An online bookstore'
          : modern
            ? 'A marketplace in a browser'
            : 'The catalog expands',
      layout:
        year <= 1998
          ? 'Text, blue links, and simple catalog rows reflect a bookstore on the early web.'
          : modern
            ? 'A strong navigation band, product cards, and a visible cart organize a larger marketplace.'
            : 'More categories and prominent product details make a growing catalog easier to browse.',
      interaction:
        'Search sample inventory, inspect a product, edit the simulated cart, and place a local pretend order. All prices and inventory are fictional museum samples.',
      expectations:
        'Shoppers came to expect searchable catalogs, clear product details, and an understandable checkout flow.',
    },
    wikipedia: {
      title:
        year <= 2004
          ? 'A young collaborative encyclopedia'
          : modern
            ? 'Reading, with room to explore'
            : 'An encyclopedia of linked topics',
      layout:
        year <= 2004
          ? 'A plain page of topic links and text evokes an early wiki.'
          : modern
            ? 'Article contents and appearance controls help readers navigate longer pages.'
            : 'A left navigation column and article contents frame familiar blue crosslinks.',
      interaction:
        'Search six original articles, follow related topics, and change text size. Facts in the recreation are filtered to the selected year.',
      expectations:
        'Readers expected references, links between concepts, and knowledge they could explore from many starting points.',
    },
    facebook: {
      title:
        year < 2006
          ? 'A campus directory'
          : modern
            ? 'A mobile-shaped social feed'
            : 'The social feed becomes familiar',
      layout:
        year < 2006
          ? 'Compact profiles and a college directory evoke the earliest social-network layout.'
          : modern
            ? 'Cards, larger spacing, and responsive navigation frame a contemporary feed.'
            : 'A blue header and a central stream of posts organize social activity.',
      interaction:
        year < 2006
          ? 'Explore fictional profiles and connect locally. News Feed arrived in 2006 and the Like button in 2009, so neither is presented here.'
          : 'Explore fictional posts and profiles, write a sample post, and try local likes and comments. No real people or accounts are contacted.',
      expectations:
        'The interface shifted from finding people toward following an ongoing stream of shared activity.',
    },
  }
  return descriptions[site]
}
