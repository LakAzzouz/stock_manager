import { Media } from "../../../core/entities/Media";
import { MediaModel } from "../models/MediaModel";
import { Mapper } from "./Mapper";

export class SqlMediaMapper implements Mapper<MediaModel, Media> {
  toDomain(raw: MediaModel): Media {
    const media = new Media({
      id: raw.id,
      entityId: raw.entity_id,
      url: raw.url,
      entityType: raw.entity_type,
      mimeType: raw.mime_type,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return media;
  }

  fromDomain(data: Media): MediaModel {
    const mediaModel: MediaModel = {
      id: data.props.id,
      entity_id: data.props.entityId,
      url: data.props.url,
      entity_type: data.props.entityType,
      mime_type: data.props.mimeType,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return mediaModel;
  }
}
