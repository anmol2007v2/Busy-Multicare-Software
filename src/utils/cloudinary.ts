/**
 * Uploads a file to Cloudinary using an unsigned upload preset.
 * 
 * @param file - The File or Blob object to upload.
 * @returns A promise that resolves to the uploaded image URL, or throws an error.
 */
async function toUploadable(file: File | Blob | string): Promise<File | Blob> {
  if (typeof file !== 'string') return file;
  if (!file.startsWith('data:image/')) {
    throw new Error('Invalid image data');
  }
  const res = await fetch(file);
  return res.blob();
}

export const uploadToCloudinary = async (file: File | Blob | string): Promise<string> => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary environment variables are missing.');
  }

  const payload = await toUploadable(file);
  const formData = new FormData();
  formData.append('file', payload);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};
