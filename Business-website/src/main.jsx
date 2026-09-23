import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class AppErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
          <div className="max-w-xl rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-neutral-900">The page could not load</h1>
            <p className="mt-3 text-neutral-600">Refresh the page or restart the development server.</p>
            <pre className="mt-6 overflow-auto rounded-lg bg-neutral-900 p-4 text-left text-sm text-red-200">
              {this.state.error.message}
            </pre>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
)
