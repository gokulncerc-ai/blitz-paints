// Owns both the Prisma client and a raw `pg` Pool, built directly from
// DATABASE_URL in your .env file. Prisma handles all typed queries used by
// the models; the pg Pool is there if you ever need raw SQL or a health check.
import { PrismaClient } from '@prisma/client';
import pkg from 'pg';
const { Pool } = pkg;
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
    throw new Error(
        'DATABASE_URL is not set. Add it to backend/.env, e.g.\n' +
        'DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blitz_db?schema=public"'
    );
}
// Only set DB_SSL=true in .env when connecting to a hosted Postgres
// (Neon, Supabase, Railway, RDS, etc.) that requires it.
const useSSL = process.env.DB_SSL === 'true';
declare global {
    // eslint-disable-next-line no-var
    var __prisma: PrismaClient | undefined;
}
// Explicitly pass DATABASE_URL into the Prisma datasource instead of relying
// on Prisma's implicit env() lookup - makes the source obvious and fails
// loudly (see the throw above) if it's ever missing.
export const prisma =
    global.__prisma ||
    new PrismaClient({
        datasources: { db: { url: DATABASE_URL } },
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
if (process.env.NODE_ENV !== 'production') {
    global.__prisma = prisma;
}
class Database {
    private pool: InstanceType<typeof Pool> | null = null;
    public isConnected = false;
    async connect(): Promise<void> {
        this.pool = new Pool({
            connectionString: DATABASE_URL,
            ssl: useSSL ? { rejectUnauthorized: false } : undefined,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 10000,
        });
        this.pool.on('error', (err) => {
            console.error('Unexpected pg pool error:', err);
            this.isConnected = false;
        });
        // Test the raw pg connection
        const client = await this.pool.connect();
        await client.query('SELECT 1');
        client.release();
        console.log('pg Pool connected to', new URL(DATABASE_URL as string).host);
        // Test the Prisma connection
        await prisma.$connect();
        console.log('Prisma connected to PostgreSQL database (blitz_db)');
        this.isConnected = true;
    }
    getPool() {
        if (!this.pool) throw new Error('Database not connected. Call connect() first.');
        return this.pool;
    }
    getPrisma() {
        return prisma;
    }
    async query(text: string, params?: any[]) {
        if (!this.pool) throw new Error('Database not connected');
        return this.pool.query(text, params);
    }
    async close(): Promise<void> {
        await prisma.$disconnect();
        if (this.pool) await this.pool.end();
        this.isConnected = false;
    }
    async healthCheck(): Promise<boolean> {
        try {
            if (!this.pool) return false;
            const result = await this.pool.query('SELECT 1');
            this.isConnected = result.rowCount === 1;
            return this.isConnected;
        } catch {
            this.isConnected = false;
            return false;
        }
    }
}
const database = new Database();
export async function connectDB(): Promise<void> {
    await database.connect();
}
export async function disconnectDB(): Promise<void> {
    await database.close();
}
export default database;
export { prisma as default_prisma };