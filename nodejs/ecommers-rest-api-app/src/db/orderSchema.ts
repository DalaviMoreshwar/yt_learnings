import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { userTable } from "./userSchema";
import { productsTable } from "./productSchema";
import z from "zod";

export const orderTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 255 }).notNull().default("New"),
  userId: integer()
    .references(() => userTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => orderTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = createInsertSchema(orderTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

export const interOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  orderId: true,
});

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(interOrderItemSchema),
});

export const updateOrderSchema = createInsertSchema(orderTable).pick({
  status: true,
});
