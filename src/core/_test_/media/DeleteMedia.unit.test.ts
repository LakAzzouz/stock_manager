import { MockMediaGateway } from "../../adapters/gateways/MockMediaGateway";
import { InMemoryMediaRepository } from "../../adapters/repositories/InMemoryMediaRepository";
import { Media } from "../../entities/Media";
import { MediaError } from "../../errors/MediaErrors";
import { MediaGateway } from "../../gateways/MediaGateway";
import { MediaRepository } from "../../repositories/MediaRepository";
import { DeleteMedia } from "../../usecases/Media/DeleteMedia";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Delete media", () => {
  let mediaRepository: MediaRepository;
  let mediaGateway: MediaGateway;
  let deleteMedia: DeleteMedia;
  const mediaDb = new Map<string, Media>();

  beforeAll(async () => {
    mediaRepository = new InMemoryMediaRepository(mediaDb);
    mediaGateway = new MockMediaGateway();
    deleteMedia = new DeleteMedia(mediaRepository);
  });

  afterEach(async () => {
    mediaDb.clear();
  });

  it("Should delete media", async () => {
    const media = DataBuilders.generateMedia();

    mediaDb.set(media.props.id, media);

    await deleteMedia.execute({
      id: media.props.id,
    });

    const result = mediaDb.get(media.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because media is not found", async () => {
    const result = deleteMedia.execute({
      id: "wrong_id"
    });

    await expect(result).rejects.toThrow(MediaError.NotFound);
  })
});
