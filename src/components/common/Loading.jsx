/**
 * Loading — Pokéball-themed loading spinner.
 *
 * Displayed during Suspense fallback and data fetching.
 * Can show an optional message below the spinner.
 */

export default function Loading({ message = 'Loading Pokémon…', size = 'md' }) {
    const sizes = {
        sm: { ball: 32, fontSize: '0.8125rem' },
        md: { ball: 56, fontSize: '0.9375rem' },
        lg: { ball: 80, fontSize: '1.125rem' },
    };

    const s = sizes[size];

    return (
        <div
            role="status"
            aria-label={message}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '3rem 1rem',
                minHeight: size === 'lg' ? '50vh' : 'auto',
            }}
        >
            {/* Pokéball SVG Spinner */}
            <div className="animate-spin" style={{ width: s.ball, height: s.ball }}>
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    {/* Top half — red */}
                    <path
                        d="M 5 50 A 45 45 0 0 1 95 50"
                        fill="#EF4444"
                        stroke="#1a1a2e"
                        strokeWidth="4"
                    />
                    {/* Bottom half — white */}
                    <path
                        d="M 5 50 A 45 45 0 0 0 95 50"
                        fill="#ffffff"
                        stroke="#1a1a2e"
                        strokeWidth="4"
                    />
                    {/* Center divider line */}
                    <line x1="5" y1="50" x2="95" y2="50" stroke="#1a1a2e" strokeWidth="4" />
                    {/* Center button */}
                    <circle cx="50" cy="50" r="12" fill="#ffffff" stroke="#1a1a2e" strokeWidth="4" />
                    <circle cx="50" cy="50" r="6" fill="#1a1a2e" />
                </svg>
            </div>

            {message && (
                <p
                    style={{
                        fontSize: s.fontSize,
                        color: 'var(--color-text-secondary)',
                        fontWeight: 500,
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
