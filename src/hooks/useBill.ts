import { useMemo } from 'react';
import { useAppSelector } from './redux';
import { calculateBill } from '../utils/billing';

export function useBill() {
  const items = useAppSelector((state) => state.cart.items);
  return useMemo(() => calculateBill(items), [items]);
}