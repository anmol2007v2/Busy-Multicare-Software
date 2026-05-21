type ImageUploaderProps = {
  onUpload: (base64: string | string[]) => void;
  label?: string;
};

export default function ImageUploader({ onUpload, label = 'Upload Image' }: ImageUploaderProps) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const invalidFile = files.find((file) => file.size > 2 * 1024 * 1024);
    if (invalidFile) {
      alert('All images must be under 2MB. Please compress them first.');
      return;
    }

    const imagePromises = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        })
    );

    const images = await Promise.all(imagePromises);
    onUpload(images.length === 1 ? images[0] : images);
    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFile}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <p className="text-xs text-gray-400 mt-1">Max 2MB per image. Accepted: JPG, PNG, WebP</p>
    </div>
  );
}