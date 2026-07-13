import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import slugify from "slugify";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function uploadImage(file, folder = "uploads") {
  if (!(file instanceof File) || file.size === 0) {
    return null;
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("فرمت تصویر مجاز نیست");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد");
  }

  const extension = path.extname(file.name).toLowerCase();
  const originalName = path.basename(file.name, extension);

  const safeName =
    slugify(originalName, {
      lower: true,
      strict: true,
      trim: true,
    }) || "image";

  const fileName = `${safeName}-${Date.now()}-${crypto.randomUUID()}${extension}`;

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    folder
  );

  await mkdir(uploadDirectory, { recursive: true });

  const filePath = path.join(uploadDirectory, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return `/${folder.replace(/\\/g, "/")}/${fileName}`;
}
