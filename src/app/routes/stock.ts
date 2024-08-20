import express from "express";

import { CreateStockData } from "../../core/usecases/Stock/CreateStockData";
import { GetStockById } from "../../core/usecases/Stock/GetStockById";
import { DeleteStock } from "../../core/usecases/Stock/DeleteStock";
import { InitiateStock } from "../../core/usecases/Stock/InitiateStock";
import { StockCreateCommand, StockInitiateCommand } from "../validation/stockCommands";
import { SqlStockMapper } from "../../adapters/repositories/mappers/SqlStockMapper";
import { SqlStockRepository } from "../../adapters/repositories/SQL/SqlStockRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { InMemoryStockDataRepository } from "../../core/adapters/repositories/InMemoryStockDataRepository";
import { StockData } from "../../core/entities/StockData";
import { Auth } from "../../adapters/middlewares/auth";

export const stockRouter = express.Router();

const stockMapper = new SqlStockMapper();
const sqlStockRepository = new SqlStockRepository(dbTest, stockMapper);
const stockDataDb = new Map<string, StockData>();
const stockDataRepository = new InMemoryStockDataRepository(stockDataDb)

const initiateStock = new InitiateStock(sqlStockRepository);
const createStock = new CreateStockData(sqlStockRepository, stockDataRepository);
const getStockById = new GetStockById(sqlStockRepository);
const deleteStock = new DeleteStock(sqlStockRepository);

stockRouter.use(Auth);
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

      return res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

stockRouter.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { productId } = StockCreateCommand.validateStockCreate(req.body);

    await createStock.execute({
      productId
    });

    const result = {
      productId,
    }

    return res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

stockRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const stock = await getStockById.execute({
      id: req.params.id,
    });

    const result = {
      id: stock.props.id,
      productId: stock.props.locationId,
      stockByLocation: stock.props.stockDatas,
      createdAt: stock.props.createdAt,
    };

    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

stockRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      await deleteStock.execute({
        id: req.params.id,
      });

      const result = "STOCK_DELETED";

      return res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
