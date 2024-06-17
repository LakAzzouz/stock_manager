import { DomainErrors } from "./DomainErrors";

export namespace ProductErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("PRODUCT_NOT_FOUND");
    }
  }

  export class SizeErrors extends DomainErrors {
    constructor() {
      super("SIZE_MUST_BE_BETWEEN_36_AND_49");
    }
  }
}
