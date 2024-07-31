import { v4 } from "uuid";
import { ENTITYTYPE } from "../types/EntityType";
import { MIMETYPE } from "../types/MimeType";

export type MediaProperties = {
  id: string;
  entityId: string;
  url: string;
  entityType: ENTITYTYPE;
  mimeType: MIMETYPE;
  createdAt: Date;
  updatedAt?: Date;
};

export class Media {
  props: MediaProperties;

  constructor(mediaProperties: MediaProperties) {
    this.props = mediaProperties;
  }

  static create(props: {entityId: string, url: string, entityType: ENTITYTYPE, mimeType: MIMETYPE}): Media {
    const media = new Media({
        id: v4(),
        entityId: props.entityId,
        url: props.url,
        entityType: props.entityType,
        mimeType: props.mimeType,
        createdAt: new Date()
    }) 
    return media;
  }
}
