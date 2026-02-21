import { createUploader } from "../utils/cloudinary-uploader.util.js";

export const uploadDocuments = createUploader({
  folder: "documents",
  resourceType: "auto",
  maxSizeMB: 10
});
