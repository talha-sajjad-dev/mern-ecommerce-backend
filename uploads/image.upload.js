import { createUploader } from "../utils/cloudinary-uploader.util.js";

export const uploadSingleImage = createUploader({
  folder: "images",
  formats: ["jpg", "jpeg", "png", "webp"],
  transformations: [
    { width: 800, height: 800, crop: "limit" },
    { quality: "auto" }
  ],
  maxSizeMB: 5
});

export const uploadProductImages = createUploader({
  folder: "products/images",
  formats: ["jpg", "jpeg", "png", "webp"],
  maxSizeMB: 8
});
