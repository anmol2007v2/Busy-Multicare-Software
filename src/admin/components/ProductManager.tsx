import { useState } from 'react';
import { useLocalData } from '../hooks/useLocalData';
import { DEFAULT_ADMIN_PRODUCTS, type AdminProduct } from '../../data/defaultProducts';
import { STORAGE_KEYS } from '../../config/site';

export default function ProductManager() {
  const { get, set } = useLocalData<AdminProduct[]>(STORAGE_KEYS.products, DEFAULT_ADMIN_PRODUCTS);
  const [products, setProducts] = useState(get());
  const [saved, setSaved] = useState(false);

  const updatePrice = (id: number, newPrice: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, price: Number(newPrice) } : p)));
  };

  const handleSave = () => {
    set(products);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-4">Edit Product Prices</h2>
      <p className="text-sm text-gray-500 mb-6">Changes update prices shown on the website.</p>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between border rounded-lg p-4 flex-wrap gap-4">
            <div>
              <p className="font-semibold text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">NPR</span>
              <input
                type="number"
                value={product.price}
                onChange={(e) => updatePrice(product.id, e.target.value)}
                className="border rounded-lg px-3 py-2 w-32 text-right font-semibold"
              />
              <span className="text-gray-500 text-sm">/{product.period}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSave}
        className={`mt-6 px-8 py-3 rounded-lg font-semibold transition ${saved ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {saved ? '✓ Saved!' : 'Save All Prices'}
      </button>
    </div>
  );
}
