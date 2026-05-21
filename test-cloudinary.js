const cloudName = 'dek4k4ri7';
const uploadPreset = 'Busy Admin';

async function toUploadable(file) {
  if (!file.startsWith('data:image/')) {
    throw new Error('Invalid image data');
  }
  const res = await fetch(file);
  return res.blob();
}

async function uploadToCloudinary(file) {
  const payload = await toUploadable(file);
  const formData = new FormData();
  formData.append('file', payload);
  formData.append('upload_preset', uploadPreset);

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
  return await response.json();
}

async function testUpload() {
  const dummyBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; 
  try {
    const data = await uploadToCloudinary(dummyBase64);
    console.log('Upload Success!', data.secure_url);
  } catch (err) {
    console.error('Upload Failed!', err.message);
  }
}

testUpload();
