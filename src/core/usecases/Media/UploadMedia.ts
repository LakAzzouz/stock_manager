import { Media } from "../../entities/Media";
import { MediaGateway } from "../../gateways/MediaGateway";
import { MediaRepository } from "../../repositories/MediaRepository";
import { ENTITYTYPE } from "../../types/EntityType";
import { MIMETYPE } from "../../types/MimeType";
import { Usecases } from "../Usecase";

type UploadMediaInput = {
  url: string;
  entityId: string;
  entityType: ENTITYTYPE;
  mimeType: MIMETYPE;
  file?: Buffer;
  fileName?: string;
};

export class UploadMedia implements Usecases<UploadMediaInput, Promise<Media>> {
  constructor(
    private readonly _mediaGateway: MediaGateway,
    private readonly _mediaRepository: MediaRepository
  ) {}

  async execute(input: UploadMediaInput): Promise<Media> {
    const { entityId, url, entityType, mimeType, file, fileName } = input;

    const media = Media.create({
      entityId,
      url,
      entityType,
      mimeType,
    });

    let mediaUrl;

    if (file && fileName && mimeType) {
      mediaUrl = await this._mediaGateway.upload(file, fileName, mimeType);
    }

    await this._mediaRepository.save(media);

    return media;
  }
}
