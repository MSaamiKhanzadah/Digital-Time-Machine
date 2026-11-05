import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Bot, ChevronRight, RotateCcw, Send } from 'lucide-react'
import { aiMilestones, replyToPattern, type RuleReply } from '../data/ai'
import '../styles/ai.css'

interface Exchange {
  id: number
  input: string
  reply: RuleReply
}

export default function AIExplorer() {
  const [selectedId, setSelectedId] = useState('eliza')
  const [message, setMessage] = useState('')
  const [exchanges, setExchanges] = useState<Exchange[]>([])
  const [resetNotice, setResetNotice] = useState('')
  const nextId = useRef(1)
  const conversation = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const milestone =
    aiMilestones.find((item) => item.id === selectedId) ?? aiMilestones[0]
  useEffect(() => {
    if (conversation.current)
      conversation.current.scrollTop = conversation.current.scrollHeight
  }, [exchanges])

  function submit(event: FormEvent) {
    event.preventDefault()
    const value = message.trim()
    if (!value) return
    setExchanges((history) => [
      ...history,
      { id: nextId.current++, input: value, reply: replyToPattern(value) },
    ])
    setMessage('')
    setResetNotice('')
    input.current?.focus()
  }

  return (
    <section className="ai-explorer" aria-labelledby="ai-heading">
      <div className="feature-heading">
        <div>
          <span className="feature-label">FROM RULES TO LEARNED PATTERNS</span>
          <h2 id="ai-heading">
            The long road to artificial intelligence
            <span className="accent-text">.</span>
          </h2>
          <p>
            Explore the breakthroughs, pauses, and changing ideas behind AI.
            Select a moment, then look inside a simple conversation machine.
          </p>
        </div>
        <Bot className="ai-heading-icon" size={34} aria-hidden="true" />
      </div>
      <div
        className="ai-timeline"
        aria-label="Artificial intelligence milestones"
      >
        {aiMilestones.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ai-moment ${item.id === selectedId ? 'ai-moment-selected' : ''}`}
            aria-pressed={item.id === selectedId}
            onClick={() => setSelectedId(item.id)}
          >
            <span className="ai-moment-period">{item.period}</span>
            <span className="ai-moment-dot" aria-hidden="true" />
            <span className="ai-moment-title">{item.title}</span>
          </button>
        ))}
      </div>
      <article
        className="ai-milestone"
        aria-labelledby="ai-milestone-title"
        aria-live="polite"
      >
        <div className="ai-milestone-year">{milestone.period}</div>
        <div>
          <span className="feature-label">{milestone.category}</span>
          <h3 id="ai-milestone-title">{milestone.title}</h3>
          <p>{milestone.description}</p>
          <p className="ai-significance">{milestone.significance}</p>
          <a
            className="feature-source"
            href={milestone.source.url}
            target="_blank"
            rel="noreferrer"
          >
            {milestone.source.label}
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </article>
      <div className="ai-lab">
        <div className="ai-lab-copy">
          <span className="feature-label">
            INTERACTIVE EXHIBIT / FIXED RULES
          </span>
          <h3>
            A conversation.
            <br />
            <em>A handful of patterns.</em>
          </h3>
          <p>
            This original educational simulation is inspired by ELIZA. It is not
            Weizenbaum’s actual ELIZA, an LLM, or a source of personal advice.
          </p>
          <p>
            Every reply comes from a fixed pattern and a sentence template. No
            AI service is called. Messages stay in this page’s temporary memory.
            Reloading the page clears them.
          </p>
          <div className="ai-rule-key">
            <span>
              01 <b>Match a pattern</b>
            </span>
            <ChevronRight size={13} aria-hidden="true" />
            <span>
              02 <b>Fill a template</b>
            </span>
          </div>
          <div className="ai-model-note">
            <strong>How is a language model different?</strong>
            <p>
              Modern language models use weights learned from training data to
              generate text from context. This toy checks a short, ordered list
              of regular expressions. Neither fluent output nor a matched
              keyword establishes understanding.
            </p>
          </div>
        </div>
        <div className="ai-chat">
          <div className="ai-chat-bar">
            <span>
              <i aria-hidden="true" />
              PATTERN CONVERSATION
            </span>
            <button
              type="button"
              onClick={() => {
                setExchanges([])
                setMessage('')
                setResetNotice('Conversation cleared.')
                input.current?.focus()
              }}
              className="ai-clear"
            >
              <RotateCcw size={13} aria-hidden="true" />
              Clear / reset
            </button>
          </div>
          <div
            className="ai-chat-history"
            ref={conversation}
            role="log"
            aria-label="Pattern conversation history"
            aria-live="polite"
            aria-relevant="additions"
          >
            <div className="ai-bot-intro">
              <span className="ai-speaker">SIMULATION</span>
              <p>Hello. Type a message and see the rule that responds.</p>
            </div>
            {exchanges.map((exchange) => (
              <div key={exchange.id} className="ai-exchange">
                <div className="ai-user-message">
                  <span className="ai-speaker">YOU</span>
                  <p>{exchange.input}</p>
                </div>
                <div className="ai-bot-message">
                  <span className="ai-speaker">SIMULATION</span>
                  <p>{exchange.reply.text}</p>
                  <details className="ai-trace" open>
                    <summary>Matched rule: {exchange.reply.rule}</summary>
                    <code>{exchange.reply.pattern}</code>
                    <p>{exchange.reply.explanation}</p>
                  </details>
                </div>
              </div>
            ))}
          </div>
          <div className="ai-chat-controls">
            <span className="ai-examples-label">TRY A PATTERN</span>
            <div className="ai-examples">
              {[
                'I feel curious',
                'Because I like history',
                'Can a computer think?',
              ].map((example) => (
                <button
                  type="button"
                  key={example}
                  onClick={() => {
                    setMessage(example)
                    input.current?.focus()
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
            <form onSubmit={submit}>
              <label className="sr-only" htmlFor="ai-message">
                Your message to the rule-based simulation
              </label>
              <input
                id="ai-message"
                ref={input}
                value={message}
                maxLength={400}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message…"
                autoComplete="off"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!message.trim()}
              >
                <Send size={17} aria-hidden="true" />
              </button>
            </form>
            <span className="ai-reset-status" role="status">
              {resetNotice ||
                'Original rule-based simulation · no learned model'}
            </span>
          </div>
        </div>
      </div>
      <p className="feature-notice">
        A pattern match can feel personal while missing the meaning entirely.
        Try changing “I feel curious” to “I felt curious”: a small wording
        change selects a different rule. Rules run in order; the first match
        wins.
      </p>
    </section>
  )
}
