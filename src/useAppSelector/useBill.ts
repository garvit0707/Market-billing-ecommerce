import { useMemo } from 'react';
import { useAppSelector } from './redux';
import { calculateBill } from '../utils/billing';
import { BillBreakdown } from '../types';

export function useBill(): BillBreakdown {
  const items = useAppSelector((state) => state.cart.items);

  const bill = useMemo(() => calculateBill(items), [items]);

  return bill;
}