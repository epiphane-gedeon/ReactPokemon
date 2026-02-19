import { useState, useEffect } from 'react';

/**
 * useDebounce — Debounce a value by a specified delay.
 *
 * Useful for search inputs to avoid excessive API calls on every keystroke.
 *
 * @param {any} value — The value to debounce
 * @param {number} delay — Debounce delay in milliseconds (default: 300ms)
 * @returns {any} The debounced value
 */
export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: cancel the previous timer if value or delay changes
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
