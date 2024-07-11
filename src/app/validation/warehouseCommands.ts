import { z } from "zod";

export const warehouseCreateSchema = z.object({
  city: z.string(),
  numberOfEmployees: z.number(),
});

type WarehouseCreateSchema = z.infer<typeof warehouseCreateSchema>;

export class WarehouseCreateCommand {
  static validateWarehouseCreate(body: any): WarehouseCreateSchema {
    const validation = warehouseCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const warehouseUpdateSchema = z.object({
  newNumberOfEmployees: z.number(),
});

type WarehouseUpdateSchema = z.infer<typeof warehouseUpdateSchema>;

export class WarehouseUpdateCommand {
  static validateWarehouseUpdate(body: any): WarehouseUpdateSchema {
    const validation = warehouseUpdateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
