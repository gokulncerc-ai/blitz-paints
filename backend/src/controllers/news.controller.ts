import { Request, Response, NextFunction } from 'express';
import * as NewsModel from '../models/news.model';

export async function listNews(_req: Request, res: Response, next: NextFunction) {
  try {
    const news = await NewsModel.findAllPublishedNews();
    res.json({ success: true, data: news });
  } catch (err) {
    next(err);
  }
}

export async function getNewsBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const article = await NewsModel.findNewsBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: article });
  } catch (err) {
    next(err);
  }
}