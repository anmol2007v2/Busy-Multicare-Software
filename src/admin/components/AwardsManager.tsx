import { useState } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import ImageUploader from './ImageUploader';
import { STORAGE_KEYS } from '../../config/site';

export interface Award {
  id: number;
  title: string;
  year: string;
  image: string;
}

export default function AwardsManager() {
  const { get, set } = useLocalData<Award[]>(STORAGE_KEYS.awards, []);
  const [awards, setAwards] = useState(get());
  const [form, setForm] = useState({ title: '', year: '', image: '' });

  const save = (data: Award[]) => {
    setAwards(data);
    set(data);
  };

  const handleAdd = () => {
    if (!form.title || !form.image) return alert('Title and image are required.');
    save([{ ...form, id: Date.now() }, ...awards]);
    setForm({ title: '', year: '', image: '' });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Remove this award?')) return;
    save(awards.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Add Award / Photo</h2>
        <div className="grid grid-cols-1 gap-4">
          <input placeholder="Award Title *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border rounded-lg px-3 py-2 w-full" />
          <input placeholder="Year (e.g. 2024)" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="border rounded-lg px-3 py-2 w-full" />
          <ImageUploader label="Award Photo *" onUpload={(img) => setForm({ ...form, image: img })} />
          {form.image && <img src={form.image} alt="Preview" className="h-32 object-cover rounded-lg" />}
        </div>
        <button type="button" onClick={handleAdd} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Add Award</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {awards.map((award) => (
          <div key={award.id} className="bg-white rounded-xl shadow-sm overflow-hidden text-center">
            <img src={award.image} alt={award.title} className="w-full h-40 object-cover" />
            <div className="p-3">
              <p className="font-semibold text-sm text-gray-800">{award.title}</p>
              {award.year && <p className="text-xs text-gray-400">{award.year}</p>}
              <button type="button" onClick={() => handleDelete(award.id)} className="text-red-500 text-xs mt-2 hover:underline">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
