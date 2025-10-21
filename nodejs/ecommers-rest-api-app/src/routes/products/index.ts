import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productController";
import {
  createProductSchema,
  updateProductSchema,
} from "./../../db/productSchema";
import { verifyAdmin, verifyToken } from "./../../middleware/auth.middleware";
import { validateData } from "./../../middleware/validation.middleware";

// products endpoints
const productRoutes = Router();

productRoutes.get("/", listProducts);

productRoutes.get("/:id", getProductById);

productRoutes.post(
  "/",
  verifyToken,
  verifyAdmin,
  validateData(createProductSchema),
  createProduct
);

productRoutes.put(
  "/:id",
  verifyToken,
  verifyAdmin,
  validateData(updateProductSchema),
  updateProduct
);

productRoutes.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default productRoutes;
