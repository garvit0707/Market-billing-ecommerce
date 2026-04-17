import { calculateBill } from './billing';
import { CartItem } from '../types';
import { PRODUCTS } from '../constants';

const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id)!;

const makeCart = (entries: [string, number][]): CartItem[] =>
  entries.map(([id, quantity]) => ({ product: getProduct(id), quantity }));

describe('calculateBill', () => {
  it('calculates subtotal with no items', () => {
    const bill = calculateBill([]);
    expect(bill.subtotal).toBe(0);
    expect(bill.finalTotal).toBe(0);
    expect(bill.appliedOffers).toHaveLength(0);
  });

  it('calculates simple subtotal without any offers triggered', () => {
    const cart = makeCart([['soup', 1], ['milk', 1]]);
    const bill = calculateBill(cart);
    expect(bill.subtotal).toBeCloseTo(1.95);
    expect(bill.appliedOffers).toHaveLength(0);
    expect(bill.finalTotal).toBeCloseTo(1.95);
  });

  it('applies 10% off apples for any quantity', () => {
    const cart = makeCart([['apples', 1]]);
    const bill = calculateBill(cart);
    expect(bill.appliedOffers).toHaveLength(1);
    expect(bill.appliedOffers[0].savings).toBeCloseTo(0.10);
    expect(bill.finalTotal).toBeCloseTo(0.90);
  });

  it('applies 10% off apples for 3 bags', () => {
    const cart = makeCart([['apples', 3]]);
    const bill = calculateBill(cart);
    expect(bill.appliedOffers[0].savings).toBeCloseTo(0.30);
    expect(bill.finalTotal).toBeCloseTo(2.70);
  });

  it('applies bread half price with 2 soups', () => {
    const cart = makeCart([['soup', 2], ['bread', 1]]);
    const bill = calculateBill(cart);
    const breadOffer = bill.appliedOffers.find((o) => o.offerId === 'offer-soup-bread');
    expect(breadOffer).toBeDefined();
    expect(breadOffer!.savings).toBeCloseTo(0.40);
    expect(bill.finalTotal).toBeCloseTo(1.90);
  });

  it('does not apply bread offer with only 1 soup', () => {
    const cart = makeCart([['soup', 1], ['bread', 1]]);
    const bill = calculateBill(cart);
    const breadOffer = bill.appliedOffers.find((o) => o.offerId === 'offer-soup-bread');
    expect(breadOffer).toBeUndefined();
  });

  it('applies buy 3 milk for price of 2', () => {
    const cart = makeCart([['milk', 3]]);
    const bill = calculateBill(cart);
    const milkOffer = bill.appliedOffers.find((o) => o.offerId === 'offer-milk');
    expect(milkOffer).toBeDefined();
    expect(milkOffer!.savings).toBeCloseTo(1.30);
    expect(bill.finalTotal).toBeCloseTo(2.60);
  });

  it('handles 6 milks: two free milks', () => {
    const cart = makeCart([['milk', 6]]);
    const bill = calculateBill(cart);
    const milkOffer = bill.appliedOffers.find((o) => o.offerId === 'offer-milk');
    expect(milkOffer!.savings).toBeCloseTo(2.60);
  });

  it('combines multiple offers', () => {
    const cart = makeCart([['soup', 2], ['bread', 1], ['apples', 1], ['milk', 3]]);
    const bill = calculateBill(cart);
    expect(bill.appliedOffers.length).toBeGreaterThanOrEqual(3);
    expect(bill.totalSavings).toBeGreaterThan(0);
    expect(bill.finalTotal).toBeLessThan(bill.subtotal);
  });
});