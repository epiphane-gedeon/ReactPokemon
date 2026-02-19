import { useState, useMemo } from 'react';
import SearchBar from '@/components/SearchBar';
import PokemonList from '@/components/PokemonList';
import Loading from '@/components/common/Loading';
import ErrorFallback from '@/components/common/ErrorFallback';
import { useFetchPokemons } from '@/hooks/useFetchPokemons';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchPokemons, fetchPokemonByName, fetchAllPokemonNames } from '@/features/pokemon/pokemon.service';
import { useQuery } from '@tanstack/react-query';

/**
 * Home — Main page displaying the Pokémon list with search.
 *
 * Features:
 * - Search bar with debounce
 * - Infinite scrolling Pokémon grid
 * - Search mode: fetches single Pokémon by name
 * - Graceful loading and error states
 */
export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearch = useDebounce(searchTerm, 300);

    // Infinite query for paginated list (Home view)
    const {
        data: infiniteData,
        isLoading: isListLoading,
        isError: isListError,
        error: listError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch: refetchList,
    } = useFetchPokemons(24);

    // Global list for search — enables partial matching across all 1300+ Pokémon
    const {
        data: allPokemonMasterList,
        isLoading: isMasterLoading,
    } = useQuery({
        queryKey: ['pokemon-master-list'],
        queryFn: fetchAllPokemonNames,
        staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    });

    // Flatten infinite query pages
    const currentLoadedPokemons = useMemo(() => {
        if (!infiniteData?.pages) return [];
        return infiniteData.pages.flatMap((page) => page.results);
    }, [infiniteData]);

    // Search logic: Combine master list filtering
    const { filteredPokemons, isSearchMode } = useMemo(() => {
        const term = debouncedSearch.toLowerCase().trim();
        const active = term.length >= 2;

        if (!active) {
            return { filteredPokemons: currentLoadedPokemons, isSearchMode: false };
        }

        if (!allPokemonMasterList) {
            // Fallback while master list is loading, filter what we have
            return {
                filteredPokemons: currentLoadedPokemons.filter(p => p.name.includes(term)),
                isSearchMode: true
            };
        }

        // Search across the entire Pokédex!
        const results = allPokemonMasterList.filter(p => p.name.includes(term));
        return { filteredPokemons: results, isSearchMode: true };
    }, [debouncedSearch, currentLoadedPokemons, allPokemonMasterList]);

    const showLoading = isSearchMode ? isMasterLoading : isListLoading;
    const showError = isListError && !isSearchMode;

    return (
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '0 1rem' }}>
            {/* Hero Section */}
            <div
                className="animate-fade-in"
                style={{
                    textAlign: 'center',
                    padding: '2.5rem 1rem 2rem',
                }}
            >
                <h1
                    style={{
                        fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, var(--color-accent), #ec4899)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        marginBottom: '0.5rem',
                    }}
                >
                    Pokémon Explorer
                </h1>
                <p
                    style={{
                        fontSize: '1.0625rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '36rem',
                        margin: '0 auto 1.75rem',
                    }}
                >
                    Discover and explore your favorite Pokémon
                </p>

                <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search Pokémon by name…"
                />

                {/* Result count */}
                {!showLoading && (
                    <p
                        style={{
                            fontSize: '0.8125rem',
                            color: 'var(--color-text-muted)',
                            marginTop: '1rem',
                        }}
                    >
                        {isSearchMode
                            ? `${filteredPokemons.length} Pokémon found for "${debouncedSearch}"`
                            : `${currentLoadedPokemons.length} Pokémon loaded`}
                    </p>
                )}
            </div>

            {/* Content Area */}
            {showLoading && filteredPokemons.length === 0 ? (
                <Loading size="lg" message={isSearchMode ? 'Searching Pokédex…' : 'Loading Pokémon…'} />
            ) : showError ? (
                <ErrorFallback
                    error={listError}
                    onRetry={() => {
                        setSearchTerm('');
                        refetchList();
                    }}
                />
            ) : (
                <PokemonList
                    pokemons={filteredPokemons}
                    // Disable infinite scroll in search mode
                    hasNextPage={isSearchMode ? false : hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    fetchNextPage={fetchNextPage}
                    isError={isListError}
                />
            )}
        </div>
    );
}
