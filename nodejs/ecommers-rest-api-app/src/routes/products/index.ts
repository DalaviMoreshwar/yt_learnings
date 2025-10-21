import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productController";
import { validateData } from "./../../middleware/validation.middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "./../../db/productSchema";

// products endpoints
const productRoutes = Router();

productRoutes.get("/", listProducts);

productRoutes.get("/:id", getProductById);

productRoutes.post("/", validateData(createProductSchema), createProduct);

productRoutes.put("/:id", validateData(updateProductSchema), updateProduct);

productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
