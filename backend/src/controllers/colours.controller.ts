import { Request, Response, NextFunction } from 'express';
import * as ColourModel from '../models/colour.model';

export async function listColours(req: Request, res: Response, next: NextFunction) {
  try {
    const { family } = req.query;
    const shades = await ColourModel.findAllColours({ family: family as string });
    res.json({ success: true, data: shades });
  } catch (err) {
    next(err);
  }
}