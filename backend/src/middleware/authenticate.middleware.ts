// Path: backend/src/middleware/authenticate.middleware.ts
//
// Phase 1 note: customers never log in (enquiry-only flow), so nothing in
// this file is required yet. It exists now so Phase 2 (Google/Facebook
// login for customers, and an admin dashboard) can be added by:
//   1. Installing passport + passport-google-oauth20 + passport-facebook
//   2. Setting a real JWT_SECRET in .env
//   3. Issuing a JWT after a successful OAuth callback
//   4. Switching routes from `attachUser` to `requireAuth` where login
//      should be mandatory (e.g. admin routes, "my enquiries" page)
//
// Until then, `attachUser` is safe to use everywhere: it silently does
// nothing when no token is present, so it never breaks Phase 1 traffic.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthUser {
    id: string;
    email: string;
    role: string; // 'customer' | 'admin' | 'support' | 'sales' (Phase 2)
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}

function extractToken(req: Request): string | null {
    const header = req.headers.authorization;
    if (header?.startsWith('Bearer ')) return header.slice(7);
    if (req.cookies?.token) return req.cookies.token;
    return null;
}

function verifyToken(token: string): AuthUser | null {
    const secret = process.env.JWT_SECRET;
    if (!secret) return null; // no secret configured yet (Phase 1) - treat as no session

    try {
        return jwt.verify(token, secret) as AuthUser;
    } catch {
        return null;
    }
}

// Optional auth: attaches req.user if a valid token is present, otherwise
// just calls next() and leaves req.user undefined. Never blocks the request.
// Safe to add to any Phase 1 route today.
export function attachUser(req: Request, _res: Response, next: NextFunction) {
    const token = extractToken(req);
    if (token) {
        const user = verifyToken(token);
        if (user) req.user = user;
    }
    next();
}

// Required auth: blocks the request with 401 if there's no valid user.
// Not used by any route in Phase 1 - switch a route to this once
// Google/Facebook login (Phase 2) is wired up.
export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = extractToken(req);
    const user = token ? verifyToken(token) : null;

    if (!user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    req.user = user;
    next();
}

// Role guard: use after requireAuth once admin roles exist (Phase 2).
export function requireRole(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        next();
    };
}