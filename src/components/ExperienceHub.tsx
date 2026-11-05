import { useState } from 'react'
import { Command, Globe, Monitor, Code2, Archive } from 'lucide-react'
import DesktopSimulation, { type DesktopVariant } from './DesktopSimulation'
import WebTimeLab from './WebTimeLab'
import ChallengeStudio from './ChallengeStudio'
import PredictionCapsule from './PredictionCapsule'
import FeatureTabs, { useFeatureTab } from './FeatureTabs'
const ids = ['desktop', 'web-lab', 'challenges', 'capsule'] as const
const tabs = [
  { id: 'desktop' as const, label: 'Desktop playground', icon: Monitor },
  { id: 'web-lab' as const, label: 'Old internet', icon: Globe },
  { id: 'challenges' as const, label: 'Challenges', icon: Code2 },
  { id: 'capsule' as const, label: 'Time capsule', icon: Archive },
]
export default function ExperienceHub() {
  const [desktopVariant, setDesktopVariant] = useState<DesktopVariant>('win95')
  const [active, select] = useFeatureTab(ids, 'desktop', 'experience')
  return (
    <div className="feature-hub">
      <div className="hub-intro">
        <span className="section-index">03 / EXPERIENCE THE PAST</span>
        <h1 id="experience-heading" tabIndex={-1}>
          History, <em>hands on.</em>
        </h1>
        <p>
          Don’t just read about the past. Open a window, follow a link, and make
          something of your own.
        </p>
      </div>
      <FeatureTabs
        tabs={tabs}
        active={active}
        onSelect={select}
        label="Interactive experiences"
      />
      <div
        role="tabpanel"
        id="desktop-panel"
        aria-labelledby="desktop-tab"
        hidden={active !== 'desktop'}
      >
        <section
          className="desktop-section content-section"
          id="desktop"
          aria-labelledby="desktop-heading"
        >
          <div className="section-kicker">
            <span className="section-index">THE DESKTOP PLAYGROUND</span>
            <span className="era-chip">
              ORIGINAL RECREATION /{' '}
              {desktopVariant === 'win95'
                ? 1995
                : desktopVariant === 'xp'
                  ? 2001
                  : 2026}
            </span>
          </div>
          <div className="section-heading">
            <div>
              <h2 id="desktop-heading">
                Less scrolling. More clicking
                <span className="accent-text">.</span>
              </h2>
              <p>Back when the desktop was a place. Make yourself at home.</p>
            </div>
            <span className="desktop-instruction">
              <Command size={16} />
              CLICK, TYPE, DRAG & DISCOVER
            </span>
          </div>
          <div
            className="desktop-era-controls"
            role="group"
            aria-label="Desktop era"
          >
            <span>CHOOSE A PLAYGROUND</span>
            {(
              [
                { id: 'win95', label: 'Windows 95' },
                { id: 'xp', label: 'Windows XP' },
                { id: 'modern', label: 'Modern desktop' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                aria-pressed={desktopVariant === item.id}
                onClick={() => setDesktopVariant(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <DesktopSimulation key={desktopVariant} variant={desktopVariant} />
          <div className="desktop-caption">
            <span>
              <i />
              AN ORIGINAL EDUCATIONAL DESKTOP RECREATION
            </span>
            <span>Open a folder. Write a note. Browse the early web.</span>
          </div>
        </section>
      </div>
      <div
        role="tabpanel"
        id="web-lab-panel"
        aria-labelledby="web-lab-tab"
        hidden={active !== 'web-lab'}
      >
        <WebTimeLab />
      </div>
      <div
        role="tabpanel"
        id="challenges-panel"
        aria-labelledby="challenges-tab"
        hidden={active !== 'challenges'}
      >
        <ChallengeStudio />
      </div>
      <div
        role="tabpanel"
        id="capsule-panel"
        aria-labelledby="capsule-tab"
        hidden={active !== 'capsule'}
      >
        <PredictionCapsule />
      </div>
    </div>
  )
}
