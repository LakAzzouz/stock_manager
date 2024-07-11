import express from "express";
import { CreateStore } from "../../core/usecases/Store/CreateStore";
import { InMemoryStoreRepository } from "../../core/adapters/repositories/InMemoryStoreRepository";
import { Store } from "../../core/entities/Store";
import { GetStoreById } from "../../core/usecases/Store/GetStoreById";
import { GetStoreByCity } from "../../core/usecases/Store/GetStoreByCity";
import { UpdateStore } from "../../core/usecases/Store/UpdateStore";
import { DeleteStore } from "../../core/usecases/Store/DeleteStore";
import { StoreCreateCommand, StoreUpdateCommand } from "../validation/storeCommands";
import multer from 'multer';

export const storeRouter = express.Router();

const storeDb = new Map<string, Store>();

const storeRepository = new InMemoryStoreRepository(storeDb);

const createStore = new CreateStore(storeRepository);
const getStoreById = new GetStoreById(storeRepository);
const getStoreByCity = new GetStoreByCity(storeRepository);
const updateStore = new UpdateStore(storeRepository);
const deleteStore = new DeleteStore(storeRepository);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.split(" ").join("_")}`);
  },
});

const upload = multer({ storage: storage });

storeRouter.post("/", upload.single("store"), async (req: express.Request, res: express.Response) => {
  try {
    const body = JSON.parse(req.body.body);
    const { name, city, turnover, frequentation } = StoreCreateCommand.validateStoreCreate(body);

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
      priceReduction: store.props.priceReduction,
      createdAt: store.props.createdAt,
      image: req.file?.filename ? "Image is uploaded" : "Image not found"
    };

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

storeRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    const store = await getStoreById.execute({
      id,
    });

    const result = {
      id,
      name: store.props.name,
      city: store.props.city,
      turnover: store.props.turnover,
      frequentation: store.props.frequentation,
      priceReduction: store.props.priceReduction,
      createdAt: store.props.createdAt,
    };

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
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

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
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

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
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

      const result = "Store deleted";

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);
