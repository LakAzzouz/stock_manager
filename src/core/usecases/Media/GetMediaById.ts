import { Media } from "../../entities/Media";
import { MediaError } from "../../errors/MediaErrors";
import { MediaRepository } from "../../repositories/MediaRepository";
import { Usecases } from "../Usecase";

type GetMediaByIdInput = {
  id: string;
};

export class GetMediaById implements Usecases<GetMediaByIdInput, Promise<Media>>{
  constructor(private readonly _mediaRepository: MediaRepository) {}

  async execute(input: GetMediaByIdInput): Promise<Media> {
    const { id } = input;

    const media = await this._mediaRepository.getById(id);

    if (!media) {
      throw new MediaError.NotFound();
    }

    return media;
  }
}
