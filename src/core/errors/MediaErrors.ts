import { DomainErrors } from "./DomainErrors";

export namespace MediaError {
  export class NotFound extends DomainErrors {
    constructor() {
      super("MEDIA_NOT_FOUND");
    }
  }
}
