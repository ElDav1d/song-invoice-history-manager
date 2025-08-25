# Song Invoice History Manager

A React + Express monorepo for tracking music production progress and managing invoice generation for songs.

## 📋 Technical Analysis & Presentation

**Technical Analysis Presentation:** `presentation/Song Invoice History Manager - Technical Analisys.pdf`

The presentation document serves as both technical documentation and presentation material for stakeholders and development teams.

## Features

- Track song progress and issue invoices at completion milestones
- Persistent state using localStorage with RTK middleware
- Responsive tables with mobile text truncation
- Real-time progress updates and invoice history

## Structure

```
├── client/          # React + TypeScript + Vite + Redux Toolkit
├── service/         # Express API with TypeScript (in-memory storage)
├── package.json     # Workspace configuration
```

## Quick Start

```bash
# Install all dependencies
npm install

# Start development servers
npm run dev:client   # React app (http://localhost:5173)
npm run dev:service  # API server (http://localhost:3000)
```

## Architecture

### Frontend (Client)

- **Tech Stack:** React 18, TypeScript, Redux Toolkit, Material-UI, Vite
- **State:** RTK Query for API calls, custom persistence middleware
- **Components:** Feature-based architecture with shared UI components
- **Storage:** Automatic localStorage sync via RTK middleware

### Backend (Service)

- **Tech Stack:** Express.js, TypeScript, in-memory data storage
- **API:** RESTful endpoint for song data retrieval
- **Data:** Mock song entities with progress tracking

### Data Models

```typescript
// Song entity
{ id, name, author, progress, lastClickProgress?, lastClickDate? }

// Invoice entity
{ id, date, author, songName, progress }
```

## Development

### Commands

```bash
# Client
cd client
npm test            # Run tests with Vitest
npm run build       # Production build

# Service
cd service
npm test            # Run API tests
npm run build       # TypeScript build
```
