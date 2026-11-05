import { useState } from 'react'
import { ArrowUpRight, Building2, ChevronRight } from 'lucide-react'
import { companies } from '../data/companies'
import '../styles/collections.css'

export default function CompanyExplorer() {
  const [companyId, setCompanyId] = useState('apple')
  const [milestoneIndex, setMilestoneIndex] = useState(0)
  const company =
    companies.find((item) => item.id === companyId) ?? companies[0]
  const milestone = company.milestones[milestoneIndex]

  return (
    <section className="company-explorer" aria-labelledby="company-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">
            THE PEOPLE AND PRODUCTS BEHIND THE NAMES
          </span>
          <h2 id="company-heading">
            Big ideas. Small beginnings<span className="accent-text">.</span>
          </h2>
          <p>
            Select a company, then follow the turning points that changed what
            it made.
          </p>
        </div>
        <Building2 size={34} aria-hidden="true" />
      </div>
      <div
        className="company-selector"
        role="group"
        aria-label="Choose a company"
      >
        {companies.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={company.id === item.id}
            onClick={() => {
              setCompanyId(item.id)
              setMilestoneIndex(0)
            }}
          >
            <span className="company-monogram" aria-hidden="true">
              {item.name[0]}
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <article className="company-profile" aria-labelledby="company-name">
        <div className="company-origin">
          <span className="feature-label">FOUNDED {company.founded}</span>
          <h3 id="company-name">{company.name}</h3>
          <dl>
            <div>
              <dt>Founders / formation</dt>
              <dd>{company.founders}</dd>
            </div>
            <div>
              <dt>Original business</dt>
              <dd>{company.originalBusiness}</dd>
            </div>
          </dl>
          <a
            className="feature-source"
            href={company.source.url}
            target="_blank"
            rel="noreferrer"
          >
            {company.source.label}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
        <div className="company-context">
          <div>
            <span className="feature-label">AN EARLY CHALLENGE</span>
            <p>{company.earlyChallenge}</p>
          </div>
          <div>
            <span className="feature-label">LASTING INNOVATIONS</span>
            <p>{company.innovation}</p>
          </div>
        </div>
      </article>
      <div className="company-history">
        <div
          className="company-milestones"
          role="group"
          aria-label={`${company.name} milestones`}
        >
          {company.milestones.map((item, index) => (
            <button
              key={`${company.id}-${item.year}`}
              type="button"
              aria-pressed={milestoneIndex === index}
              onClick={() => setMilestoneIndex(index)}
            >
              <span>{item.year}</span>
              <strong>{item.title}</strong>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
        <article
          className="company-detail"
          aria-live="polite"
          aria-labelledby="company-milestone-title"
        >
          <span className="company-detail-year">{milestone.year}</span>
          <h3 id="company-milestone-title">{milestone.title}</h3>
          <p>{milestone.description}</p>
          <div className="company-product">
            <span className="feature-label">
              PRODUCT EVOLUTION / {milestone.product}
            </span>
            <p>{milestone.evolution}</p>
          </div>
        </article>
      </div>
      <p className="feature-notice">
        Founding dates describe the company’s formation. Product introductions
        and public availability can come later; select a milestone to see the
        distinction.
      </p>
    </section>
  )
}
