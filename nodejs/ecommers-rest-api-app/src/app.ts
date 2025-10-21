import express, { urlencoded } from "express";
import productRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";

const PORT = process.env.PORT;
const app = express();

// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
app.use(urlencoded({ extended: false }));
app.use(express.json());

app.use("/products", productRoutes);

app.use("/auth", authRoutes);

app.use("/orders", ordersRoutes);

app.listen(PORT, () => {
  console.log(`server initiated at port ${PORT}`);
});
