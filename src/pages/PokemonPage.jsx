import { useParams, useNavigate } from 'react-router-dom';
import { useFetchPokemonDetail } from '@/hooks/useFetchPokemons';
import PokemonDetail from '@/features/pokemon/PokemonDetail';
import Loading from '@/components/common/Loading';
import ErrorFallback from '@/components/common/ErrorFallback';
import Button from '@/components/common/Button';

/**
 * PokemonPage — Route page for viewing a single Pokémon's detail.
 *
 * Fetches data via TanStack Query using the `:name` route parameter.
 * Handles loading, error, and not-found states gracefully.
 */
export default function PokemonPage() {
    const { name } = useParams();
    const navigate = useNavigate();

    const { data: pokemon, isLoading, isError, error, refetch } = useFetchPokemonDetail(name);

    return (
        <div style={{ maxWidth: '76rem', margin: '0 auto', padding: '1rem' }}>
            {/* Back Button */}
            <div style={{ marginBottom: '1.5rem' }}>
                <Button
                    variant="ghost"
                    size="md"
                    onClick={() => navigate(-1)}
                    ariaLabel="Go back"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                </Button>
            </div>

            {/* Content */}
            {isLoading && <Loading size="lg" message={`Loading ${name}…`} />}
            {isError && <ErrorFallback error={error} onRetry={refetch} />}
            {pokemon && <PokemonDetail pokemon={pokemon} />}
        </div>
    );
}
