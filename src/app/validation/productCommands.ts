import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string(),
  productType: z.any(),
  price: z.number(),
  size: z.number(),
});

type ProductCreateSchema = z.infer<typeof productCreateSchema>;

export class ProductCreateCommand {
  static validateProductCreate(body: any): ProductCreateSchema {
    const validation = productCreateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}

export const productUpdateSchema = z.object({
  newPrice: z.number(),
});

type ProductUpdateSchema = z.infer<typeof productUpdateSchema>;

export class ProductUpdateCommand {
  static updateProduct(body: any): ProductUpdateSchema {
    const validation = productUpdateSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
