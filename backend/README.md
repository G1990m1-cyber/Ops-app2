# Ops App Backend

Express.js REST API with Prisma ORM and SQLite database.

## Setup

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed   # optional: seed with sample data
npm run dev       # start dev server
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/properties | List properties |
| POST | /api/properties | Create property |
| PUT | /api/properties/:id | Update property |
| GET | /api/action-items | List action items |
| POST | /api/action-items | Create action item |
| PUT | /api/action-items/:id | Update action item |
| GET | /api/approvals | List approvals |
| POST | /api/approvals | Submit approval |
| POST | /api/approvals/:id/action | Approve/reject |
| GET | /api/work-tickets | List work tickets |
| POST | /api/work-tickets | Create ticket |
| PUT | /api/work-tickets/:id | Update ticket |
| GET | /api/dashboard/stats | Dashboard statistics |

All routes require `Authorization: Bearer <token>` header except `/api/auth/login`.
