import {
  doublePrecision,
  integer,
  pgTable,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  price: doublePrecision().notNull(),
  description: text(),
});

export const createProductSchema = createInsertSchema(productsTable);
export const updateProductSchema = createInsertSchema(productsTable).partial();
