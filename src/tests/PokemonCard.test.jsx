import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokemonCard from '@/components/PokemonCard';

// Helper to wrap components with required providers
function renderWithProviders(ui) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false, staleTime: Infinity },
        },
    });
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{ui}</BrowserRouter>
        </QueryClientProvider>
    );
}

const mockPokemon = {
    id: 25,
    name: 'pikachu',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    types: ['electric'],
};

describe('PokemonCard', () => {
    it('renders the Pokémon name correctly (capitalized)', () => {
        renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });

    it('renders the Pokémon ID badge', () => {
        renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByText('#025')).toBeInTheDocument();
    });

    it('renders type badges', () => {
        renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        expect(screen.getByText('electric')).toBeInTheDocument();
    });

    it('renders the image with correct alt text', () => {
        renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        const img = screen.getByAltText('Pikachu');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockPokemon.image);
    });

    it('links to the correct detail page', () => {
        renderWithProviders(<PokemonCard pokemon={mockPokemon} />);
        const link = screen.getByRole('link', { name: /view details for pikachu/i });
        expect(link).toHaveAttribute('href', '/pokemon/pikachu');
    });

    it('renders multiple type badges when Pokémon has multiple types', () => {
        const multiTypePokemon = {
            ...mockPokemon,
            id: 6,
            name: 'charizard',
            types: ['fire', 'flying'],
        };
        renderWithProviders(<PokemonCard pokemon={multiTypePokemon} />);
        expect(screen.getByText('fire')).toBeInTheDocument();
        expect(screen.getByText('flying')).toBeInTheDocument();
    });
});
