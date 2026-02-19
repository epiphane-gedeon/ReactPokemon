import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { capitalize, getTypeColor, getContrastColor } from '@/utils/helpers';
import { usePrefetchPokemon } from '@/hooks/useFetchPokemons';

/**
 * PokemonCard — Display card for a single Pokémon in the grid.
 *
 * Features:
 * - Official artwork image with lazy loading
 * - Capitalized name
 * - Type badges with matching colors
 * - Hover animation + prefetch detail on hover
 * - Links to detail page
 */
export default function PokemonCard({ pokemon }) {
    const { id, name, image, officialArtwork, types } = pokemon;

    // Use official artwork as primary, falling back to standard sprite
    const [imgSrc, setImgSrc] = useState(officialArtwork || image);
    const [hasError, setHasError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);
    const imgRef = useRef(null);
    const prefetch = usePrefetchPokemon();
    const displayName = capitalize(name);

    // Sync state if props change (infinite scroll or search clear)
    useEffect(() => {
        const newSrc = officialArtwork || image;
        setImgSrc(newSrc);
        setHasError(false);

        // If image is already in cache, it might be complete
        if (imgRef.current && imgRef.current.complete) {
            setImageLoaded(true);
        } else {
            setImageLoaded(false);
        }
    }, [id, officialArtwork, image]);

    /**
     * Handle image loading error by falling back to standard sprite,
     * then finally to a placeholder if everything fails.
     */
    const handleError = () => {
        if (!hasError) {
            if (imgSrc === officialArtwork && image) {
                setImgSrc(image);
            } else {
                setHasError(true);
                // Last ditch effort: ensure we use the standard sprite by ID
                setImgSrc(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`);
            }
        }
    };

    // Get the primary type color for card accent
    const primaryType = types?.[0];
    const accentColor = primaryType ? getTypeColor(primaryType) : 'var(--color-accent)';

    return (
        <Link
            to={`/pokemon/${name}`}
            onMouseEnter={() => {
                setHovered(true);
                prefetch(name);
            }}
            onMouseLeave={() => setHovered(false)}
            className="animate-fade-in"
            aria-label={`View details for ${displayName}`}
            style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                background: 'var(--color-bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                transition: 'all var(--transition-base)',
                transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hovered ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                position: 'relative',
            }}
        >
            {/* Top accent bar */}
            <div
                style={{
                    height: '4px',
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
                    transition: 'all var(--transition-base)',
                }}
            />

            {/* Pokémon ID badge */}
            <span
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--color-text-muted)',
                    fontFamily: 'monospace',
                }}
            >
                #{String(id).padStart(3, '0')}
            </span>

            {/* Image container */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.5rem 1rem 0.5rem',
                    position: 'relative',
                    minHeight: '140px',
                }}
            >
                {/* Background circle */}
                <div
                    style={{
                        position: 'absolute',
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: `${accentColor}15`,
                        transition: 'all var(--transition-base)',
                        transform: hovered ? 'scale(1.2)' : 'scale(1)',
                    }}
                />

                {/* Skeleton placeholder — always visible until image is fully loaded */}
                {!imageLoaded && (
                    <div
                        className="skeleton"
                        style={{
                            position: 'absolute',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 0
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 100 100" opacity="0.1">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="5" />
                            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="5" />
                        </svg>
                    </div>
                )}

                <img
                    ref={imgRef}
                    key={`${id}-${imgSrc}`}
                    src={imgSrc}
                    alt={displayName}
                    loading="lazy"
                    width="120"
                    height="120"
                    onLoad={() => setImageLoaded(true)}
                    onError={handleError}
                    style={{
                        display: 'block',
                        opacity: imageLoaded ? 1 : 0,
                        // NEVER use visibility: hidden or display: none with loading="lazy"
                        // as it may prevent the browser from starting the download
                        objectFit: 'contain',
                        transition: 'opacity 0.3s ease-out, transform var(--transition-base)',
                        transform: hovered ? 'scale(1.1)' : 'scale(1)',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
                        position: 'relative',
                        zIndex: 1,
                    }}
                />
            </div>

            {/* Card content */}
            <div style={{ padding: '0.75rem 1rem 1.25rem', textAlign: 'center' }}>
                <h3
                    style={{
                        fontSize: '1.0625rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {displayName}
                </h3>

                {/* Type badges */}
                {types && types.length > 0 && (
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.375rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {types.map((type) => {
                            const bgColor = getTypeColor(type);
                            const textColor = getContrastColor(bgColor);
                            return (
                                <span
                                    key={type}
                                    style={{
                                        padding: '0.1875rem 0.625rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.6875rem',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        background: bgColor,
                                        color: textColor,
                                    }}
                                >
                                    {type}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
        </Link>
    );
}
