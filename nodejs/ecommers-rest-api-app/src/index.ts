import express from "express";

const PORT = 2301;
const app = express();

app.use("/", (req, res) => {
  res.json({ message: "HELLO" });
});

app.listen(PORT, () => {
  console.log(`server initiated at port ${PORT}`);
});
