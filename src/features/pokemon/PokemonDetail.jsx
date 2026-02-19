import {
    capitalize,
    getTypeColor,
    getContrastColor,
    formatStatName,
    formatHeight,
    formatWeight,
    getStatPercentage,
    getStatColor,
} from '@/utils/helpers';

/**
 * PokemonDetail — Rich detail view for a single Pokémon.
 *
 * Displays:
 * - Multiple images (front, back, shiny, official artwork)
 * - Type badges with matching colors
 * - Base stats as animated bar charts
 * - Abilities list
 * - Top 10 moves
 * - Base experience, height, weight
 * - Responsive two-column layout
 */
export default function PokemonDetail({ pokemon }) {
    if (!pokemon) return null;

    const {
        id,
        name,
        types,
        stats,
        abilities,
        moves,
        sprites,
        height,
        weight,
        baseExperience,
    } = pokemon;

    const primaryColor = getTypeColor(types[0]);

    // Collect all available sprite images
    const images = [
        { label: 'Official Artwork', src: sprites.official_artwork },
        { label: 'Front', src: sprites.front_default },
        { label: 'Back', src: sprites.back_default },
        { label: 'Shiny Front', src: sprites.front_shiny },
        { label: 'Shiny Back', src: sprites.back_shiny },
    ].filter((img) => img.src);

    return (
        <div className="animate-fade-in-up" style={{ maxWidth: '64rem', margin: '0 auto' }}>
            {/* Header Section */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}08)`,
                    borderRadius: 'var(--radius-xl)',
                    border: `1px solid ${primaryColor}33`,
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                }}
            >
                <span
                    style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--color-text-muted)',
                        fontFamily: 'monospace',
                    }}
                >
                    #{String(id).padStart(3, '0')}
                </span>
                <h1
                    style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                        fontWeight: 800,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.75rem',
                    }}
                >
                    {capitalize(name)}
                </h1>

                {/* Type Badges */}
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {types.map((type) => {
                        const bg = getTypeColor(type);
                        return (
                            <span
                                key={type}
                                style={{
                                    padding: '0.375rem 1rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.8125rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.075em',
                                    background: bg,
                                    color: getContrastColor(bg),
                                    boxShadow: `0 2px 8px ${bg}44`,
                                }}
                            >
                                {type}
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* Main Content — Two Columns on Desktop */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                }}
            >
                {/* Left Column — Images */}
                <div>
                    {/* Main Image */}
                    <div
                        style={{
                            background: 'var(--color-bg-card)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Background pattern */}
                        <div
                            style={{
                                position: 'absolute',
                                width: '200px',
                                height: '200px',
                                borderRadius: '50%',
                                background: `radial-gradient(circle, ${primaryColor}15 0%, transparent 70%)`,
                            }}
                        />
                        <img
                            src={sprites.official_artwork || sprites.front_default}
                            alt={capitalize(name)}
                            width="280"
                            height="280"
                            className="animate-float"
                            style={{
                                objectFit: 'contain',
                                position: 'relative',
                                zIndex: 1,
                                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
                            }}
                        />
                    </div>

                    {/* Sprite Gallery */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                            gap: '0.75rem',
                        }}
                    >
                        {images.slice(1).map((img) => (
                            <div
                                key={img.label}
                                style={{
                                    background: 'var(--color-bg-card)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    padding: '0.75rem',
                                    textAlign: 'center',
                                    transition: 'all var(--transition-fast)',
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={`${capitalize(name)} — ${img.label}`}
                                    width="80"
                                    height="80"
                                    loading="lazy"
                                    style={{
                                        objectFit: 'contain',
                                        margin: '0 auto',
                                        imageRendering: 'pixelated',
                                    }}
                                />
                                <p
                                    style={{
                                        fontSize: '0.6875rem',
                                        color: 'var(--color-text-muted)',
                                        marginTop: '0.375rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    {img.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column — Stats & Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Info Cards */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '0.75rem',
                        }}
                    >
                        <InfoCard label="Height" value={formatHeight(height)} icon="📏" />
                        <InfoCard label="Weight" value={formatWeight(weight)} icon="⚖️" />
                        <InfoCard label="Base XP" value={baseExperience || '—'} icon="✨" />
                    </div>

                    {/* Base Stats */}
                    <div
                        style={{
                            background: 'var(--color-bg-card)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            padding: '1.5rem',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                marginBottom: '1rem',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            📊 Base Stats
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {stats.map((stat) => (
                                <StatBar key={stat.name} stat={stat} />
                            ))}
                        </div>
                        {/* Total */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginTop: '1rem',
                                paddingTop: '0.75rem',
                                borderTop: '1px solid var(--color-border)',
                                fontWeight: 700,
                                fontSize: '0.9375rem',
                            }}
                        >
                            <span style={{ color: 'var(--color-text-secondary)' }}>Total</span>
                            <span style={{ color: 'var(--color-text-primary)' }}>
                                {stats.reduce((sum, s) => sum + s.value, 0)}
                            </span>
                        </div>
                    </div>

                    {/* Abilities */}
                    <div
                        style={{
                            background: 'var(--color-bg-card)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            padding: '1.5rem',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                marginBottom: '0.75rem',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            🎯 Abilities
                        </h2>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {abilities.map((ability) => (
                                <span
                                    key={ability.name}
                                    style={{
                                        padding: '0.375rem 0.875rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.8125rem',
                                        fontWeight: 500,
                                        background: ability.isHidden
                                            ? 'var(--color-bg-primary)'
                                            : `${primaryColor}15`,
                                        color: ability.isHidden
                                            ? 'var(--color-text-muted)'
                                            : 'var(--color-text-primary)',
                                        border: `1px solid ${ability.isHidden ? 'var(--color-border)' : primaryColor + '33'}`,
                                    }}
                                >
                                    {capitalize(ability.name.replace('-', ' '))}
                                    {ability.isHidden && (
                                        <span style={{ fontSize: '0.6875rem', marginLeft: '0.25rem' }}>
                                            (Hidden)
                                        </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Moves */}
                    <div
                        style={{
                            background: 'var(--color-bg-card)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            padding: '1.5rem',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                marginBottom: '0.75rem',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            ⚔️ Moves <span style={{ fontSize: '0.8125rem', fontWeight: 400, color: 'var(--color-text-muted)' }}>(Top {moves.length})</span>
                        </h2>
                        <div
                            style={{
                                display: 'flex',
                                gap: '0.375rem',
                                flexWrap: 'wrap',
                            }}
                        >
                            {moves.map((move) => (
                                <span
                                    key={move}
                                    style={{
                                        padding: '0.25rem 0.625rem',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        background: 'var(--color-bg-primary)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid var(--color-border)',
                                    }}
                                >
                                    {capitalize(move.replace(/-/g, ' '))}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---- Sub-components ---- */

function InfoCard({ label, value, icon }) {
    return (
        <div
            style={{
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                padding: '1rem',
                textAlign: 'center',
            }}
        >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
            <div
                style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                }}
            >
                {value}
            </div>
            <div
                style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                }}
            >
                {label}
            </div>
        </div>
    );
}

function StatBar({ stat }) {
    const pct = getStatPercentage(stat.value);
    const color = getStatColor(stat.value);

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
                style={{
                    width: '4.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-text-secondary)',
                    textAlign: 'right',
                    flexShrink: 0,
                }}
            >
                {formatStatName(stat.name)}
            </span>
            <span
                style={{
                    width: '2.25rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    textAlign: 'right',
                    flexShrink: 0,
                    fontFamily: 'monospace',
                }}
            >
                {stat.value}
            </span>
            <div
                style={{
                    flex: 1,
                    height: '8px',
                    borderRadius: '4px',
                    background: 'var(--color-border)',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${pct}%`,
                        height: '100%',
                        borderRadius: '4px',
                        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                        transition: 'width 0.8s ease-out',
                    }}
                />
            </div>
        </div>
    );
}
