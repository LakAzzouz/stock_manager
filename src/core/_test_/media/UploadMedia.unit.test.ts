import { MockMediaGateway } from "../../adapters/gateways/MockMediaGateway";
import { InMemoryMediaRepository } from "../../adapters/repositories/InMemoryMediaRepository";
import { Media } from "../../entities/Media";
import { MediaGateway } from "../../gateways/MediaGateway";
import { MediaRepository } from "../../repositories/MediaRepository";
import { ENTITYTYPE } from "../../types/EntityType";
import { MIMETYPE } from "../../types/MimeType";
import { UploadMedia } from "../../usecases/Media/UploadMedia";

describe("Unit - Upload Image", () => {
  let mediaRepository: MediaRepository;
  let mediaGateway: MediaGateway;
  let uploadMedia: UploadMedia;
  const mediaDb = new Map<string, Media>();
  const entityId ="entity_id";
  const entityType = ENTITYTYPE.PRODUCT;
  const mimeType = MIMETYPE.PNG;
  const url = "";
  const file = Buffer.from("");
  const fileName = "Air Jordan";

  beforeAll(async () => {
    mediaRepository = new InMemoryMediaRepository(mediaDb);
    mediaGateway = new MockMediaGateway();
    uploadMedia = new UploadMedia(mediaGateway, mediaRepository);
  });

  afterEach(async () => {
    mediaDb.clear();
  });

  it("Should upload a media", async () => {
    const result = await uploadMedia.execute({
      entityId,
      url,
      entityType,
      mimeType,
      file,
      fileName,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.entityId).toEqual(entityId);
    expect(result.props.url).toEqual(url);
    expect(result.props.entityType).toEqual(entityType);
    expect(result.props.mimeType).toEqual(mimeType);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });
});
