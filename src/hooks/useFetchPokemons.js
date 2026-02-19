import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemons, fetchPokemonByName } from '@/features/pokemon/pokemon.service';

const POKEMON_LIST_KEY = 'pokemons';
const POKEMON_DETAIL_KEY = 'pokemon';
const STALE_TIME = 5 * 60 * 1000; // 5 minutes

/**
 * useFetchPokemons — Infinite query hook for paginated Pokémon list.
 *
 * Uses TanStack Query's useInfiniteQuery for automatic pagination,
 * caching, background refetch, and deduplication.
 *
 * @param {number} limit — Pokémon per page (default: 24)
 * @returns {object} — TanStack Query infinite query result
 */
export function useFetchPokemons(limit = 24) {
    return useInfiniteQuery({
        queryKey: [POKEMON_LIST_KEY, limit],
        queryFn: ({ pageParam = 0 }) => fetchPokemons({ limit, offset: pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextOffset,
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
        initialPageParam: 0,
    });
}

/**
 * useFetchPokemonDetail — Query hook for a single Pokémon's detail.
 *
 * @param {string} name — Pokémon name
 * @returns {object} — TanStack Query result
 */
export function useFetchPokemonDetail(name) {
    return useQuery({
        queryKey: [POKEMON_DETAIL_KEY, name],
        queryFn: () => fetchPokemonByName(name),
        staleTime: STALE_TIME,
        refetchOnWindowFocus: false,
        enabled: !!name,
    });
}

/**
 * usePrefetchPokemon — Returns a prefetch function for Pokémon detail.
 *
 * Call the returned function on hover to preload data before navigation.
 *
 * @returns {(name: string) => void}
 */
export function usePrefetchPokemon() {
    const queryClient = useQueryClient();

    return (name) => {
        queryClient.prefetchQuery({
            queryKey: [POKEMON_DETAIL_KEY, name],
            queryFn: () => fetchPokemonByName(name),
            staleTime: STALE_TIME,
        });
    };
}
