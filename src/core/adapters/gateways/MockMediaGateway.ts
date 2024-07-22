import { MediaGateway } from "../../gateways/MediaGateway";

export class MockMediaGateway implements MediaGateway {
  /*async*/ upload(file: Buffer, fileName: string, mimeType: string): Promise<string> {
    return Promise.resolve("http://toto.com");
  }
}
