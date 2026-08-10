// Thin HTTP layer - parses the request, calls the model, shapes the response.
import { Request, Response, NextFunction } from 'express';
import * as ProductModel from '../models/product.model';

// GET /api/products?type=&priceRange=&featured=&search=
export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { type, priceRange, featured, search } = req.query;

    const products = await ProductModel.findAllProducts({
      type: type as string,
      priceRange: priceRange as string,
      featured: featured === 'true',
      search: search as string,
    });

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: err });
    next(err);
  }
}
// GET /api/products/:slug
export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await ProductModel.findProductBySlug(req.params.slug);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch product', error: err });
    next(err);
  }
}