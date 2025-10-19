import express from "express";
import productRoutes from "./routes/products";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`server initiated at port ${PORT}`);
});
