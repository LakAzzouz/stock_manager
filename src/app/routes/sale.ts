import express from "express";
import { CreateSale } from "../../core/usecases/Sale/CreateSale";
import { InMemorySaleRepository } from "../../core/_test_/adapters/InMemorySaleRepository";
import { Sale } from "../../core/entities/Sale";
import { Product } from "../../core/entities/Product";
import { InMemoryProductRepository } from "../../core/_test_/adapters/InMemoryProductRepository";
import { GetSaleById } from "../../core/usecases/Sale/GetSaleById";
import { UpdateSale } from "../../core/usecases/Sale/UpdateSale";
import { DeleteSale } from "../../core/usecases/Sale/DeleteSale";
import { SaleCreateCommand, SaleUpdateCommand } from "../validation/saleCommands";

export const saleRouter = express.Router();

const saleDb = new Map<string, Sale>();
const productDb = new Map<string, Product>();

const saleRepository = new InMemorySaleRepository(saleDb);
const productRepository = new InMemoryProductRepository(productDb);

const createSale = new CreateSale(saleRepository, productRepository);
const getSaleById = new GetSaleById(saleRepository);
const updateSale = new UpdateSale(saleRepository);
const deleteSale = new DeleteSale(saleRepository);

saleRouter.post("/", async (req: express.Request, res: express.Response) => {
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

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
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

    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
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
        updatedAt: sale.props.updatedAt
      };

      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
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

      const result = "Sale deleted";

      res.status(202).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  }
);
