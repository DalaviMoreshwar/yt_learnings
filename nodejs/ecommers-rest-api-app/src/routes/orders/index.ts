import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middleware/validation.middleware.js";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/orderSchema.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const ordersRoutes = Router();

ordersRoutes.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

ordersRoutes.get("/", verifyToken, listOrders);

ordersRoutes.get("/:id", verifyToken, getOrder);

ordersRoutes.put(
  "/:id",
  verifyToken,
  validateData(updateOrderSchema),
  updateOrder
);

export default ordersRoutes;
