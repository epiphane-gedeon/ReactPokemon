import { Link } from 'react-router-dom';
import { capitalize, getTypeColor, getContrastColor } from '@/utils/helpers';

/**
 * PokemonItem — Compact inline display for search results / alternate views.
 *
 * Shows Pokémon image, name, ID and type badges in a horizontal row.
 */
export default function PokemonItem({ pokemon }) {
    const { id, name, image, types } = pokemon;

    return (
        <Link
            to={`/pokemon/${name}`}
            aria-label={`View ${capitalize(name)}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = '';
            }}
        >
            {/* Sprite */}
            <img
                src={image}
                alt={capitalize(name)}
                width="48"
                height="48"
                loading="lazy"
                style={{ objectFit: 'contain' }}
            />

            {/* Info */}
            <div style={{ flex: 1 }}>
                <span
                    style={{
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {capitalize(name)}
                </span>
                <span
                    style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        marginLeft: '0.5rem',
                        fontFamily: 'monospace',
                    }}
                >
                    #{String(id).padStart(3, '0')}
                </span>
            </div>

            {/* Types */}
            {types && (
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {types.map((type) => {
                        const bg = getTypeColor(type);
                        return (
                            <span
                                key={type}
                                style={{
                                    padding: '0.125rem 0.5rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.625rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    background: bg,
                                    color: getContrastColor(bg),
                                }}
                            >
                                {type}
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Arrow */}
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </Link>
    );
}
