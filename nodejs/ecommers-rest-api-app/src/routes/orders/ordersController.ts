import { Request, response, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "./../../db/index.js";
import { orderItemsTable, orderTable } from "../../db/orderSchema.js";

export async function createOrder(req: Request, res: Response) {
  try {
    const { order, items } = req.cleanBody;
    const userId = req.userId;
    console.log(items);

    if (!userId) {
      res.status(400).json({ message: "Invalid user!" });
      return;
    }

    const [newOrder] = await db
      .insert(orderTable)
      .values({ userId: Number(userId) })
      .returning();

    //   TODO: validate products ids and take their price from db

    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.json({ ...newOrder, items: newOrderItems });
  } catch (error) {
    res.status(400).json({ message: "Invalid order!" });
  }
}

// if req.role is admin, return all orders
// if req.role is seller, return orders by sellerId
// else, return orders by userId
export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(orderTable);
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const orderWithItems = await db
      .select()
      .from(orderTable)
      .where(eq(orderTable.id, id))
      .leftJoin(orderItemsTable, eq(orderTable.id, orderItemsTable.orderId));

    if (!orderWithItems) {
      res.status(404).send("Order not found!");
    }

    const orderItemList = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((oi) => oi.order_items),
    };

    res.status(200).json(orderItemList);
  } catch (error: any) {
    res.status(500).send(error);
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [updatedOrder] = await db
      .update(orderTable)
      .set(req.cleanBody)
      .where(eq(orderTable.id, parseInt(id)))
      .returning();

    console.log(updatedOrder);

    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res
        .status(200)
        .json({ message: "Order is updated!", details: updatedOrder });
    }
  } catch (error: any) {
    res.status(500).send(error);
  }
}
