import { useEffect, useRef, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import Loading from './common/Loading';
import Button from './common/Button';

/**
 * PokemonList — Responsive grid of PokemonCards with infinite scroll.
 *
 * Uses IntersectionObserver to detect when the user scrolls to the bottom
 * and triggers loading the next page of Pokémon.
 */
export default function PokemonList({
    pokemons,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
}) {
    const observerRef = useRef(null);
    const loadMoreRef = useRef(null);

    /**
     * Set up IntersectionObserver on the sentinel element.
     * When it enters the viewport, fetch the next page.
     */
    const handleObserver = useCallback(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [hasNextPage, isFetchingNextPage, fetchNextPage]
    );

    useEffect(() => {
        const element = loadMoreRef.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '200px', // Trigger 200px before reaching the bottom
            threshold: 0,
        });

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver]);

    if (!pokemons || pokemons.length === 0) {
        return (
            <div
                style={{
                    textAlign: 'center',
                    padding: '4rem 1rem',
                    color: 'var(--color-text-muted)',
                }}
            >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>
                    No Pokémon found
                </p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    Try a different search term
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Responsive Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1.25rem',
                    padding: '0 0 2rem',
                }}
            >
                {pokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id || pokemon.name} pokemon={pokemon} />
                ))}
            </div>

            {/* Load More / Infinite Scroll Sentinel */}
            <div
                ref={loadMoreRef}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '2rem 0',
                }}
            >
                {isFetchingNextPage && <Loading size="sm" message="Loading more…" />}
                {!isFetchingNextPage && hasNextPage && (
                    <Button
                        variant="secondary"
                        size="md"
                        onClick={() => fetchNextPage()}
                    >
                        Load More
                    </Button>
                )}
                {!hasNextPage && pokemons.length > 0 && (
                    <p
                        style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.875rem',
                            fontStyle: 'italic',
                        }}
                    >
                        All Pokémon loaded! 🎉
                    </p>
                )}
            </div>
        </div>
    );
}
