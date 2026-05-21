import ImageUploader from './ImageUploader';
import { X } from 'lucide-react';

type Props = {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  uploading?: boolean;
};

export default function ImageGallery({ label = 'Images', images, onChange, uploading }: Props) {
  const remove = (index: number) => onChange(images.filter((_, i) => i !== index));

  const move = (index: number, dir: -1 | 1) => {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <ImageUploader
        label={label}
        onUpload={(img) => {
          const added = typeof img === 'string' ? [img] : img;
          onChange([...images, ...added]);
        }}
      />
      {uploading && <p className="text-xs text-[#0041a2] mt-2">Uploading to cloud…</p>}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {images.map((src, index) => (
            <div key={`${src}-${index}`} className="relative group rounded-xl overflow-hidden border border-slate-200">
              <img src={src} alt="" className="w-full h-28 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
                <button type="button" onClick={() => move(index, -1)} className="text-white text-xs bg-black/50 px-2 py-1 rounded" disabled={index === 0}>
                  ←
                </button>
                <button type="button" onClick={() => remove(index)} className="text-white bg-red-600 p-1 rounded">
                  <X size={14} />
                </button>
                <button type="button" onClick={() => move(index, 1)} className="text-white text-xs bg-black/50 px-2 py-1 rounded" disabled={index === images.length - 1}>
                  →
                </button>
              </div>
              {index === 0 && (
                <span className="absolute top-1 left-1 text-[10px] font-bold bg-[#0041a2] text-white px-1.5 py-0.5 rounded">Cover</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
