import { MediaGateway } from "../../core/gateways/MediaGateway";
import { Storage } from "firebase-admin/storage";

export class FirebaseStorageGateway implements MediaGateway {
  constructor(private readonly firebaseStorage: Storage) {}

  async upload(file: Buffer, fileName: string, mimeType: string): Promise<string> {
    const uniqueFile = this.firebaseStorage
      .bucket("gestionnaire-de-stock.appspot.com")
      .file(`/uploads/${fileName}`);

    await uniqueFile.save(file, {
      metadata: {
        contentType: mimeType,
      },
    });

    await uniqueFile.makePublic();

    return uniqueFile.publicUrl();
  }
}
