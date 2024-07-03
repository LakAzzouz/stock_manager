import { DomainErrors } from "./DomainErrors";

export namespace WarehouseErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("WAREHOUSE_NOT_FOUND");
    }
  }
}
