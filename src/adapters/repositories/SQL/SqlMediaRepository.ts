import { Knex } from "knex";
import { MediaRepository } from "../../../core/repositories/MediaRepository";
import { SqlMediaMapper } from "../mappers/SqlMediaMapper";
import { Media } from "../../../core/entities/Media";

export class SqlMediaRepository implements MediaRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _mediaMapper: SqlMediaMapper
  ) {}

  async save(media: Media): Promise<void> {
    const mediaModel = this._mediaMapper.fromDomain(media);
    await this._knex.raw(
      `INSERT INTO medias (id, entity_id, url, entity_type, mime_type, created_at, updated_at)
        VALUES (:id, :entity_id, :url, :entity_type, :mime_type, :created_at, :updated_at)`,
      {
        id: mediaModel.id,
        entity_id: mediaModel.entity_id,
        url: mediaModel.url,
        entity_type: mediaModel.entity_type,
        mime_type: mediaModel.mime_type,
        created_at: mediaModel.created_at,
        updated_at: mediaModel.updated_at,
      }
    );
  }

  async getById(id: string): Promise<Media | null> {
    const mediaModel = await this._knex.raw(
      `SELECT *
        FROM medias
        WHERE id = :id`,
      {
        id: id,
      }
    );

    const media = this._mediaMapper.toDomain(mediaModel[0][0]);

    return media;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(
      `DELETE FROM
        stores WHERE id = :id`,
      {
        id: id,
      }
    );
  }
}
