import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

/**
 * NotFound — 404 page displayed for invalid routes.
 *
 * Features a fun Pokémon-themed message with
 * a link back to home.
 */
export default function NotFound() {
    return (
        <div
            className="animate-fade-in"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                textAlign: 'center',
                padding: '2rem 1rem',
                gap: '1.5rem',
            }}
        >
            {/* Big 404 */}
            <div
                style={{
                    fontSize: 'clamp(5rem, 15vw, 10rem)',
                    fontWeight: 900,
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, var(--color-accent), #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}
            >
                404
            </div>

            {/* Message */}
            <div>
                <h1
                    style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.5rem',
                    }}
                >
                    Wild MissingNo. appeared!
                </h1>
                <p
                    style={{
                        fontSize: '1rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '24rem',
                    }}
                >
                    The page you&apos;re looking for doesn&apos;t exist.
                    It may have fled to another route!
                </p>
            </div>

            {/* Back Home */}
            <Link to="/">
                <Button variant="primary" size="lg">
                    🏠 Return Home
                </Button>
            </Link>
        </div>
    );
}
