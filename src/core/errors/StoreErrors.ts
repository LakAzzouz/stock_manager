import { DomainErrors } from "./DomainErrors";

export namespace StoreErrors {
  export class NotFound extends DomainErrors {
    constructor() {
      super("STORE_NOT_FOUND");
    }
  }
}
