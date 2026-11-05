/** Local routes are strings such as /search?q=web. No route loads a live website. */
export interface HistoricalSiteProps {
  year: number
  path: string
  navigate: (path: string) => void
}
