/**
 * Pokémon Explorer — Utility Helpers
 *
 * Pure functions for data transformation and display formatting.
 */

/**
 * Capitalize the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Map Pokémon type to its corresponding CSS color.
 * @param {string} type — e.g. 'fire', 'water'
 * @returns {string} hex color
 */
export const getTypeColor = (type) => {
    const colors = {
        normal: '#a8a878',
        fire: '#f08030',
        water: '#6890f0',
        electric: '#f8d030',
        grass: '#78c850',
        ice: '#98d8d8',
        fighting: '#c03028',
        poison: '#a040a0',
        ground: '#e0c068',
        flying: '#a890f0',
        psychic: '#f85888',
        bug: '#a8b820',
        rock: '#b8a038',
        ghost: '#705898',
        dragon: '#7038f8',
        dark: '#705848',
        steel: '#b8b8d0',
        fairy: '#ee99ac',
    };
    return colors[type?.toLowerCase()] || '#a8a878';
};

/**
 * Get a contrasting text color (white or dark) for a given background hex.
 * @param {string} hexColor
 * @returns {string} '#ffffff' or '#1a1a2e'
 */
export const getContrastColor = (hexColor) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#1a1a2e' : '#ffffff';
};

/**
 * Format stat name from API format to human readable.
 * @param {string} stat — e.g. 'special-attack'
 * @returns {string} — e.g. 'Sp. Atk'
 */
export const formatStatName = (stat) => {
    const statMap = {
        hp: 'HP',
        attack: 'ATK',
        defense: 'DEF',
        'special-attack': 'Sp. ATK',
        'special-defense': 'Sp. DEF',
        speed: 'SPD',
    };
    return statMap[stat] || capitalize(stat);
};

/**
 * Get the best image URL for a Pokémon from its sprites object.
 * Prefers official artwork, falls back to default front sprite.
 * @param {object} sprites — Pokémon sprites object from PokéAPI
 * @returns {string} image URL
 */
export const getPokemonImage = (sprites) => {
    if (!sprites) return '';
    return (
        sprites.other?.['official-artwork']?.front_default ||
        sprites.other?.dream_world?.front_default ||
        sprites.front_default ||
        ''
    );
};

/**
 * Extract Pokémon ID from a PokéAPI URL.
 * @param {string} url — e.g. 'https://pokeapi.co/api/v2/pokemon/25/'
 * @returns {number}
 */
export const extractIdFromUrl = (url) => {
    const segments = url.replace(/\/$/, '').split('/');
    return parseInt(segments[segments.length - 1], 10);
};

/**
 * Format height from decimetres to metres.
 * @param {number} height — in decimetres
 * @returns {string}
 */
export const formatHeight = (height) => {
    return `${(height / 10).toFixed(1)} m`;
};

/**
 * Format weight from hectograms to kilograms.
 * @param {number} weight — in hectograms
 * @returns {string}
 */
export const formatWeight = (weight) => {
    return `${(weight / 10).toFixed(1)} kg`;
};

/**
 * Get the stat bar width as a percentage (max stat is 255).
 * @param {number} value — stat value
 * @returns {number} percentage value (0-100)
 */
export const getStatPercentage = (value) => {
    return Math.min((value / 255) * 100, 100);
};

/**
 * Get the color for a stat bar based on value.
 * @param {number} value — stat value
 * @returns {string} hex color
 */
export const getStatColor = (value) => {
    if (value >= 150) return '#22c55e';
    if (value >= 100) return '#84cc16';
    if (value >= 70) return '#f59e0b';
    if (value >= 40) return '#f97316';
    return '#ef4444';
};
