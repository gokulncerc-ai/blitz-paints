// Path: backend/src/middleware/errorHandler.ts

import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
}

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.errors.map((e) => ({ path: e.path.join('.'), message: e.message })),
    });
  }

  // Prisma "record not found"
  if (err?.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Record not found' });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong. Please try again.',
  });
}
