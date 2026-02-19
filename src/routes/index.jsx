import { lazy } from 'react';

/**
 * Route definitions — All pages are lazy-loaded for code splitting.
 *
 * Routes:
 * - /              → Home (Pokémon list with search)
 * - /pokemon/:name → PokémonPage (detail view)
 * - *              → NotFound (404)
 */
const Home = lazy(() => import('@/pages/Home'));
const PokemonPage = lazy(() => import('@/pages/PokemonPage'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export const routes = [
    { path: '/', element: <Home /> },
    { path: '/pokemon/:name', element: <PokemonPage /> },
    { path: '*', element: <NotFound /> },
];
