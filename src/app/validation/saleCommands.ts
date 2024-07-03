import { z } from "zod";

export const saleCreateSchema = z.object({
  productInfos: z.any(),
});

type SaleCreateSchema = z.infer<typeof saleCreateSchema>;

export class SaleCreateCommand {
  static validateSaleCreate(body: any): SaleCreateSchema {
    const validation = saleCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const saleUpdateSchema = z.object({
  newTotalPrice: z.number(),
});

type SaleUpdateSchema = z.infer<typeof saleUpdateSchema>;

export class SaleUpdateCommand {
  static validateSaleUpdate(body: any): SaleUpdateSchema {
    const validation = saleUpdateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
