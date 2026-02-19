import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// We need to mock the fetch calls before importing Home
vi.mock('@/features/pokemon/pokemon.service', () => ({
    fetchPokemons: vi.fn(),
    fetchPokemonByName: vi.fn(),
}));

import Home from '@/pages/Home';
import { fetchPokemons } from '@/features/pokemon/pokemon.service';

function renderWithProviders(ui) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0,
            },
        },
    });
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>{ui}</BrowserRouter>
        </QueryClientProvider>
    );
}

describe('Home Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the hero title', () => {
        fetchPokemons.mockResolvedValue({
            results: [],
            nextOffset: null,
            count: 0,
        });

        renderWithProviders(<Home />);
        expect(screen.getByText('Pokémon Explorer')).toBeInTheDocument();
    });

    it('renders the search bar', () => {
        fetchPokemons.mockResolvedValue({
            results: [],
            nextOffset: null,
            count: 0,
        });

        renderWithProviders(<Home />);
        expect(screen.getByPlaceholderText('Search Pokémon by name…')).toBeInTheDocument();
    });

    it('shows a loading state initially', () => {
        // Make the fetch never resolve to keep loading state
        fetchPokemons.mockReturnValue(new Promise(() => { }));

        renderWithProviders(<Home />);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders the description text', () => {
        fetchPokemons.mockResolvedValue({
            results: [],
            nextOffset: null,
            count: 0,
        });

        renderWithProviders(<Home />);
        expect(
            screen.getByText('Discover and explore your favorite Pokémon')
        ).toBeInTheDocument();
    });
});
