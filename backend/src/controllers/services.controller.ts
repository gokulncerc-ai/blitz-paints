import { Request, Response, NextFunction } from 'express';
import * as ServiceModel from '../models/service.model';
// GET /api/services
export async function listServices(req: Request, res: Response, next: NextFunction) {
  try {
    const { type } = req.query;
    const services = await ServiceModel.findAllServices({ type: type as string });
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
}

// GET /api/services/:slug
export async function getServiceBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const service = await ServiceModel.findServiceBySlug(req.params.slug);

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
}