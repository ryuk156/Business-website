import { Component, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

interface ErrorBoundaryState {
  error: Error | null;
}

class AppErrorBoundary extends Component<Record<string, unknown>, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): React.ReactNode {
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
      );
    }

    return this.props.children as React.ReactNode;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>,
);
