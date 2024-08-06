export type ProductCreatedProperties = {
  productId: string;
};

export class ProductCreated {
  props: ProductCreatedProperties;

  constructor(productEventProperties: ProductCreatedProperties) {
    this.props = productEventProperties;
  }
}
