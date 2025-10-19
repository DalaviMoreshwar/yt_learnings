import { Router } from "express";

// products endpoints
const productRoutes = Router();

productRoutes.get("/", (req, res) => {
  res.json({ message: "the list of products." });
});

productRoutes.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.json({ message: "a product." });
});

productRoutes.post("/", (req, res) => {
  res.status(201).json({ message: "new product created!" });
});

export default productRoutes;
