import { DomainErrors } from "./DomainErrors";

export namespace StockErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("STOCK_NOT_FOUND");
    }
  }

  export class AlReadyExists extends DomainErrors {
    constructor() {
      super("STOCK_ALREADY_EXISTS")
    }
  }

  export class NeedStoreOrWarehouseId extends DomainErrors {
    constructor () {
      super("NEED_STORE_OR_WAREHOUSE_ID")
    }
  }
}
