/**
 * Button — Reusable button component with variants and sizes.
 *
 * Supports primary, secondary, and ghost variants.
 * Includes loading state with spinner.
 */

const variantStyles = {
    primary: {
        base: 'text-white font-semibold',
        bg: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-dark))',
        hover: 'brightness(1.1)',
    },
    secondary: {
        base: 'font-semibold',
        bg: 'var(--color-bg-secondary)',
        hover: 'brightness(0.95)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
    },
    ghost: {
        base: 'font-medium',
        bg: 'transparent',
        hover: 'var(--color-bg-secondary)',
        color: 'var(--color-text-secondary)',
    },
};

const sizeStyles = {
    sm: { padding: '0.375rem 0.75rem', fontSize: '0.8125rem', borderRadius: 'var(--radius-sm)' },
    md: { padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: 'var(--radius-md)' },
    lg: { padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' },
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    onClick,
    className = '',
    type = 'button',
    ariaLabel,
    ...props
}) {
    const v = variantStyles[variant];
    const s = sizeStyles[size];

    const style = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        background: v.bg,
        color: v.color || 'inherit',
        border: v.border || 'none',
        padding: s.padding,
        fontSize: s.fontSize,
        borderRadius: s.borderRadius,
        transition: 'all var(--transition-fast)',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.6 : 1,
        whiteSpace: 'nowrap',
    };

    return (
        <button
            type={type}
            style={style}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${v.base} ${className}`}
            aria-label={ariaLabel}
            aria-busy={loading}
            onMouseEnter={(e) => {
                if (!disabled && !loading) {
                    e.currentTarget.style.filter = `${v.hover ? `brightness(${v.hover === 'brightness(1.1)' ? 1.1 : 0.95})` : ''}`;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.filter = '';
                e.currentTarget.style.transform = '';
            }}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" opacity="0.75" />
                </svg>
            )}
            {children}
        </button>
    );
}
