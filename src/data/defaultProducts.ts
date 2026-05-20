export interface AdminProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  period: string;
  popular?: boolean;
}

export const DEFAULT_ADMIN_PRODUCTS: AdminProduct[] = [
  { id: 1, name: 'Busy Basic', description: 'Single user accounting', price: 12000, currency: 'NPR', period: 'year' },
  { id: 2, name: 'Busy Standard', description: 'Multi-user with inventory', price: 25000, currency: 'NPR', period: 'year', popular: true },
  { id: 3, name: 'Busy Enterprise', description: 'Full ERP solution', price: 75000, currency: 'NPR', period: 'year' },
  { id: 4, name: 'Busy POS', description: 'Point of Sale system', price: 18000, currency: 'NPR', period: 'year' },
  { id: 5, name: 'Busy Payroll', description: 'HR & Payroll management', price: 15000, currency: 'NPR', period: 'year' },
];

export function formatNpr(price: number): string {
  return `NPR ${price.toLocaleString('en-NP')}`;
}
