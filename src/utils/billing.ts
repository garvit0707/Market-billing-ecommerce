import { CartItem, BillBreakdown, AppliedOffer, ItemBreakdown } from '../types';
import { SPECIAL_OFFERS } from '../constants';

export function calculateBill(items: CartItem[]): BillBreakdown {
  const itemBreakdowns: ItemBreakdown[] = items.map((item) => ({
    productId: item.product.id,
    productName: item.product.name,
    quantity: item.quantity,
    unitPrice: item.product.price,
    lineTotal: item.product.price * item.quantity,
  }));

  const subtotal = itemBreakdowns.reduce((sum, b) => sum + b.lineTotal, 0);
  const appliedOffers: AppliedOffer[] = [];

  const getQty = (productId: string): number =>
    items.find((i) => i.product.id === productId)?.quantity ?? 0;

  const getPrice = (productId: string): number =>
    items.find((i) => i.product.id === productId)?.product.price ?? 0;

  for (const offer of SPECIAL_OFFERS) {
    // 10% off apples
    if (offer.id === 'offer-apples') {
      const qty = getQty('apples');
      if (qty > 0 && offer.percentOff !== undefined) {
        const savings = (getPrice('apples') * (offer.percentOff / 100)) * qty;
        if (savings > 0) {
          appliedOffers.push({
            offerId: offer.id,
            productName: 'Pink Lady Apples',
            description: offer.description,
            savings: parseFloat(savings.toFixed(2)),
            timesApplied: qty,
          });
        }
      }
    }

    // Buy 2 soups → bread half price
    if (offer.id === 'offer-soup-bread') {
      const soupQty = getQty('soup');
      const breadQty = getQty('bread');
      const eligible = Math.min(Math.floor(soupQty / 2), breadQty);
      if (eligible > 0) {
        const savings = (getPrice('bread') / 2) * eligible;
        appliedOffers.push({
          offerId: offer.id,
          productName: 'Sourdough',
          description: offer.description,
          savings: parseFloat(savings.toFixed(2)),
          timesApplied: eligible,
        });
      }
    }

    // Buy 3 milks for price of 2
    if (offer.id === 'offer-milk') {
      const milkQty = getQty('milk');
      const freeMilk = Math.floor(milkQty / 3);
      if (freeMilk > 0) {
        const savings = getPrice('milk') * freeMilk;
        appliedOffers.push({
          offerId: offer.id,
          productName: 'Whole Milk',
          description: offer.description,
          savings: parseFloat(savings.toFixed(2)),
          timesApplied: freeMilk,
        });
      }
    }

    // Buy 2 eggs for £4.00 (save £0.80)
    if (offer.id === 'offer-eggs') {
      const eggQty = getQty('eggs');
      const sets = Math.floor(eggQty / 2);
      if (sets > 0 && offer.multiPrice !== undefined) {
        const normalPrice = getPrice('eggs') * 2;
        const savings = (normalPrice - offer.multiPrice) * sets;
        if (savings > 0) {
          appliedOffers.push({
            offerId: offer.id,
            productName: 'Free Range Eggs',
            description: offer.description,
            savings: parseFloat(savings.toFixed(2)),
            timesApplied: sets,
          });
        }
      }
    }

    // Buy 2 coffees for £6.00 (save £1.00)
    if (offer.id === 'offer-coffee') {
      const coffeeQty = getQty('coffee');
      const sets = Math.floor(coffeeQty / 2);
      if (sets > 0 && offer.multiPrice !== undefined) {
        const normalPrice = getPrice('coffee') * 2;
        const savings = (normalPrice - offer.multiPrice) * sets;
        if (savings > 0) {
          appliedOffers.push({
            offerId: offer.id,
            productName: 'Filter Coffee',
            description: offer.description,
            savings: parseFloat(savings.toFixed(2)),
            timesApplied: sets,
          });
        }
      }
    }
  }

  const totalSavings = parseFloat(
    appliedOffers.reduce((sum, o) => sum + o.savings, 0).toFixed(2)
  );

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    appliedOffers,
    totalSavings,
    finalTotal: parseFloat((subtotal - totalSavings).toFixed(2)),
    itemBreakdowns,
  };
}

export function formatPrice(amount: number): string {
  return `£${amount.toFixed(2)}`;
}