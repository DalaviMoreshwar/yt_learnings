import { NextFunction, Request, Response } from "express";
import { db } from "./../../db/index";
import { productsTable } from "./../../db/productSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).json({ message: "No data found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.send(500).send(error);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();

    res.status(201).json(product);
  } catch (error) {
    console.log(`Error::: ${error}`);
    next();
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    const [product] = await db
      .update(productsTable)
      .set(updatePayload)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send({ message: "Product not found!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (!deleteProduct) {
      res.status(404).json({ message: "No data found!" });
    }

    res.status(200).json(deleteProduct);
  } catch (error) {
    res.send(500).send(error);
  }
}
