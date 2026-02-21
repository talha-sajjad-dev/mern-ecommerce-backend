import { createUploader } from "../utils/cloudinary-uploader.util.js";

export const combineUploads = createUploader({
  folder: "sellers",
  formats: ["jpg", "jpeg", "png", "webp"],
  transformations: [
    { width: 800, height: 800, crop: "limit" },
    { quality: "auto" }
  ],
  maxSizeMB: 10,
  resourceType: "auto"
});