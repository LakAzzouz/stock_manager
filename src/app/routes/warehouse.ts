import express from "express";

import { CreateWarehouse } from "../../core/usecases/Warehouse/CreateWarehouse";
import { GetWarehouseById } from "../../core/usecases/Warehouse/GetWarehouseById";
import { GetWarehouseByManagerId } from "../../core/usecases/Warehouse/GetWarehouseByManagerId";
import { UpdateWarehouse } from "../../core/usecases/Warehouse/UpdateWarehouse";
import { DeleteWarehouse } from "../../core/usecases/Warehouse/DeleteWarehouse";
import { WarehouseCreateCommand, WarehouseUpdateCommand } from "../validation/warehouseCommands";
import { SqlWarehouseMapper } from "../../adapters/repositories/mappers/SqlWarehouseMapper";
import { SqlWarehouseRepository } from "../../adapters/repositories/SQL/SqlWarehouseRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { Auth } from "../../adapters/middlewares/auth";

export const warehouseRouter = express.Router();

const warehouseMapper = new SqlWarehouseMapper();
const sqlWarehouseRepository = new SqlWarehouseRepository(dbTest, warehouseMapper)

const createWarehouse = new CreateWarehouse(sqlWarehouseRepository);
const getWarehouseById = new GetWarehouseById(sqlWarehouseRepository);
const getWarehouseByManagerId = new GetWarehouseByManagerId(sqlWarehouseRepository);
const updateWarehouse = new UpdateWarehouse(sqlWarehouseRepository);
const deleteWarehouse = new DeleteWarehouse(sqlWarehouseRepository);

warehouseRouter.use(Auth);
warehouseRouter.post("/create", async (req: express.Request, res: express.Response) => {
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

      return res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const warehouse = await getWarehouseById.execute({
        id: req.params.id
      });

      const result = {
        id: warehouse.props.id,
        city: warehouse.props.city,
        managerId: warehouse.props.managerId,
        numberOfEmployees: warehouse.props.numberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.get("/by_manager_id/:managerId", async (req: express.Request, res: express.Response) => {
    try {
      const warehouse = await getWarehouseByManagerId.execute({
        managerId: req.params.managerId
      });

      const result = {
        id: warehouse.props.id,
        city: warehouse.props.city,
        managerId: warehouse.props.managerId,
        numberOfEmployees: warehouse.props.numberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const { newNumberOfEmployees } = WarehouseUpdateCommand.validateWarehouseUpdate(req.body);

      const warehouse = await updateWarehouse.execute({
        id: req.params.id,
        newNumberOfEmployees,
      });

      const result = {
        id: warehouse.props.id,
        city: warehouse.props.city,
        managerId: warehouse.props.managerId,
        numberOfEmployees: newNumberOfEmployees,
        createdAt: warehouse.props.createdAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

warehouseRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      await deleteWarehouse.execute({
        id: req.params.id,
      });

      const result = "WAREHOUSE_DELETED";

      return res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
