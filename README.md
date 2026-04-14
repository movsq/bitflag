# Bitflag

> A web-based game. What it'll look like - no idea yet.

## Stack

| Layer | Choice |
|-------|--------|
| Runtime | Bun |
| HTTP | Fastify |
| Real-time | @fastify/websocket |
| Database | PostgreSQL + Drizzle ORM |
| Frontend | React + Vite |
| Language | TypeScript throughout |

## Project Structure

```
bitflag/
├── packages/
│   ├── client/     # React + Vite
│   ├── server/     # Bun + Fastify + @fastify/websocket
│   └── shared/     # Shared types & constants
├── docker-compose.yml
└── package.json
```

## Getting Started

**Prerequisites:** Bun, Docker

```bash
# Start the database
docker compose up -d

# Install dependencies
bun install

# Run the server
bun run dev:server

# Run the client
bun run dev:client
```

## Status

Early development. The foundation is there - auth is being built, the game design exists on paper, and the rest is being figured out as I go.

---

*Very basic registration: done... Game: somewhere in the future.*