# ResolveDesk

ResolveDesk is a multi-tenant helpdesk SaaS with a responsive React dashboard and a focused Express/Prisma API. It includes tenant-isolated tickets, customers, team management, JWT sessions with refresh rotation, SLA preferences, a Redis/BullMQ notification worker, Swagger, Docker, and demo data.

## Prerequisites

Node.js 20+, PostgreSQL 16+, and Redis 7+ for local development. Docker Desktop is the easiest way to run the complete stack.

## Start with Docker

```bash
copy .env.example .env
docker compose up --build
```

Open `http://localhost:5173`. API health is at `http://localhost:5000/api/health`, and Swagger UI is at `http://localhost:5000/api/docs`.

## Local development

```bash
copy .env.example .env
npm install
npm run prisma:generate -w backend
npm run prisma:migrate -w backend -- --name init
npm run prisma:seed -w backend
npm run dev
```

The frontend runs on port 5173 and the API on port 5000. Run the queue worker separately with `npm run worker -w backend`.

## Demo accounts

All accounts use password `Demo123!`:

- `admin@resolvedesk.demo` — Administrator
- `agent@resolvedesk.demo` — Support agent
- `customer@resolvedesk.demo` — Customer

## Testing and builds

```bash
npm run build
npm test
```

The included CI workflow installs dependencies and verifies production builds on pushes and pull requests. For AWS, push the backend and frontend images to ECR, supply secrets through ECS task definitions / Secrets Manager, use RDS PostgreSQL and ElastiCache Redis, and set `CLIENT_ORIGIN` to the deployed frontend domain.

## Tenant security

The API derives `organizationId` from the verified access token. Ticket, customer, team, settings, and related resource queries are always constrained to that ID; request-supplied organization IDs are never trusted.
