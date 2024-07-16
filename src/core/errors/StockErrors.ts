import { DomainErrors } from "./DomainErrors";

export namespace StockErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("STOCK_NOT_FOUND");
    }
  }
}
