import express from "express";
import { Stock } from "../../core/entities/Stock";
import { InMemoryStockRepository } from "../../core/adapters/repositories/InMemoryStockRepository";
import { CreateStockData } from "../../core/usecases/Stock/CreateStockData";
import { Store } from "../../core/entities/Store";
import { Warehouse } from "../../core/entities/Warehouse";
import { InMemoryStoreRepository } from "../../core/adapters/repositories/InMemoryStoreRepository";
import { InMemoryWarehouseRepository } from "../../core/adapters/repositories/InMemoryWarehouseRepository";
import { GetStockById } from "../../core/usecases/Stock/GetStockById";
import { DeleteStock } from "../../core/usecases/Stock/DeleteStock";
import { InitiateStock } from "../../core/usecases/Stock/InitiateStock";
import { StockCreateCommand, StockInitiateCommand } from "../validation/stockCommands";
import { InMemoryStockDataRepository } from "../../core/adapters/repositories/InMemoryStockDataRepository";
import { StockData } from "../../core/types/StockData";

export const stockRouter = express.Router();

const stockDb = new Map<string, Stock>();
const storeDb = new Map<string, Store>();
const warehouseDb = new Map<string, Warehouse>();
const stockDataDb = new Map<string, StockData>();

const stockRepository = new InMemoryStockRepository(stockDb);
const storeRepository = new InMemoryStoreRepository(storeDb);
const warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
const stockDataRepository = new InMemoryStockDataRepository(stockDataDb);

const initiateStock = new InitiateStock(stockRepository);
const createStock = new CreateStockData(stockRepository, stockDataRepository);
const getStockById = new GetStockById(stockRepository);
const deleteStock = new DeleteStock(stockRepository);

stockRouter.post("/initiate", async (req: express.Request, res: express.Response) => {
    try {
      const { locationId, stockDatas, type } = StockInitiateCommand.validateStockInitiate(req.body);

      const stock = await initiateStock.execute({
        locationId,
        stockDatas,
        type
      });

      const result = {
        id: stock.props.id,
        locationId,
        type,
        stockDatas,
        createdAt: stock.props.createdAt,
      };

      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);

// stockRouter.post("/", async (req: express.Request, res: express.Response) => {
//   try {
//     const { productId } = StockCreateCommand.validateStockCreate(req.body);

//     const stock = await createStock.execute({
//       productId,
//     });

//     const result = {
//       id: stock.
//       productId,
//       stockByLocation: stock,
//       createdAt: stock.props.createdAt,
//     };

//     res.status(201).send(result);
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(400).send(error.message);
//     }
//   }
// });

stockRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    const stock = await getStockById.execute({
      id,
    });

    const result = {
      id,
      productId: stock.props.locationId,
      stockByLocation: stock.props.stockDatas,
      createdAt: stock.props.createdAt,
    };

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

stockRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const stock = await deleteStock.execute({
        id,
      });

      const result = "Stock deleted";

      res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);
