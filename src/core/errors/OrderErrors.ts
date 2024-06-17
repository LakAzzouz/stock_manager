import { DomainErrors } from "./DomainErrors";

export namespace OrderErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("ORDER_NOT_FOUND");
    }
  }
}
