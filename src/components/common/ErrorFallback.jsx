import { Component } from 'react';
import Button from './Button';

/**
 * ErrorBoundary — Class component that catches rendering errors.
 *
 * Wraps children and displays the ErrorFallback UI when an error occurs.
 * Supports both global (app-wide) and local (per-section) usage.
 */
export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        this.props.onReset?.();
    };

    render() {
        if (this.state.hasError) {
            return (
                <ErrorFallback
                    error={this.state.error}
                    onRetry={this.handleReset}
                />
            );
        }
        return this.props.children;
    }
}

/**
 * ErrorFallback — Visual fallback UI shown when an error occurs.
 *
 * Displays error message and a retry button.
 * Can be used standalone (for query errors) or with ErrorBoundary.
 */
export default function ErrorFallback({ error, onRetry }) {
    const message =
        error?.message || 'Something went wrong. Please try again.';

    return (
        <div
            role="alert"
            className="animate-fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                padding: '3rem 1.5rem',
                textAlign: 'center',
                minHeight: '30vh',
            }}
        >
            {/* Error icon */}
            <div
                style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>

            <div>
                <h2
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.5rem',
                    }}
                >
                    Oops! Something went wrong
                </h2>
                <p
                    style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '28rem',
                        lineHeight: 1.6,
                    }}
                >
                    {message}
                </p>
            </div>

            {onRetry && (
                <Button variant="primary" size="md" onClick={onRetry}>
                    🔄 Try Again
                </Button>
            )}
        </div>
    );
}
