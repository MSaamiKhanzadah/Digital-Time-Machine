import {
  GitBranch,
  Sparkles,
  SplitSquareHorizontal,
  Building2,
  Monitor,
} from 'lucide-react'
import Comparison from './Comparison'
import EvolutionExplorer from './EvolutionExplorer'
import AIExplorer from './AIExplorer'
import CompanyExplorer from './CompanyExplorer'
import ComputerMuseum from './ComputerMuseum'
import FeatureTabs, { useFeatureTab } from './FeatureTabs'
const ids = ['evolution', 'ai', 'companies', 'computers', 'compare'] as const
const tabs = [
  { id: 'evolution' as const, label: 'Evolution atlas', icon: GitBranch },
  { id: 'ai' as const, label: 'AI through time', icon: Sparkles },
  { id: 'companies' as const, label: 'Company histories', icon: Building2 },
  { id: 'computers' as const, label: 'Computer museum', icon: Monitor },
  { id: 'compare' as const, label: 'Then & now', icon: SplitSquareHorizontal },
]
export default function ExploreHub() {
  const [active, select] = useFeatureTab(ids, 'evolution', 'explore')
  return (
    <div className="feature-hub">
      <div className="hub-intro">
        <span className="section-index">02 / EXPLORE TECHNOLOGY</span>
        <h1 id="explore-heading" tabIndex={-1}>
          Follow the <em>ideas.</em>
        </h1>
        <p>
          Every invention builds on something. Explore the connections, people,
          and tools behind our digital world.
        </p>
      </div>
      <FeatureTabs
        tabs={tabs}
        active={active}
        onSelect={select}
        label="Technology collections"
      />
      <div
        role="tabpanel"
        id="evolution-panel"
        aria-labelledby="evolution-tab"
        hidden={active !== 'evolution'}
      >
        <EvolutionExplorer />
      </div>
      <div
        role="tabpanel"
        id="ai-panel"
        aria-labelledby="ai-tab"
        hidden={active !== 'ai'}
      >
        <AIExplorer />
      </div>
      <div
        role="tabpanel"
        id="companies-panel"
        aria-labelledby="companies-tab"
        hidden={active !== 'companies'}
      >
        <CompanyExplorer />
      </div>
      <div
        role="tabpanel"
        id="computers-panel"
        aria-labelledby="computers-tab"
        hidden={active !== 'computers'}
      >
        <ComputerMuseum />
      </div>
      <div
        role="tabpanel"
        id="compare-panel"
        aria-labelledby="compare-tab"
        hidden={active !== 'compare'}
      >
        <Comparison />
      </div>
    </div>
  )
}
