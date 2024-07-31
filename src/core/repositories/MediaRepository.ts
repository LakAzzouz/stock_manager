import { Media } from "../entities/Media";

export interface MediaRepository {
  save(media: Media): Promise<void>;

  getById(id: string): Promise<Media | null>;

  delete(id: string): Promise<void>;
}
