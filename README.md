# Monorepo Starter

A minimal monorepo setup with React client and Node.js service, both configured with TypeScript, ESLint, and Prettier.

## Structure

```
├── client/          # React + TypeScript + Vite
├── service/         # Node.js + TypeScript + Express
├── package.json     # Root package.json with workspace configuration
├── .eslintrc.js   # Shared ESLint configuration
└── .prettierrc.json # Shared Prettier configuration
```

## Quick Start

### Install Dependencies

```bash
# Install root dependencies (ESLint, Prettier)
npm install

# Install client dependencies
npm run install:client

# Install service dependencies
npm run install:service
```

### Git Hooks Setup

Git hooks are automatically set up when you run `npm install` in the root directory. The pre-commit hook will automatically run ESLint and Prettier on staged files before each commit.

### Development

Run both services:

```bash
# Start client (http://localhost:5173)
npm run dev:client

# Start service (http://localhost:3000)
npm run dev:service
```

## Client (`/client`)

### Features

- ⚛️ React 18 with TypeScript
- ⚡ Vite for fast development
- 🎨 Material UI components ready to use
- 🔄 Redux Toolkit + RTK Query configured
- 🧪 React Testing Library + Vitest
- 📁 Import aliases (`@/` points to `src/`)

### Commands

```bash
cd client

# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check Prettier formatting
```

### Configuration

- **Vite**: `vite.config.ts` with React plugin and import aliases
- **TypeScript**: `tsconfig.json` with path mapping for `@/` alias
- **ESLint**: Extends root config with React-specific rules
- **Material UI**: Theme provider and CssBaseline configured in `main.tsx`
- **Redux**: Store configured in `src/store/index.ts`

## Service (`/service`)

### Features

- 🚀 Node.js with TypeScript
- 🌐 Express.js server
- 🧪 Mocha + Chai + Supertest for testing
- 📁 Import aliases (`@/` points to `src/`)
- 🔥 Hot reload with tsx

### Commands

```bash
cd service

# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm start            # Start production server

# Testing
npm test             # Run tests

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check Prettier formatting
```

### Configuration

- **TypeScript**: `tsconfig.json` with path mapping for `@/` alias
- **Express**: Basic server setup in `src/index.ts`
- **ESLint**: Extends root config with Node.js-specific settings
- **Testing**: Mocha configured to work with TypeScript

## Shared Configuration

### ESLint

- Shared base configuration in root `.eslintrc.json`
- TypeScript support with `@typescript-eslint`
- Prettier integration
- Client extends with React-specific rules
- Service uses base Node.js configuration

### Prettier

- Consistent formatting across both projects
- Configuration in root `.prettierrc.json`

## Next Steps

This is a minimal technical setup. You can now add:

**Client:**

- Components in `src/components/`
- Pages/routes with React Router
- Redux slices and RTK Query APIs
- Material UI theme customization

**Service:**

- API routes in separate files
- Database integration
- Middleware
- Authentication
- Error handling

**Both:**

- Environment configuration
- Docker setup
- CI/CD pipelines
- Additional testing utilities
