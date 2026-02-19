/**
 * Pokémon Service — API layer for PokéAPI interactions
 *
 * Handles all data fetching with proper error handling,
 * timeout management, and response transformation.
 */

const BASE_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_LIMIT = 24;
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Custom error class for API-related errors.
 */
class PokemonApiError extends Error {
    constructor(message, status, type = 'API_ERROR') {
        super(message);
        this.name = 'PokemonApiError';
        this.status = status;
        this.type = type;
    }
}

/**
 * Fetch wrapper with timeout and error handling.
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>}
 */
async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new PokemonApiError(
                    'Pokémon not found. Please check the name and try again.',
                    404,
                    'NOT_FOUND'
                );
            }
            throw new PokemonApiError(
                `API request failed with status ${response.status}`,
                response.status
            );
        }

        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new PokemonApiError(
                'Request timed out. The server might be slow, please try again.',
                408,
                'TIMEOUT'
            );
        }
        if (error instanceof PokemonApiError) {
            throw error;
        }
        throw new PokemonApiError(
            'Network error. Please check your internet connection.',
            0,
            'NETWORK_ERROR'
        );
    } finally {
        clearTimeout(timeoutId);
    }
}

/**
 * Fetch a paginated list of Pokémon.
 * Returns the list with basic data + extracted IDs.
 *
 * @param {object} params
 * @param {number} params.limit — Number of Pokémon per page (default: 24)
 * @param {number} params.offset — Offset for pagination (default: 0)
 * @returns {Promise<{ results: Array, nextOffset: number|null, count: number }>}
 */
export async function fetchPokemons({ limit = DEFAULT_LIMIT, offset = 0 } = {}) {
    const data = await fetchWithTimeout(
        `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );

    // Extract ID and build image URL
    // For the list, we use standard sprites for faster loading
    const results = data.results.map((pokemon) => {
        const segments = pokemon.url.replace(/\/$/, '').split('/');
        const id = parseInt(segments[segments.length - 1], 10);
        return {
            ...pokemon,
            id,
            // Use standard sprite for the list as it's smaller and very reliable
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            // Provide official artwork as a fallback/alternative
            officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
    });

    const nextOffset = offset + limit < data.count ? offset + limit : null;

    return {
        results,
        nextOffset,
        count: data.count,
    };
}

/**
 * Fetch detailed data for a single Pokémon by name or ID.
 *
 * @param {string|number} nameOrId — Pokémon name or ID
 * @returns {Promise<object>} Pokémon detail object
 */
export async function fetchPokemonByName(nameOrId) {
    const data = await fetchWithTimeout(
        `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`
    );

    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        baseExperience: data.base_experience,
        types: data.types.map((t) => t.type.name),
        stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
        })),
        abilities: data.abilities.map((a) => ({
            name: a.ability.name,
            isHidden: a.is_hidden,
        })),
        moves: data.moves.slice(0, 10).map((m) => m.move.name),
        sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
            front_shiny: data.sprites.front_shiny,
            back_shiny: data.sprites.back_shiny,
            official_artwork:
                data.sprites.other?.['official-artwork']?.front_default || null,
            dream_world:
                data.sprites.other?.dream_world?.front_default || null,
        },
        cries: data.cries || null,
    };
}

/**
 * Search for a Pokémon by exact name.
 * Returns null if not found (instead of throwing).
 *
 * @param {string} name
 * @returns {Promise<object|null>}
 */
export async function searchPokemon(name) {
    try {
        return await fetchPokemonByName(name.trim().toLowerCase());
    } catch (error) {
        if (error.type === 'NOT_FOUND') {
            return null;
        }
        throw error;
    }
}

/**
 * Fetch a simple list of ALL Pokémon names and IDs.
 * Used for client-side partial searching across the entire Pokédex.
 *
 * @returns {Promise<Array<{name: string, id: number, image: string}>>}
 */
export async function fetchAllPokemonNames() {
    const data = await fetchWithTimeout(`${BASE_URL}/pokemon?limit=2000`);

    return data.results.map((pokemon) => {
        const segments = pokemon.url.replace(/\/$/, '').split('/');
        const id = parseInt(segments[segments.length - 1], 10);
        return {
            name: pokemon.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            officialArtwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        };
    });
}
