-- Remove POS / Payroll rows if they were seeded earlier
DELETE FROM products WHERE id IN ('busy-pos', 'busy-payroll');
