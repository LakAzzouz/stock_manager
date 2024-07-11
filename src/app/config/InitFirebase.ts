import "dotenv/config";
import { cert, initializeApp } from "firebase-admin/app";
import { getStorage, Storage } from "firebase-admin/storage";

export const initFirebase = (): Storage => {
  const base64EncodedFirebaseConfig = process.env.FIREBASE_CONFIG;
  if (!base64EncodedFirebaseConfig) {
      throw new Error('La variable d\'environnement "FIREBASE_CONFIG" est requise.');
  }
  const firebaseConfigJson = Buffer.from(base64EncodedFirebaseConfig, 'base64').toString('ascii');
  const firebaseConfig = JSON.parse(firebaseConfigJson);
  
  const storage = initializeApp({
    credential: cert(firebaseConfig),
    storageBucket: "gs://gestionnaire-de-stock.appspot.com",
  });

  return getStorage();
};
