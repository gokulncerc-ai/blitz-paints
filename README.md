<<<<<<< HEAD
# Blitz Paints — Phase 1 Project

Split architecture:

```
blitz-paints/
├── backend/    Node.js + Express + TypeScript + Prisma + PostgreSQL  (REST API)
└── frontend/   React + Vite + TypeScript + Tailwind CSS              (SPA, consumes the API)
```

They run as two independent apps on two ports (backend on :5000, frontend on :5173),
talking over HTTP/JSON. This is the "split frontend and backend" architecture — you can
deploy, scale, and later swap either side (e.g. add a mobile app that hits the same API)
without touching the other.

## Prerequisites
- Node.js 18+
- PostgreSQL running locally (or a hosted instance, e.g. Neon/Supabase/Railway)

## 1. Get the code onto your machine

You already have the folder: `D:\DEVELOP\Blitz\blitz-paints`
Unzip this project's `backend/` and `frontend/` folders directly into it, so you get:

```
D:\DEVELOP\Blitz\blitz-paints\backend
D:\DEVELOP\Blitz\blitz-paints\frontend
```

## 2. Backend setup

```powershell
cd D:\DEVELOP\Blitz\blitz-paints\backend
npm install
copy .env.example .env
```

Edit `.env` and set your real Postgres connection string:
```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blitz_db?schema=public"
PORT=5000
CLIENT_URL="http://localhost:5173"
```

Create the database, then run the migration + seed:
```powershell
npx prisma migrate dev --name init
npm run seed
```

Start the API:
```powershell
npm run dev
```
API now runs at http://localhost:5000/api — check http://localhost:5000/api/health

## 3. Frontend setup

Open a **second terminal**:
```powershell
cd D:\DEVELOP\Blitz\blitz-paints\frontend
npm install
copy .env.example .env
```

`.env` should point at your backend:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the dev server:
```powershell
npm run dev
```
Frontend now runs at http://localhost:5173

## 4. Add real images

Drop your product/service/hero/project photos into:
```
frontend/public/images/hero/
frontend/public/images/products/
frontend/public/images/services/
frontend/public/images/projects/
frontend/public/images/news/
frontend/public/images/home/
```
The seed data already references filenames like `/images/products/weather-shield-exterior.png` —
match those names, or update `backend/prisma/seed.ts` and re-run `npm run seed`.

## How data flows (example: Home page featured products)

1. `frontend/src/pages/Home.tsx` renders `<FeaturedProducts />`
2. `frontend/src/components/home/FeaturedProducts.tsx` calls `getProducts()` from `frontend/src/api/products.ts`
3. That hits `GET http://localhost:5000/api/products?featured=true&...`
4. `backend/src/routes/products.routes.ts` → `backend/src/controllers/products.controller.ts` → Prisma → PostgreSQL
5. JSON comes back, React renders the cards

Every other page (Products, Services, Projects, Colours, Blogs, Contact) follows the same pattern —
page component → `src/api/*.ts` function → Express route → controller → Prisma → Postgres.

## Where to add Phase 2 (auth, admin dashboard, bookings)
- Backend: add `backend/src/middleware/auth.ts` + protect `/api/admin/*` routes, add `admin_users` model to `schema.prisma`
- Frontend: add `frontend/src/pages/admin/*` behind a route guard, add `frontend/src/context/AuthContext.tsx`

## Project structure reference

```
backend/
├── prisma/
│   ├── schema.prisma       # DB models
│   └── seed.ts             # sample data
├── src/
│   ├── controllers/        # business logic per resource
│   ├── routes/             # Express routers, mounted under /api
│   ├── middleware/         # error handling
│   ├── validation/         # Zod schemas
│   ├── lib/prisma.ts       # shared Prisma client
│   ├── app.ts              # Express app + middleware
│   └── server.ts           # entry point
└── package.json

frontend/
├── src/
│   ├── api/                # fetch functions, one file per resource
│   ├── components/
│   │   ├── layout/         # Header, Footer, TopBar
│   │   ├── home/           # homepage-only sections
│   │   └── ui/             # Button, Loader, ErrorMessage
│   ├── pages/               # one file per route
│   ├── routes/AppRoutes.tsx # route table
│   ├── types/               # shared TS interfaces
│   ├── App.tsx
│   └── main.tsx
└── package.json
```
=======
# blitz-paints
a site for blitz-paints phase 1
>>>>>>> 6efdff38af82154d43e7b085840d218e072ca70f
