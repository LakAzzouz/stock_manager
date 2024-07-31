import { z } from "zod";

export const mediaUploadSchema = z.object({
  url: z.string(),
  mimeType: z.any(),
});

type MediaUploadSchema = z.infer<typeof mediaUploadSchema>;

export class MediaUploadCommand {
  static validateMediaUpload(body: any): MediaUploadSchema {
    const validation = mediaUploadSchema.safeParse(body);
    if (!validation.success) {
      throw new Error(validation.error.message);
    }
    return validation.data;
  }
}
