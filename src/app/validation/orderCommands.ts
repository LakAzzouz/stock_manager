import { z } from "zod";

export const orderCreateSchema = z.object({
  locationId: z.string(),
  productInfos: z.any(),
});

type OrderCreateSchema = z.infer<typeof orderCreateSchema>;

export class OrderCreateCommand {
  static validateOrderCreate(body: any): OrderCreateSchema {
    const validation = orderCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const orderUpdateSchema = z.object({
  newDateOfArrival: z.union([z.date(), z.string().transform((str) => new Date(str))])
});

type OrderUpdateSchema = z.infer<typeof orderUpdateSchema>;

export class OrderUpdateCommand {
  static validateOrderUpdate(body: any): OrderUpdateSchema {
    const validation = orderUpdateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
