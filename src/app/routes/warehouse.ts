import express from "express";
import { CreateWarehouse } from "../../core/usecases/Warehouse/CreateWarehouse";
import { InMemoryWarehouseRepository } from "../../core/adapters/repositories/InMemoryWarehouseRepository";
import { Warehouse } from "../../core/entities/Warehouse";
import { GetWarehouseById } from "../../core/usecases/Warehouse/GetWarehouseById";
import { GetWarehouseByManagerId } from "../../core/usecases/Warehouse/GetWarehouseByManagerId";
import { UpdateWarehouse } from "../../core/usecases/Warehouse/UpdateWarehouse";
import { DeleteWarehouse } from "../../core/usecases/Warehouse/DeleteWarehouse";
import { WarehouseCreateCommand, WarehouseUpdateCommand } from "../validation/warehouseCommands";

export const warehouseRouter = express.Router();

const warehouseDb = new Map<string, Warehouse>();

const warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);

const createWarehouse = new CreateWarehouse(warehouseRepository);
const getWarehouseById = new GetWarehouseById(warehouseRepository);
const getWarehouseByManagerId = new GetWarehouseByManagerId(warehouseRepository);
const updateWarehouse = new UpdateWarehouse(warehouseRepository);
const deleteWarehouse = new DeleteWarehouse(warehouseRepository);

warehouseRouter.post("/", async (req: express.Request, res: express.Response) => {
    try {
      const { city, numberOfEmployees } = WarehouseCreateCommand.validateWarehouseCreate(req.body);

      const warehouse = await createWarehouse.execute({
        city,
        numberOfEmployees,
      });

      const result = {
        id: warehouse.props.id,
        city,
        managerId: warehouse.props.managerId,
        numberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const warehouse = await getWarehouseById.execute({
        id,
      });

      const result = {
        id,
        city: warehouse.props.city,
        managerId: warehouse.props.managerId,
        numberOfEmployees: warehouse.props.numberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.get("/:managerId", async (req: express.Request, res: express.Response) => {
    try {
      const managerId = req.params.managerId;

      const warehouse = await getWarehouseByManagerId.execute({
        managerId,
      });

      const result = {
        id: warehouse.props.id,
        city: warehouse.props.city,
        managerId,
        numberOfEmployees: warehouse.props.numberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const { newNumberOfEmployees } = WarehouseUpdateCommand.validateWarehouseUpdate(req.body);
      const id = req.params.id;

      const warehouse = await updateWarehouse.execute({
        id,
        newNumberOfEmployees,
      });

      const result = {
        id,
        city: warehouse.props.city,
        managerId: warehouse.props.managerId,
        numberOfEmployees: newNumberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const warehouse = await deleteWarehouse.execute({
        id,
      });

      const result = "Warehouse deleted";

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);
