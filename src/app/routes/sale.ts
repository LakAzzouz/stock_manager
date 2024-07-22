import express from "express";

import { CreateSale } from "../../core/usecases/Sale/CreateSale";
import { GetSaleById } from "../../core/usecases/Sale/GetSaleById";
import { UpdateSale } from "../../core/usecases/Sale/UpdateSale";
import { DeleteSale } from "../../core/usecases/Sale/DeleteSale";
import {SaleCreateCommand, SaleUpdateCommand} from "../validation/saleCommands";
import { SqlSaleMapper } from "../../adapters/repositories/mappers/SqlSaleMapper";
import { SqlSaleRepository } from "../../adapters/repositories/SQL/SqlSaleRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlProductMapper } from "../../adapters/repositories/mappers/SqlProductMapper";
import { SqlProductRepository } from "../../adapters/repositories/SQL/SqlProductRepository";
import { Auth } from "../../adapters/middlewares/auth";

export const saleRouter = express.Router();

const productMapper = new SqlProductMapper();
const sqlProductRepository = new SqlProductRepository(dbTest, productMapper);

const saleMapper = new SqlSaleMapper();
const sqlSaleRepository = new SqlSaleRepository(dbTest, saleMapper);

const createSale = new CreateSale(sqlSaleRepository, sqlProductRepository);
const getSaleById = new GetSaleById(sqlSaleRepository);
const updateSale = new UpdateSale(sqlSaleRepository);
const deleteSale = new DeleteSale(sqlSaleRepository);

saleRouter.use(Auth);
saleRouter.post("/create", async (req: express.Request, res: express.Response) => {
  try {
    const { productInfos } = SaleCreateCommand.validateSaleCreate(req.body);

    const sale = await createSale.execute({
      productInfos,
    });

    const result = {
      id: sale.props.id,
      productInfos,
      totalPrice: sale.props.totalPrice,
      saleDate: sale.props.saleDate,
    };

    return res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

saleRouter.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;

    const sale = await getSaleById.execute({
      id,
    });

    const result = {
      id,
      productInfos: sale.props.productInfos,
      totalPrice: sale.props.totalPrice,
      saleDate: sale.props.saleDate,
    };

    return res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send(error.message);
    }
  }
});

saleRouter.patch("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const { newTotalPrice } = SaleUpdateCommand.validateSaleUpdate(req.body);
      const id = req.params.id;

      const sale = await updateSale.execute({
        id,
        newTotalPrice,
      });

      const result = {
        id,
        productInfos: sale.props.productInfos,
        totalPrice: newTotalPrice,
        saleDate: sale.props.saleDate,
        updatedAt: sale.props.updatedAt,
      };

      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);

saleRouter.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
      const id = req.params.id;

      const sale = await deleteSale.execute({
        id,
      });

      const result = "SALE_DELETED";

      return res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
