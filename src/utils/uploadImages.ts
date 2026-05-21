import { uploadToCloudinary } from './cloudinary';

/** Upload base64 or URL strings; returns Cloudinary URLs */
export async function uploadImagesToCloudinary(sources: string[]): Promise<string[]> {
  const results: string[] = [];
  for (const src of sources) {
    if (!src) continue;
    if (src.startsWith('http://') || src.startsWith('https://')) {
      results.push(src);
      continue;
    }
    if (src.startsWith('data:image/')) {
      results.push(await uploadToCloudinary(src));
      continue;
    }
    results.push(src);
  }
  return results;
}
