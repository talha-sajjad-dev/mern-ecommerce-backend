import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

export const createUploader = ({
  folder,
  resourceType = "image",
  formats,
  transformations,
  maxSizeMB = 5
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      resource_type: resourceType,
      allowed_formats: formats,
      transformation: transformations,
      public_id: () => `${folder}-${Date.now()}`
    }
  });

  return multer({
    storage,
    limits: { fileSize: maxSizeMB * 1024 * 1024 }
  });
};
