import { Suspense, useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { routes } from '@/routes';
import Loading from '@/components/common/Loading';
import { ErrorBoundary } from '@/components/common/ErrorFallback';

/**
 * App — Root application shell.
 *
 * Provides:
 * - Header with logo and dark mode toggle
 * - Suspense boundary for lazy routes
 * - Global error boundary
 * - Smooth dark/light mode switching
 */
export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        // Persist dark mode preference in localStorage
        const stored = localStorage.getItem('pokemon-explorer-darkmode');
        if (stored !== null) return stored === 'true';
        // Default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('pokemon-explorer-darkmode', darkMode);
    }, [darkMode]);

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--color-bg-primary)',
                transition: 'background-color var(--transition-base)',
            }}
        >
            {/* ---- Header ---- */}
            <header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 50,
                    background: 'var(--color-bg-secondary)',
                    borderBottom: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all var(--transition-base)',
                }}
            >
                <div
                    style={{
                        maxWidth: '76rem',
                        margin: '0 auto',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.625rem',
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                        aria-label="Pokémon Explorer Home"
                    >
                        {/* Pokéball icon */}
                        <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M 5 50 A 45 45 0 0 1 95 50" fill="#EF4444" stroke="#1e293b" strokeWidth="3" />
                            <path d="M 5 50 A 45 45 0 0 0 95 50" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="#1e293b" strokeWidth="3" />
                            <circle cx="50" cy="50" r="10" fill="#ffffff" stroke="#1e293b" strokeWidth="3" />
                            <circle cx="50" cy="50" r="5" fill="#1e293b" />
                        </svg>

                        <span
                            style={{
                                fontSize: '1.25rem',
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, var(--color-accent), #ec4899)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Pokémon Explorer
                        </span>
                    </Link>

                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                        style={{
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--color-bg-primary)',
                            color: 'var(--color-text-secondary)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all var(--transition-fast)',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-accent)';
                            e.currentTarget.style.color = 'var(--color-accent)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                            e.currentTarget.style.color = 'var(--color-text-secondary)';
                        }}
                    >
                        {darkMode ? (
                            // Sun icon
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            // Moon icon
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* ---- Main Content ---- */}
            <main style={{ flex: 1, paddingTop: '1rem', paddingBottom: '3rem' }}>
                <ErrorBoundary>
                    <Suspense fallback={<Loading size="lg" message="Loading page…" />}>
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.path} path={route.path} element={route.element} />
                            ))}
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>

            {/* ---- Footer ---- */}
            <footer
                style={{
                    textAlign: 'center',
                    padding: '1.5rem 1rem',
                    borderTop: '1px solid var(--color-border)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-muted)',
                }}
            >
                <p>
                    Built with ❤️ using React 19, Vite 6 & PokéAPI •{' '}
                    <a
                        href="https://pokeapi.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--color-accent)',
                            textDecoration: 'underline',
                            textUnderlineOffset: '2px',
                        }}
                    >
                        PokéAPI
                    </a>
                </p>
            </footer>
        </div>
    );
}
