// Path: backend/src/lib/prisma.ts
// Re-exports the single shared Prisma client defined in config/db.ts.
// Kept so existing controller imports (`import { prisma } from '../lib/prisma'`)
// keep working without changes.

export { prisma } from '../config/db';