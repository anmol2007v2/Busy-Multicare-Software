import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { ADMIN_BRAND, ADMIN_BRAND_HOVER } from '../theme';

export function AdminCard({ title, description, children, className = '', noPadding }: { title?: string; description?: string; children: ReactNode; className?: string; noPadding?: boolean }) {
  return (
    <div className={cn('bg-white rounded-xl border border-slate-200/80 shadow-sm', className)}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-slate-100">
          {title && <h3 className="font-semibold text-slate-900">{title}</h3>}
          {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </div>
  );
}

export function AdminInput(props: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  const { label, error, className = '', id, ...rest } = props;
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <label className="block" htmlFor={inputId}>
      {label && <span className="block text-sm font-medium text-slate-700 mb-1.5">{label}</span>}
      <input
        id={inputId}
        className={cn(
          'w-full border rounded-lg px-3 py-2.5 text-sm transition',
          error ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:ring-[#1a56db]/25 focus:border-[#1a56db]',
          'focus:outline-none focus:ring-2',
          className
        )}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </label>
  );
}

export function AdminTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }) {
  const { label, error, className = '', id, ...rest } = props;
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  return (
    <label className="block" htmlFor={inputId}>
      {label && <span className="block text-sm font-medium text-slate-700 mb-1.5">{label}</span>}
      <textarea
        id={inputId}
        className={cn(
          'w-full border rounded-lg px-3 py-2.5 text-sm transition resize-y',
          error ? 'border-red-300' : 'border-slate-200 focus:ring-[#1a56db]/25 focus:border-[#1a56db]',
          'focus:outline-none focus:ring-2',
          className
        )}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </label>
  );
}

export function AdminSelect({ label, value, onChange, children, className = '' }: { label?: string; value: string; onChange: (v: string) => void; children: ReactNode; className?: string }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-slate-700 mb-1.5">{label}</span>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn('w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]/25 focus:border-[#1a56db]', className)}
      >
        {children}
      </select>
    </label>
  );
}

export function AdminButton({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' }) {
  const variants = {
    primary: 'text-white shadow-sm',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700',
  };
  const style = variant === 'primary' ? { backgroundColor: ADMIN_BRAND } : undefined;
  return (
    <button
      type="button"
      style={style}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition disabled:opacity-50',
        variant === 'primary' && 'hover:opacity-90',
        variants[variant],
        className
      )}
      onMouseEnter={variant === 'primary' ? (e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ADMIN_BRAND_HOVER; } : undefined}
      onMouseLeave={variant === 'primary' ? (e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = ADMIN_BRAND; } : undefined}
      {...rest}
    >
      {children}
    </button>
  );
}

export function AdminBadge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default' | 'success' | 'warning' | 'muted' }) {
  const styles = {
    default: 'bg-[#1a56db]/10 text-[#1a56db]',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-800',
    muted: 'bg-slate-100 text-slate-600',
  };
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold', styles[variant])}>{children}</span>;
}

export function AdminEmptyState({ title, description, action, icon: Icon }: { title: string; description?: string; action?: ReactNode; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="text-center py-16 px-6">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <p className="font-semibold text-slate-800">{title}</p>
      {description && <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function AdminTable({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-slate-200', className)}>
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function AdminTh({ children, className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50/80 border-b border-slate-200', className)} {...rest}>
      {children}
    </th>
  );
}

export function AdminTd({ children, className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 border-b border-slate-100 text-slate-700', className)} {...rest}>{children}</td>;
}
