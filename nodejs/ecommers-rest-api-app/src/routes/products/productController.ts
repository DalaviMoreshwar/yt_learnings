import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.json({ message: "the list of products." });
}

export function getProductById(req: Request, res: Response) {
  console.log(req.params.id);
  res.json({ message: "a product." });
}

export function createProduct(req: Request, res: Response) {
  res.status(201).json({ message: "new product created!", payload: req.body });
}

export function updateProduct(req: Request, res: Response) {
  res.json({ message: "the product updated!", payload: req.body });
}

export function deleteProduct(req: Request, res: Response) {
  res.json({ message: "the product deleted!", deletedProduct: req.params.id });
}
