import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/components/SearchBar';

describe('SearchBar', () => {
    it('renders the search input', () => {
        render(<SearchBar value="" onChange={() => { }} />);
        expect(screen.getByPlaceholderText('Search Pokémon…')).toBeInTheDocument();
    });

    it('renders with custom placeholder', () => {
        render(
            <SearchBar value="" onChange={() => { }} placeholder="Find your Pokémon" />
        );
        expect(screen.getByPlaceholderText('Find your Pokémon')).toBeInTheDocument();
    });

    it('calls onChange when user types', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<SearchBar value="" onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Search Pokémon…');

        await user.type(input, 'pika');
        expect(handleChange).toHaveBeenCalledTimes(4);
        expect(handleChange).toHaveBeenLastCalledWith('pika');
    });

    it('shows clear button when value is not empty', () => {
        render(<SearchBar value="pikachu" onChange={() => { }} />);
        expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
    });

    it('does not show clear button when value is empty', () => {
        render(<SearchBar value="" onChange={() => { }} />);
        expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });

    it('calls onChange with empty string when clear is clicked', async () => {
        const handleChange = vi.fn();
        const user = userEvent.setup();

        render(<SearchBar value="pikachu" onChange={handleChange} />);
        const clearBtn = screen.getByLabelText('Clear search');

        await user.click(clearBtn);
        expect(handleChange).toHaveBeenCalledWith('');
    });

    it('has accessible label', () => {
        render(<SearchBar value="" onChange={() => { }} />);
        expect(screen.getByLabelText('Search Pokémon by name')).toBeInTheDocument();
    });
});
