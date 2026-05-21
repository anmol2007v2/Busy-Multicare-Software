import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
type SheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Sheet({ open, onClose, title, description, children, footer }: SheetProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <button type="button" className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} aria-label="Close panel" />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="relative w-full max-w-xl h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200">
          <div>
            <h2 id="sheet-title" className="text-lg font-semibold text-slate-900">{title}</h2>
            {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80">{footer}</div>}
      </aside>
    </div>
  );
}
