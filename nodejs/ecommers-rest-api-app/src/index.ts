import express, { Router } from "express";
import productRoutes from "./routes/products";

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "HELLO" });
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`server initiated at port ${PORT}`);
});
