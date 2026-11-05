import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  GitBranch,
} from 'lucide-react'
import {
  evolutionNodes,
  evolutionTrees,
  type EvolutionBranch,
  type EvolutionTree,
} from '../data/evolution'
import '../styles/evolution.css'

function branchIds(branch: EvolutionBranch): string[] {
  return [branch.nodeId, ...(branch.children?.flatMap(branchIds) ?? [])]
}

export default function EvolutionExplorer() {
  const [treeId, setTreeId] = useState(evolutionTrees[0].id)
  const [selectedId, setSelectedId] = useState(evolutionTrees[0].root.nodeId)
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(branchIds(evolutionTrees[0].root)),
  )
  const tree =
    evolutionTrees.find((item) => item.id === treeId) ?? evolutionTrees[0]
  const selected = evolutionNodes[selectedId]

  function chooseTree(next: EvolutionTree) {
    setTreeId(next.id)
    setSelectedId(next.root.nodeId)
    setExpanded(new Set(branchIds(next.root)))
  }

  function toggleBranch(id: string) {
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function renderBranch(branch: EvolutionBranch) {
    const node = evolutionNodes[branch.nodeId]
    const hasChildren = Boolean(branch.children?.length)
    const isExpanded = expanded.has(node.id)
    return (
      <li key={node.id} className="evo-branch">
        {branch.relationship && (
          <span className="evo-relationship">{branch.relationship}</span>
        )}
        <div
          className={`evo-node-row ${selectedId === node.id ? 'evo-node-selected' : ''}`}
        >
          {hasChildren ? (
            <button
              className="evo-toggle"
              type="button"
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${node.name} descendants`}
              aria-expanded={isExpanded}
              aria-controls={`evo-children-${node.id}`}
              onClick={() => toggleBranch(node.id)}
            >
              {isExpanded ? (
                <ChevronDown size={15} aria-hidden="true" />
              ) : (
                <ChevronRight size={15} aria-hidden="true" />
              )}
            </button>
          ) : (
            <span className="evo-leaf" aria-hidden="true">
              <i />
            </span>
          )}
          <button
            className="evo-node"
            type="button"
            aria-pressed={selectedId === node.id}
            onClick={() => setSelectedId(node.id)}
          >
            <span className="evo-node-name">{node.name}</span>
            <span className="evo-node-year">{node.year}</span>
            <span className="evo-node-summary">{node.summary}</span>
          </button>
        </div>
        {hasChildren && (
          <ul
            id={`evo-children-${node.id}`}
            className="evo-children"
            hidden={!isExpanded}
          >
            {branch.children?.map(renderBranch)}
          </ul>
        )}
      </li>
    )
  }

  return (
    <section className="evo-explorer" aria-labelledby="evo-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">SIX MAPS OF CONNECTED IDEAS</span>
          <h2 id="evo-heading">
            Nothing starts from nothing<span className="accent-text">.</span>
          </h2>
          <p>
            Follow a technology’s roots and the ideas that grew around it.
            Choose a map, unfold a branch, and select a node to see its story.
          </p>
        </div>
        <GitBranch className="evo-heading-icon" size={34} aria-hidden="true" />
      </div>
      <div
        className="evo-categories"
        role="group"
        aria-label="Evolution tree categories"
      >
        {evolutionTrees.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={tree.id === item.id}
            onClick={() => chooseTree(item)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.title}
          </button>
        ))}
      </div>
      <div className="evo-layout">
        <div className="evo-map">
          <div className="evo-map-heading">
            <div>
              <span className="feature-label">CONNECTION MAP</span>
              <h3>{tree.title}</h3>
            </div>
            <button
              className="evo-expand-all"
              type="button"
              onClick={() => setExpanded(new Set(branchIds(tree.root)))}
            >
              Expand all
            </button>
          </div>
          <p className="evo-map-caption">{tree.subtitle}</p>
          <ul
            className="evo-root"
            aria-label={`${tree.title} relationship map`}
          >
            {renderBranch(tree.root)}
          </ul>
          <div className="evo-map-key">
            <span aria-hidden="true" />
            <p>
              Lines show the relationship written beside each branch. They do
              not all represent literal descent.
            </p>
          </div>
        </div>
        <article
          className="evo-detail"
          aria-labelledby="evo-detail-title"
          aria-live="polite"
        >
          <div className="evo-detail-top">
            <span className="feature-label">SELECTED TECHNOLOGY</span>
            <span className="evo-detail-date">{selected.year}</span>
          </div>
          <h3 id="evo-detail-title">{selected.name}</h3>
          <p className="evo-detail-summary">{selected.summary}</p>
          <dl className="evo-facts">
            <div>
              <dt>Origin</dt>
              <dd>{selected.origin}</dd>
            </div>
            <div>
              <dt>Creator / contributors</dt>
              <dd>{selected.creator}</dd>
            </div>
            <div>
              <dt>Original purpose</dt>
              <dd>{selected.purpose}</dd>
            </div>
          </dl>
          <div className="evo-detail-section">
            <h4>Key milestones</h4>
            <ul>
              {selected.milestones.map((milestone) => (
                <li key={milestone}>{milestone}</li>
              ))}
            </ul>
          </div>
          <div className="evo-detail-section">
            <h4>Historical influence</h4>
            <p>{selected.historicalInfluence}</p>
          </div>
          <div className="evo-detail-section">
            <h4>Related technologies</h4>
            <div className="evo-related">
              {selected.relatedTech.map((related) => (
                <span key={related}>{related}</span>
              ))}
            </div>
          </div>
          <a
            className="feature-source evo-source"
            href={selected.source.url}
            target="_blank"
            rel="noreferrer"
          >
            {selected.source.label}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  )
}
