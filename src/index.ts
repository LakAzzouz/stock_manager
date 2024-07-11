import { productRouter } from "./app/routes/product";
import { orderRouter } from "./app/routes/order";
import { saleRouter } from "./app/routes/sale";
import { storeRouter } from "./app/routes/store";
import { warehouseRouter } from "./app/routes/warehouse";
import { stockRouter } from "./app/routes/stock";

import "dotenv/config";
import express from "express";
import { userRouter } from "./app/routes/user";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/sales", saleRouter);
app.use("/stocks", stockRouter);
app.use("/stores", storeRouter);
app.use("/warehouses", warehouseRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
