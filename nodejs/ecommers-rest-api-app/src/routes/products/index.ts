import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "./productController";

// products endpoints
const productRoutes = Router();

productRoutes.get("/", listProducts);

productRoutes.get("/:id", getProductById);

productRoutes.post("/", createProduct);

productRoutes.put("/", updateProduct);

productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
