import { ENTITYTYPE } from "../../../core/types/EntityType";
import { MIMETYPE } from "../../../core/types/MimeType";

export interface MediaModel {
  id: string;
  entity_id: string;
  url: string;
  entity_type: ENTITYTYPE;
  mime_type: MIMETYPE;
  created_at: Date;
  updated_at?: Date;
}
