# 🐾 Pokémon Explorer

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter)

**A professional, production-ready React application for exploring Pokémon with PokéAPI.**  
Built with modern 2026 best practices — fast, responsive, accessible, and beautifully designed.

[Getting Started](#-installation) · [Features](#-features) · [Architecture](#-architecture) · [Documentation](#-docs-used)

</div>

---

## 🧠 Description

**Pokémon Explorer** is an advanced frontend application that allows users to browse, search, and explore Pokémon using the [PokéAPI](https://pokeapi.co). The project showcases modern React development patterns including:

- **Infinite scrolling** with TanStack Query's `useInfiniteQuery`
- **Smart caching & prefetching** for instant navigation
- **Debounced search** to reduce unnecessary API calls
- **Dark mode** with system preference detection and persistence
- **Lazy-loaded routes** with React Suspense for performance
- **Error boundaries** for graceful error handling
- **Fully responsive** design with CSS custom properties

---

## 🛠 Stack & Tools

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI library with hooks, Suspense, concurrent features |
| [Vite](https://vite.dev) | 6 | Lightning-fast build tool and dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Utility-first CSS with PostCSS integration |
| [React Router](https://reactrouter.com) | 7 | Client-side routing with lazy loading |
| [TanStack Query](https://tanstack.com/query) | 5 | Server state management with caching & revalidation |
| [Vitest](https://vitest.dev) | 3 | Unit testing framework (Vite-native, Jest-compatible) |
| [Testing Library](https://testing-library.com) | 16 | User-centric component testing |
| [ESLint](https://eslint.org) | 9 | Code linting with flat config |
| [Prettier](https://prettier.io) | 3 | Code formatting |

---

## 🚀 Features

- ✅ **Infinite scroll pagination** — Seamlessly loads Pokémon as you scroll
- ✅ **Debounced search** — Smart search with 300ms debounce to reduce API calls
- ✅ **Rich detail view** — Multiple sprites (front/back/shiny), stat bar charts, abilities, moves, XP/height/weight
- ✅ **Type badges** — Color-coded by Pokémon type (Fire = orange, Water = blue, etc.)
- ✅ **Dark mode** — Toggle with localStorage persistence + system preference detection
- ✅ **Prefetch on hover** — Detail data preloads when you hover a card for instant navigation
- ✅ **Responsive design** — Works beautifully on mobile, tablet, and desktop
- ✅ **Error boundaries** — Global + local error handling with retry capability
- ✅ **Lazy routes** — Code-split pages loaded on-demand with `React.lazy` + `Suspense`
- ✅ **Pokéball spinner** — Custom SVG loading animation
- ✅ **Micro-animations** — Hover effects, fade-ins, floating Pokémon, and smooth transitions
- ✅ **Smart caching** — TanStack Query caches API responses for 5 minutes
- ✅ **Accessibility** — ARIA labels, keyboard navigation, semantic HTML, screen reader support
- ✅ **404 page** — Themed "Wild MissingNo. appeared!" error page
- ✅ **Unit tests** — Components tested with Vitest + Testing Library

---

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>
cd pokemon-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 💡 Scripts

| Script | Command | Description |
|---|---|---|
| **Dev server** | `npm run dev` | Start Vite dev server with HMR |
| **Build** | `npm run build` | Create production build in `dist/` |
| **Preview** | `npm run preview` | Preview production build locally |
| **Test** | `npm test` | Run all unit tests once |
| **Test (watch)** | `npm run test:watch` | Run tests in watch mode |
| **Test coverage** | `npm run test:coverage` | Run tests with coverage report |
| **Lint** | `npm run lint` | Run ESLint |
| **Format** | `npm run format` | Format code with Prettier |

---

## 📁 Architecture

```
pokemon-explorer/
├── public/
│   └── pokeball.svg              # Favicon
├── src/
│   ├── assets/
│   │   └── images/               # Static images (if needed)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx        # Reusable button (variants, sizes, loading)
│   │   │   ├── Loading.jsx       # Pokéball SVG spinner
│   │   │   └── ErrorFallback.jsx # Error boundary + fallback UI
│   │   ├── PokemonCard.jsx       # Grid card with type colors, prefetch
│   │   ├── PokemonList.jsx       # Responsive grid + infinite scroll
│   │   └── SearchBar.jsx         # Debounced search input
│   ├── features/
│   │   └── pokemon/
│   │       ├── PokemonItem.jsx   # Compact row-style display
│   │       ├── PokemonDetail.jsx # Full detail view (stats, sprites, moves)
│   │       └── pokemon.service.js# API layer (fetch, error handling, timeout)
│   ├── hooks/
│   │   ├── useDebounce.js        # Debounce hook (300ms default)
│   │   └── useFetchPokemons.js   # TanStack Query hooks (list, detail, prefetch)
│   ├── pages/
│   │   ├── Home.jsx              # Main page with search + infinite list
│   │   ├── PokemonPage.jsx       # Detail page (by route param)
│   │   └── NotFound.jsx          # 404 page
│   ├── routes/
│   │   └── index.jsx             # Lazy-loaded route definitions
│   ├── styles/
│   │   └── index.css             # Global styles, Tailwind import, theme, animations
│   ├── utils/
│   │   └── helpers.js            # Pure utility functions
│   ├── tests/
│   │   ├── setup.js              # Vitest setup (jest-dom matchers)
│   │   ├── PokemonCard.test.jsx
│   │   ├── SearchBar.test.jsx
│   │   └── Home.test.jsx
│   ├── App.jsx                   # App shell (header, dark mode, routes)
│   └── main.jsx                  # Entry point (providers, root render)
├── eslint.config.js
├── .prettierrc
├── postcss.config.mjs
├── vite.config.js
├── package.json
└── README.md
```

### Key architectural decisions:

- **Feature-based structure** — Pokémon-specific logic lives in `features/pokemon/`
- **Hooks for shared logic** — Custom hooks abstract away data fetching and debouncing
- **Service layer** — API calls are centralized in `pokemon.service.js` with proper error handling and timeout
- **CSS custom properties** — Theme variables enable dark/light mode without class duplication
- **Lazy routes** — Each page is code-split for optimal initial load performance

---

## 🌐 Docs Used

This project was built using the latest official documentation from each technology:

| Technology | Documentation | Key takeaways |
|---|---|---|
| **React 19** | [react.dev](https://react.dev) | New `use()` hook, improved Suspense, concurrent features, StrictMode |
| **Vite 6** | [vite.dev](https://vite.dev) | `defineConfig`, path aliases, Environment API, Vitest integration |
| **Tailwind CSS 4** | [tailwindcss.com](https://tailwindcss.com) | `@tailwindcss/postcss` plugin, CSS-first configuration, `@import "tailwindcss"` |
| **React Router 7** | [reactrouter.com](https://reactrouter.com) | Unified `react-router` package, library mode, `createBrowserRouter` |
| **TanStack Query 5** | [tanstack.com/query](https://tanstack.com/query) | `useInfiniteQuery`, `queryOptions` API, `gcTime` (renamed from `cacheTime`), prefetch |
| **Vitest** | [vitest.dev](https://vitest.dev) | Jest-compatible API, Vite-native, `jsdom` environment, `@testing-library/jest-dom/vitest` |
| **PokéAPI v2** | [pokeapi.co](https://pokeapi.co) | `GET /pokemon?limit=&offset=`, `GET /pokemon/{name}`, no rate limit (fair use), local caching recommended |
| **Accessibility** | [web.dev/accessibility](https://web.dev/accessibility) | ARIA labels, `role="status"` for loading, `role="alert"` for errors, keyboard navigation, semantic HTML |

---

## 🧪 Tests

The project uses **Vitest** (Jest-compatible) with **React Testing Library** for user-centric component testing.

```bash
# Run tests once
npm test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### What's tested:

| Test file | Coverage |
|---|---|
| `PokemonCard.test.jsx` | Renders name, ID, types, image, link; multi-type scenario |
| `SearchBar.test.jsx` | Input rendering, typing, clear button, accessibility |
| `Home.test.jsx` | Hero title, search bar, loading state, description |

---

## ⭐ Future Improvements

- [ ] **Pokémon comparison tool** — Compare stats side-by-side
- [ ] **Favorites system** — Save favorite Pokémon with localStorage
- [ ] **Evolution chain** — Show evolution paths on detail page
- [ ] **Advanced filters** — Filter by type, generation, stats
- [ ] **PWA support** — Offline capability with service workers
- [ ] **i18n** — Multi-language support
- [ ] **E2E tests** — Playwright or Cypress integration tests
- [ ] **Server-side rendering** — Next.js or React Router Framework Mode

---

## 📌 Notes

- **PokéAPI** is a free, open-source API. No API key required. Rate limits were removed, but please follow the [fair use policy](https://pokeapi.co/docs/v2#fairuse).
- **Images** are served from GitHub's PokeAPI sprites repository for optimal performance.
- **Dark mode** defaults to the user's system preference (`prefers-color-scheme: dark`).
- Built with **Vitest** instead of Jest since Vitest is the standard testing solution for Vite projects — zero extra config needed.

---

## 🔗 Useful Links

- 📘 [React Documentation](https://react.dev)
- ⚡ [Vite Documentation](https://vite.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🗺️ [React Router](https://reactrouter.com)
- 🔄 [TanStack Query](https://tanstack.com/query)
- 🧪 [Vitest](https://vitest.dev)
- 🎮 [PokéAPI](https://pokeapi.co)

---

## 🎓 Author

Built with ❤️ as a showcase of modern React development best practices.

---

<div align="center">

**⭐ If you found this project useful, please give it a star!**

</div>
