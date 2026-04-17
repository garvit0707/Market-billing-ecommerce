import { calculateBill, formatPrice } from './billing';
import { CartItem } from '../types';
import { PRODUCTS } from '../constants';

const get = (id: string) => PRODUCTS.find((p) => p.id === id)!;

const cart = (entries: [string, number][]): CartItem[] =>
  entries.map(([id, qty]) => ({ product: get(id), quantity: qty }));

describe('calculateBill', () => {
  it('returns zeroes for empty cart', () => {
    const bill = calculateBill([]);
    expect(bill.subtotal).toBe(0);
    expect(bill.finalTotal).toBe(0);
    expect(bill.totalSavings).toBe(0);
    expect(bill.appliedOffers).toHaveLength(0);
  });

  it('calculates subtotal with no offers triggered', () => {
    const bill = calculateBill(cart([['bread', 1], ['pasta', 2]]));
    expect(bill.subtotal).toBeCloseTo(3.20);
    expect(bill.appliedOffers).toHaveLength(0);
    expect(bill.finalTotal).toBeCloseTo(3.20);
  });

  it('applies 10% off apples — 1 bag', () => {
    const bill = calculateBill(cart([['apples', 1]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-apples');
    expect(offer).toBeDefined();
    expect(offer!.savings).toBeCloseTo(0.10);
    expect(bill.finalTotal).toBeCloseTo(0.90);
  });

  it('applies 10% off apples — 4 bags', () => {
    const bill = calculateBill(cart([['apples', 4]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-apples');
    expect(offer!.savings).toBeCloseTo(0.40);
    expect(bill.finalTotal).toBeCloseTo(3.60);
  });

  it('applies bread half-price with exactly 2 soups', () => {
    const bill = calculateBill(cart([['soup', 2], ['bread', 1]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-soup-bread');
    expect(offer).toBeDefined();
    expect(offer!.savings).toBeCloseTo(0.40);
    expect(bill.finalTotal).toBeCloseTo(1.70);
  });

  it('does NOT apply bread offer with only 1 soup', () => {
    const bill = calculateBill(cart([['soup', 1], ['bread', 1]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-soup-bread');
    expect(offer).toBeUndefined();
  });

  it('applies bread offer twice with 4 soups and 2 breads', () => {
    const bill = calculateBill(cart([['soup', 4], ['bread', 2]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-soup-bread');
    expect(offer!.savings).toBeCloseTo(0.80);
  });

  it('caps bread discount to number of breads in cart', () => {
    const bill = calculateBill(cart([['soup', 4], ['bread', 1]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-soup-bread');
    expect(offer!.savings).toBeCloseTo(0.40);
  });

  it('applies buy-3-milk-for-2 offer', () => {
    const bill = calculateBill(cart([['milk', 3]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-milk');
    expect(offer).toBeDefined();
    expect(offer!.savings).toBeCloseTo(1.30);
    expect(bill.finalTotal).toBeCloseTo(2.60);
  });

  it('applies milk offer twice for 6 milks', () => {
    const bill = calculateBill(cart([['milk', 6]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-milk');
    expect(offer!.savings).toBeCloseTo(2.60);
  });

  it('applies eggs multibuy offer', () => {
    const bill = calculateBill(cart([['eggs', 2]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-eggs');
    expect(offer).toBeDefined();
    expect(offer!.savings).toBeCloseTo(0.80);
  });

  it('applies coffee multibuy offer', () => {
    const bill = calculateBill(cart([['coffee', 2]]));
    const offer = bill.appliedOffers.find((o) => o.offerId === 'offer-coffee');
    expect(offer).toBeDefined();
    expect(offer!.savings).toBeCloseTo(1.00);
  });

  it('combines all offers at once', () => {
    const bill = calculateBill(
      cart([
        ['soup', 2],
        ['bread', 1],
        ['milk', 3],
        ['apples', 2],
        ['eggs', 2],
        ['coffee', 2],
      ])
    );
    expect(bill.appliedOffers.length).toBe(5);
    expect(bill.totalSavings).toBeGreaterThan(0);
    expect(bill.finalTotal).toBeLessThan(bill.subtotal);
  });

  it('itemBreakdowns match cart entries', () => {
    const bill = calculateBill(cart([['soup', 3], ['honey', 1]]));
    expect(bill.itemBreakdowns).toHaveLength(2);
    const soupLine = bill.itemBreakdowns.find((b) => b.productId === 'soup');
    expect(soupLine!.lineTotal).toBeCloseTo(1.95);
  });
});

describe('formatPrice', () => {
  it('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('£0.00');
  });
  it('formats whole pounds', () => {
    expect(formatPrice(3)).toBe('£3.00');
  });
  it('formats pence correctly', () => {
    expect(formatPrice(1.3)).toBe('£1.30');
  });
  it('rounds to 2 decimal places', () => {
    expect(formatPrice(1.999)).toBe('£2.00');
  });
});