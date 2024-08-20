import express from "express";

import { CreateStore } from "../../core/usecases/Store/CreateStore";
import { GetStoreById } from "../../core/usecases/Store/GetStoreById";
import { GetStoreByCity } from "../../core/usecases/Store/GetStoreByCity";
import { UpdateStore } from "../../core/usecases/Store/UpdateStore";
import { DeleteStore } from "../../core/usecases/Store/DeleteStore";
import { StoreCreateCommand, StoreUpdateCommand } from "../validation/storeCommands";
import { SqlStoreMapper } from "../../adapters/repositories/mappers/SqlStoreMapper";
import { SqlStoreRepository } from "../../adapters/repositories/SQL/SqlStoreRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { Auth } from "../../adapters/middlewares/auth";

export const storeRouter = express.Router();

const storeMapper = new SqlStoreMapper();
const sqlStoreRepository = new SqlStoreRepository(dbTest, storeMapper);

const createStore = new CreateStore(sqlStoreRepository);
const getStoreById = new GetStoreById(sqlStoreRepository);
const getStoreByCity = new GetStoreByCity(sqlStoreRepository);
const updateStore = new UpdateStore(sqlStoreRepository);
const deleteStore = new DeleteStore(sqlStoreRepository);

storeRouter.use(Auth);
storeRouter.post("/create", async (req: express.Request, res: express.Response) => {
    try {
      const { name, city, turnover, frequentation } = StoreCreateCommand.validateStoreCreate(req.body);

      const store = await createStore.execute({
        name,
        city,
        turnover,
        frequentation,
      });

      const result = {
        id: store.props.id,
        name,
        city,
        turnover,
        frequentation,
        createdAt: store.props.createdAt,
      };

      return res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
});

storeRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const store = await getStoreById.execute({
      id: req.params.id,
    });

    const result = {
      id: store.props.id,
      name: store.props.name,
      city: store.props.city,
      turnover: store.props.turnover,
      frequentation: store.props.frequentation,
      priceReduction: store.props.priceReduction,
      createdAt: store.props.createdAt,
    };

    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

storeRouter.get("/:city", async (req: express.Request, res: express.Response) => {
    try {
      const city = req.params.city;

      const store = await getStoreByCity.execute({
        city,
      });

      const result = {
        id: store.props.id,
        name: store.props.name,
        city,
        turnover: store.props.turnover,
        frequentation: store.props.frequentation,
        priceReduction: store.props.priceReduction,
        createdAt: store.props.createdAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

storeRouter.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const { newPriceReduction } = StoreUpdateCommand.validateStoreUpdate(req.body);
      const id = req.params.id;

      const store = await updateStore.execute({
        id,
        newPriceReduction,
      });

      const result = {
        id,
        name: store.props.name,
        city: store.props.city,
        turnover: store.props.turnover,
        frequentation: store.props.frequentation,
        priceReduction: newPriceReduction,
        createdAt: store.props.createdAt,
        updatedAt: store.props.updatedAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

storeRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const store = await deleteStore.execute({
        id,
      });

      const result = "STORE_DELETED";

      return res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
