import { z } from "zod";

export const storeCreateSchema = z.object({
  name: z.string(),
  city: z.string(),
  turnover: z.number(),
  frequentation: z.number(),
});

type StoreCreateSchema = z.infer<typeof storeCreateSchema>;

export class StoreCreateCommand {
  static validateStoreCreate(body: any): StoreCreateSchema {
    const validation = storeCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const storeUpdateSchema = z.object({
  id: z.string(),
  newPriceReduction: z.number(),
});

type StoreUpdateSchema = z.infer<typeof storeUpdateSchema>;

export class StoreUpdateCommand {
  static validateStoreUpdate(body: any): StoreUpdateSchema {
    const validation = storeUpdateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
