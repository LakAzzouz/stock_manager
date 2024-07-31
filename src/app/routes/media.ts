import express from "express";
import multer from "multer";

import { initFirebase } from "../config/InitFirebase";
import { FirebaseStorageGateway } from "../../adapters/gateways/FirebaseStorageGateway";
import { SqlMediaMapper } from "../../adapters/repositories/mappers/SqlMediaMapper";
import { SqlMediaRepository } from "../../adapters/repositories/SQL/SqlMediaRepository";
import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { Auth } from "../../adapters/middlewares/auth";
import { MediaUploadCommand } from "../validation/mediaCommands";
import { UploadMedia } from "../../core/usecases/Media/UploadMedia";
import { ENTITYTYPE } from "../../core/types/EntityType";

export const mediaRouteur = express.Router();
const firebase = initFirebase();

export const firebaseGateway = new FirebaseStorageGateway(firebase);

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const mediaMapper = new SqlMediaMapper();
const mediaGateway = firebaseGateway;

const mediaRepository = new SqlMediaRepository(dbTest, mediaMapper);
const uploadMedia = new UploadMedia(mediaGateway, mediaRepository);

mediaRouteur.use(Auth);
mediaRouteur.post("/upload/:entityType/:entityId", upload.single("file"), async (req: express.Request, res: express.Response) => {
    try {
      const entityType = req.params.entityType as ENTITYTYPE;
      const entityId = req.params.entityId;

      const { url, mimeType } = MediaUploadCommand.validateMediaUpload(req.body);

      await uploadMedia.execute({
        entityId,
        entityType,
        url,
        mimeType,
        file: req.file?.buffer,
        fileName: req.file?.originalname,
      });

      const msg = {
        message: "Image upload successfully"
      };

      return res.status(201).send(msg);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
    }
  }
);
