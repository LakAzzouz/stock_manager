import { Media } from "../../entities/Media";
import { MediaError } from "../../errors/MediaErrors";
import { MediaRepository } from "../../repositories/MediaRepository";

export class InMemoryMediaRepository implements MediaRepository {
  map: Map<string, Media>;

  constructor(map: Map<string, Media>) {
    this.map = map;
  }

  async save(media: Media): Promise<void> {
    this.map.set(media.props.id, media);
    return;
  }

  async getById(id: string): Promise<Media | null> {
    const media = this.map.get(id);
    if (!media) {
      return null;
    }
    return media;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
