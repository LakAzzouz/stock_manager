import { ProductErrors } from "../errors/ProductErrors";

export class Size {
  static sizeLength(size: number): number {
    if (size < 36 || size > 49) {
      throw new ProductErrors.SizeErrors();
    }
    return size;
  }
}
