# Bluestone PIM - Product List Application

A Next.js application for viewing and editing product information.

## Requirements

-   [Bun](https://bun.sh/) 1.x
-   Docker (optional, for containerized deployment)

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Runtime     | Bun                                |
| UI          | MUI 7 + CSS Modules                |
| State/Cache | TanStack Query v5                  |
| Forms       | React Hook Form + Zod              |
| Search      | Fuse.js                            |
| Persistence | Dexie.js (IndexedDB)               |
| Testing     | Vitest + React Testing Library     |
| Container   | Docker (multi-stage build)         |

## Getting Started

### Local Development

```bash
# Install dependencies
bun install

# Start development server with Turbopack
bun run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
bun run build

# Start production server
bun run start
```

### Docker

```bash
# Development (with hot reload)
docker-compose up dev

# Production
docker-compose up prod
```

## Available Scripts

| Script                  | Description                     |
| ----------------------- | ------------------------------- |
| `bun run dev`           | Start dev server with Turbopack |
| `bun run build`         | Build for production            |
| `bun run start`         | Start production server         |
| `bun run lint`          | Run ESLint                      |
| `bun run test`          | Run tests                       |
| `bun run test:watch`    | Run tests in watch mode         |
| `bun run test:coverage` | Run tests with coverage         |

## Test Coverage

| Metric     | Overall | Key Files (db, schema, ProductList) |
| ---------- | ------- | ----------------------------------- |
| Statements | 14.6%   | 100%                                |
| Branches   | 74.3%   | 100%                                |
| Functions  | 60.9%   | 100%                                |
| Lines      | 14.6%   | 100%                                |

**23 tests** covering:

-   Data persistence (IndexedDB reload simulation)
-   Database operations (Dexie.js CRUD)
-   Schema validation (Zod)
-   Component rendering (React Testing Library)

```bash
bun run test           # Run all tests
bun run test:coverage  # Generate coverage report
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (product list)
│   ├── globals.css         # Global styles (minimal)
│   └── products/
│       └── [name]/
│           └── page.tsx    # Product details page
├── components/
│   ├── providers/          # React Query + MUI providers
│   ├── ProductList/        # Product list component
│   ├── ProductSearch/      # Search input component
│   └── ProductDetails/     # Product details + edit form
├── hooks/
│   ├── useDebounce.ts      # Debounce hook for search
│   ├── useProducts.ts      # Fetch all products
│   ├── useProduct.ts       # Fetch single product
│   └── useUpdateProduct.ts # Update product mutation
├── lib/
│   ├── db.ts               # Dexie.js IndexedDB setup
│   ├── theme.ts            # MUI theme (Bluestone colors)
│   ├── queryClient.ts      # TanStack Query client
│   ├── fuseIndex.ts        # Fuse.js search configuration
│   └── productSchema.ts    # Zod validation schema
├── data/
│   └── products.json       # Initial product data
├── types/
│   └── product.ts          # Product TypeScript interfaces
└── __tests__/              # Test files
```

## Data Persistence

Products are stored in **IndexedDB** using Dexie.js. On first load, the app seeds the database with initial product data from `products.json`. All changes persist across browser sessions.

```typescript
// Database schema
products: 'name, number'; // name = primary key
```
