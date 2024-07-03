import { z } from "zod";

export const stockInitiateSchema = z.object({
  productId: z.string(),
  stockByLocation: z.any(),
});

type StockInitiateSchema = z.infer<typeof stockInitiateSchema>;

export class StockInitiateCommand {
  static validateStockInitiate(body: any): StockInitiateSchema {
    const validation = stockInitiateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const stockCreateSchema = z.object({
  productId: z.string(),
});

type StockCreateSchema = z.infer<typeof stockCreateSchema>;

export class StockCreateCommand {
  static validateStockCreate(body: any): StockCreateSchema {
    const validation = stockCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
