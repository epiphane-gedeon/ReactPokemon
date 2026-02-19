import { useState } from 'react';

/**
 * SearchBar — Debounced search input for Pokémon filtering.
 *
 * Features:
 * - Search icon
 * - Clear button
 * - Accessible labels
 * - Controlled by parent via onChange
 */
export default function SearchBar({ value, onChange, placeholder = 'Search Pokémon…' }) {
    const [focused, setFocused] = useState(false);

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                maxWidth: '32rem',
                margin: '0 auto',
            }}
        >
            <label htmlFor="pokemon-search" className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                Search Pokémon
            </label>

            {/* Search icon */}
            <div
                style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focused ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    transition: 'color var(--transition-fast)',
                    pointerEvents: 'none',
                }}
                aria-hidden="true"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>

            {/* Input */}
            <input
                id="pokemon-search"
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                autoComplete="off"
                aria-label="Search Pokémon by name"
                style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 2.75rem',
                    fontSize: '1rem',
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'var(--color-text-primary)',
                    border: `2px solid ${focused ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-xl)',
                    outline: 'none',
                    transition: 'all var(--transition-fast)',
                    boxShadow: focused ? '0 0 0 4px rgba(99, 102, 241, 0.15)' : 'var(--shadow-sm)',
                }}
            />

            {/* Clear button */}
            {value && (
                <button
                    type="button"
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                    style={{
                        position: 'absolute',
                        right: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        padding: '0.25rem',
                        borderRadius: '50%',
                        background: 'var(--color-bg-primary)',
                        color: 'var(--color-text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all var(--transition-fast)',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-primary)';
                        e.currentTarget.style.background = 'var(--color-border)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--color-text-muted)';
                        e.currentTarget.style.background = 'var(--color-bg-primary)';
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </div>
    );
}
