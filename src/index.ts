import { productRouter } from "./app/routes/product";
import { orderRouter } from "./app/routes/order";
import { saleRouter } from "./app/routes/sale";
import { storeRouter } from "./app/routes/store";
import { warehouseRouter } from "./app/routes/warehouse";
import { stockRouter } from "./app/routes/stock";
import { userRouter } from "./app/routes/user";
import { rateLimit } from 'express-rate-limit'
import { mediaRouteur } from "./app/routes/media";

import express from "express";
import morgan from "morgan";
import knex from "knex";

import "../src/messages/EventEmitter";
import "../src/app/handlers/userCreatedHandler";
import "../src/app/handlers/productCreatedHandler";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});

export const db = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "stock_manager",
  },
});

console.log("Connection db ok");

app.use(limiter);
app.use(express.json());
app.use(morgan('combined'));

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/sales", saleRouter);
app.use("/stocks", stockRouter);
app.use("/stores", storeRouter);
app.use("/warehouses", warehouseRouter);
app.use("/medias", mediaRouteur)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
