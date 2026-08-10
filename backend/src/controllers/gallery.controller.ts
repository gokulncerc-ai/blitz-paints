import { Request, Response, NextFunction } from 'express';
import * as GalleryModel from '../models/gallery.model';
import * as ProjectModel from '../models/project.model';

// GET /api/gallery
export async function listGallery(req: Request, res: Response, next: NextFunction) {
  try {
    const { category } = req.query;
    const items = await GalleryModel.findAllGallery({ category: category as string });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

// GET /api/projects (before/after transformations)
export async function listProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const { category } = req.query;
    const items = await ProjectModel.findAllProjects({ category: category as string });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}