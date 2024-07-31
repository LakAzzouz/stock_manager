import { MediaError } from "../../errors/MediaErrors";
import { MediaRepository } from "../../repositories/MediaRepository";
import { Usecases } from "../Usecase";

type DeleteMediaInput = {
  id: string;
};

export class DeleteMedia implements Usecases<DeleteMediaInput, Promise<void>> {
  constructor(private readonly _mediaRepository: MediaRepository) {}

  async execute(input: DeleteMediaInput): Promise<void> {
    const { id } = input;

    const media = await this._mediaRepository.getById(id);

    if (!media) {
      throw new MediaError.NotFound();
    }

    await this._mediaRepository.delete(media.props.id);

    return;
  }
}
