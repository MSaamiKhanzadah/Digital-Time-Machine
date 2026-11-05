import { Component, type ReactNode } from 'react'
import { RotateCcw } from 'lucide-react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-screen">
          <span className="micro-label accent-text">TEMPORAL INTERRUPTION</span>
          <h1>Let’s try that journey again.</h1>
          <p>
            The time machine hit an unexpected error. Reload to return to the
            present.
          </p>
          <button
            className="travel-button"
            onClick={() => window.location.reload()}
          >
            Reset the time machine <RotateCcw size={18} />
          </button>
        </main>
      )
    }
    return this.props.children
  }
}
