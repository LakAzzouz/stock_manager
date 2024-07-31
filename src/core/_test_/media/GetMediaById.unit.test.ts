import { MockMediaGateway } from "../../adapters/gateways/MockMediaGateway";
import { InMemoryMediaRepository } from "../../adapters/repositories/InMemoryMediaRepository";
import { Media } from "../../entities/Media";
import { MediaError } from "../../errors/MediaErrors";
import { MediaGateway } from "../../gateways/MediaGateway";
import { MediaRepository } from "../../repositories/MediaRepository";
import { ENTITYTYPE } from "../../types/EntityType";
import { MIMETYPE } from "../../types/MimeType";
import { GetMediaById } from "../../usecases/Media/GetMediaById";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Get media by id", () => {
  let mediaRepository: MediaRepository;
  let mediaGateway: MediaGateway;
  let getMediaById: GetMediaById;
  const mediaDb = new Map<string, Media>();
  const id = "media_id";
  const entityId = "entity_id";
  const entityType = ENTITYTYPE.PRODUCT;
  const mimeType = MIMETYPE.PNG;
  const url = "";
  const createdAt = new Date();

  beforeAll(async () => {
    mediaRepository = new InMemoryMediaRepository(mediaDb);
    mediaGateway = new MockMediaGateway();
    getMediaById = new GetMediaById(mediaRepository);
  });

  afterEach(async () => {
    mediaDb.clear();
  });

  it("Should get media by id", async () => {
    const media = DataBuilders.generateMedia({
      id,
      entityId,
      url,
      entityType,
      mimeType,
      createdAt,
    });

    mediaDb.set(media.props.id, media);

    const result = await getMediaById.execute({
      id: media.props.id,
    });

    expect(result).toEqual(media);
  });

  it("Should throw an error because media is not found", async () => {
    const result = getMediaById.execute({
      id: "wrong_id"
    });

    await expect(result).rejects.toThrow(MediaError.NotFound);
  })
});
