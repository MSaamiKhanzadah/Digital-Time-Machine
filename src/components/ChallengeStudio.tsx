import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, Code2, RotateCcw, Sparkles } from 'lucide-react'
import {
  htmlExample,
  htmlStarter,
  htmlTasks,
  htmlWorkshopSource,
} from '../data/challenges'
import '../styles/challenges.css'

const allowedTags = new Set([
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'A',
  'UL',
  'OL',
  'LI',
  'STRONG',
  'EM',
  'B',
  'I',
  'BR',
  'HR',
  'BLOCKQUOTE',
  'PRE',
  'CODE',
])
const ignoredTags = new Set([
  'HEAD',
  'TITLE',
  'SCRIPT',
  'STYLE',
  'IFRAME',
  'OBJECT',
  'EMBED',
  'IMG',
  'LINK',
  'META',
  'SVG',
  'FORM',
  'INPUT',
  'BUTTON',
  'VIDEO',
  'AUDIO',
  'CANVAS',
])

/** Parse into an inert template and copy only a small HTML vocabulary into a new tree. */
function inspectPage(code: string) {
  const template = document.createElement('template')
  template.innerHTML = code
  const content = template.content
  const heading = content.querySelector('h1')?.textContent?.trim()
  const paragraph = [...content.querySelectorAll('p')].some(
    (p) =>
      (p.textContent?.trim().split(/\s+/).filter(Boolean).length ?? 0) >= 5,
  )
  const link = [...content.querySelectorAll('a')].some(
    (a) =>
      a.getAttribute('href') === '#museum' && Boolean(a.textContent?.trim()),
  )
  const htmlOnly = !content.querySelector(
    'script,style,iframe,object,embed,img,link,meta,svg,form,input,button,video,audio,canvas,[style],[onclick],[onload]',
  )
  const target = document.createElement('div')
  function copy(node: Node, parent: HTMLElement) {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent ?? ''))
      return
    }
    if (!(node instanceof HTMLElement) || ignoredTags.has(node.tagName)) return
    if (!allowedTags.has(node.tagName)) {
      for (const child of node.childNodes) copy(child, parent)
      return
    }
    const safe = document.createElement(node.tagName.toLowerCase())
    if (node.tagName === 'A')
      safe.setAttribute(
        'href',
        node.getAttribute('href') === '#museum' ? '#museum' : '#',
      )
    for (const child of node.childNodes) copy(child, safe)
    parent.appendChild(safe)
  }
  for (const node of content.childNodes) copy(node, target)
  // The sandbox denies scripts and same-origin access; CSP denies network and embedded content.
  const preview = `<!doctype html><html><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; form-action 'none'; base-uri 'none'"><style>body{font-family:'Times New Roman',serif;padding:18px;color:#111;background:#fffef7;overflow-wrap:anywhere;line-height:1.5}h1{font-size:30px;line-height:1.15}a{color:#0000a0}pre{white-space:pre-wrap}#museum{margin-top:70px;border-top:1px solid #aaa;padding-top:12px;font-size:13px}</style><title>Your HTML preview</title></head><body>${target.innerHTML}<div id="museum">You found the museum! This link lives inside your preview.</div></body></html>`
  return { preview, passed: [Boolean(heading), paragraph, link, htmlOnly] }
}

export default function ChallengeStudio() {
  const [code, setCode] = useState(htmlStarter)
  const [checked, setChecked] = useState(false)
  const result = useMemo(() => inspectPage(code), [code])
  const count = result.passed.filter(Boolean).length
  return (
    <section className="challenge-studio" aria-labelledby="challenge-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">
            CHALLENGE 01 / THE 1995 WEB DEVELOPER
          </span>
          <h2 id="challenge-heading">
            Your first corner of the web<span className="accent-text">.</span>
          </h2>
          <p>
            It’s 1995. All you need is a text editor, a few tags, and an idea.
            Make a tiny homepage and watch it come to life.
          </p>
        </div>
        <Code2 size={32} aria-hidden="true" />
      </div>
      <div className="challenge-layout">
        <aside className="challenge-brief">
          <span className="feature-label">YOUR MISSION</span>
          <h3>Three tags. A whole new world.</h3>
          <ol>
            {htmlTasks.map((task, index) => (
              <li
                key={task.id}
                className={
                  checked && result.passed[index] ? 'challenge-task-done' : ''
                }
              >
                <span className="challenge-task-number">
                  {checked && result.passed[index] ? (
                    <Check size={15} />
                  ) : (
                    String(index + 1).padStart(2, '0')
                  )}
                </span>
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="challenge-note">
            This is an HTML-only exercise, not a claim that scripting never
            existed in 1995. The preview is an original, restricted educational
            recreation.
          </p>
          <a
            className="feature-source"
            href={htmlWorkshopSource.url}
            target="_blank"
            rel="noreferrer"
          >
            {htmlWorkshopSource.label}
            <ArrowUpRight size={13} />
          </a>
        </aside>
        <div className="challenge-workbench">
          <div className="challenge-editor-bar">
            <span>
              <Code2 size={14} />
              index.html
            </span>
            <span>LOCAL WORKSHOP / 1995</span>
          </div>
          <label className="sr-only" htmlFor="challenge-code">
            Your 1995 HTML code
          </label>
          <textarea
            id="challenge-code"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            value={code}
            maxLength={8000}
            onChange={(event) => {
              setCode(event.target.value)
              setChecked(false)
            }}
          />
          <div className="challenge-actions">
            <button className="feature-button" onClick={() => setChecked(true)}>
              <Check size={15} />
              Check your page
            </button>
            <button
              className="feature-button secondary"
              onClick={() => {
                setCode(htmlExample)
                setChecked(false)
              }}
            >
              Load example
            </button>
            <button
              className="challenge-reset"
              onClick={() => {
                setCode(htmlStarter)
                setChecked(false)
              }}
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
          <div className="challenge-preview-bar">
            <span aria-hidden="true">▣</span>My first homepage — Archive
            Navigator<span>LIVE PREVIEW</span>
          </div>
          <iframe
            title="Your 1995 webpage preview"
            className="challenge-preview"
            sandbox=""
            referrerPolicy="no-referrer"
            srcDoc={result.preview}
          />
        </div>
      </div>
      <div
        className={`challenge-feedback ${checked && count === 4 ? 'challenge-complete' : ''}`}
        role="status"
        aria-live="polite"
      >
        {checked ? (
          count === 4 ? (
            <>
              <Sparkles size={22} />
              <div>
                <strong>Welcome to the World Wide Web.</strong>
                <p>All four checks passed. You built a little piece of 1995.</p>
              </div>
            </>
          ) : (
            <>
              <Code2 size={22} />
              <div>
                <strong>{count} of 4 checks passed.</strong>
                <p>
                  Use the mission checklist to finish your page, then check it
                  again.
                </p>
              </div>
            </>
          )
        ) : (
          <>
            <Code2 size={22} />
            <p>
              Your preview updates as you type. Select “Check your page” when
              you’re ready.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
