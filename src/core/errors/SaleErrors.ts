import { DomainErrors } from "./DomainErrors";

export namespace SaleErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("SALE_NOT_FOUND");
    }
  }
}
