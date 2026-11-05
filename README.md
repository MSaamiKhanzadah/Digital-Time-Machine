# Digital Time Machine

**Experience the Evolution of Technology.**

An interactive technology museum that transforms as you travel between 1995, 2010, and 2026. Built with React, TypeScript, and Vite. No backend, account, database, or API key is required.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm ci
npm run dev
```

Vite prints the development address. The server listens on port 5173 and all interfaces, so it also works in a cloud development environment.

```sh
npm run build       # TypeScript validation + optimized production build
npm run preview     # Serve the production build
npm run typecheck   # TypeScript only
npm run format:check
```

## Explore

Three main sections keep the museum easy to navigate. Section and collection URLs support browser Back/Forward, direct links, and keyboard use.

### Travel Through Time

A keyboard-accessible timeline and slider cover 1950, 1960, 1970, 1980, 1990, 1995, 2000, 2005, 2010, 2015, 2020, and 2026. Every stop has sourced context. The 1995, 2010, and 2026 destinations provide full collections with distinct typography, layouts, components, and illustrations; other years are explicitly historical snapshots. Browse 16 exhibits across computers, internet, software, programming, and mobile technology.

### Explore Technology

- **Evolution atlas:** six expandable relationship maps for languages, operating systems, hardware, the internet, AI, and web development. Nodes expose origins, contributors, milestones, influence, and references. Labels distinguish direct descent from inspiration or complementary technologies.
- **AI through time:** eleven historical moments, including AI winters, with a deterministic, original ELIZA-inspired teaching toy. Every chatbot reply shows its matching rule. It does not call an AI service or retain conversations after reload.
- **Company histories:** explore Apple, Microsoft, Google, Amazon, and IBM through their beginnings, challenges, products, and selectable milestones.
- **Computer museum:** inspect six carefully scoped configurations, with CPU, RAM, storage, manufacturer, nominal launch price where documented, and side-by-side specification comparisons.
- **Then & now:** compare computers, websites, software, programming tools, mobile phones, and storage across the three immersive eras.

### Experience the Past

- **Desktop playground:** Windows 95-inspired, Windows XP-inspired, and original modern desktop recreations share working file exploration, editable session-only Notepad, browser pages, Start/app menus, draggable windows, keyboard movement, taskbar restore, minimize/maximize, and restart. Modern mode adds working app/document search and left/right window snapping. Documents include clearly labeled archived 1995 notes. These are original educational interfaces, not operating systems.
- **Explore the Old Internet:** Google, YouTube, Amazon, Wikipedia, and Facebook-inspired recreations run entirely on local mock data. Choose 1995, 1998, 2000, 2001, 2004, 2005, 2010, 2015, or 2026. Browser chrome changes with the year, and Back, Forward, Home, Refresh, and the local address field work. Sites unavailable in the chosen year show their actual launch year instead of a fictional page.
- **Website interactions:** search the local Google collection and open reading pages; play original silent museum animations and add comments in YouTube; search sample products and edit a cart or complete a pretend order in Amazon; search crosslinked, date-filtered Wikipedia articles; explore fictional Facebook profiles, connections, posts, likes, and comments. The 2004 directory omits the later News Feed and Like button.
- **Website comparison:** select a site, open two independent browsers, and choose their years. Each edition supports its own browsing and forms. “What changed?” explains each site's design study alongside contemporary HTML, CSS, and JavaScript context. Read-only code examples illustrate the era.
- **HTML workshop:** build a small 1995-style homepage in a live editor. Four meaningful checks validate headings, paragraphs, links, and the HTML-only exercise. An allowlisted, sandboxed preview denies scripts and network resources.
- **Digital time capsule:** create, edit, delete, and revisit predictions with title, creation date, target year, confidence, prediction, and reasoning. Records are saved in this browser's localStorage. Invalid existing data is preserved, and unavailable/quota-limited storage is explicitly labeled session-only rather than falsely reported as saved.

Simulation interactions are temporary and can reset when switching sites, restarting a desktop, or reloading. Predictions persist only in the same browser and origin; clearing site data removes them. No real uploads, purchases, accounts, or external browsing occur inside the recreations. Reference links intentionally open the real source in a separate tab.

Native exhibit dialogs support Escape and focus restoration. Feature tabs support arrow keys, Home, and End. Animations respect reduced motion. The layout adapts to desktop and mobile, and desktop windows stay within the available space.

## Browser tests

```sh
# If a system Chromium browser is not installed:
npx playwright install chromium

npm run test:e2e
```

Tests automatically use `/usr/bin/chromium` when available, otherwise the Playwright-managed browser. Set `CHROMIUM_PATH` to select a different Chromium executable. The suite runs desktop and mobile Chromium checks for timeline travel, era transformation, historical snapshots, section and browser navigation, exhibit filtering/details, keyboard focus, comparison controls, editable simulated documents, window management, evolution maps, AI pattern traces, responsive bounds, reduced motion, and WCAG accessibility findings.

## Structure

```text
src/
  App.tsx                   # Three-section navigation and era state
  components/
    Timeline.tsx            # 1950—2026 stops and keyboard slider
    Museum.tsx              # Era collections and native detail dialogs
    ExploreHub.tsx          # Evolution, AI, companies, computers, comparisons
    ExperienceHub.tsx       # Desktop, old internet, challenge, predictions
    DesktopSimulation.tsx   # Three themes, one functional window engine
    WebTimeLab.tsx          # Local route history, browser chrome, comparisons
    historical-sites/      # Original interactive website scenes
    ChallengeStudio.tsx     # HTML-only workshop and restricted preview
    PredictionCapsule.tsx   # Local prediction CRUD
  data/                     # Typed history, references, original sample content
  hooks/usePredictions.ts   # Validated storage and failure recovery
  styles/                   # Scoped themes and responsive layouts
tests/                      # Desktop/mobile functional and accessibility checks
```

## Historical framing

Each exhibit separates its gallery year from its actual introduction date. For example, Windows 7 was released in 2009 but appears in the 2010 gallery; HTML5 was still in development in 2010. The 2026 gallery describes established platforms in use today, not invented releases. Source links lead to official documentation, release announcements, standards, or museum collections; two are museum catalog searches. The references are supplied for further reading, not represented as live-verified archival citations.

All device artwork is original interpretive vector illustration, not authentic historical photography. The Windows-inspired desktop and its webpages/files are clearly labeled simulations. Operating system and product names belong to their respective owners; this project is not affiliated with them.

To add an era, extend the types and structured data, supply its theme and illustrations, and enable its timeline destination only when the experience works.

## Deliberate boundaries

The historical sites are original design studies, not exact archived copies. Video clips are original SVG animations, social profiles and posts are fictional, and storefront inventory/prices are sample data rather than historical retail offers. Computer launch-price facts are separately sourced and explicitly configuration-specific. The 2026 interfaces describe established capabilities and do not invent product launches.

The application uses lightweight vector artwork rather than advanced 3D. Additional full immersive historical galleries beyond 1995, 2010, and 2026 remain future expansion; every other timeline stop already provides a meaningful historical overview.
