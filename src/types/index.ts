
export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  emoji: string;
  category: string;
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export type OfferType = 'BUY_N_GET_M_FREE' | 'MULTIBUY';

export interface SpecialOffer {
  id: string;
  productId: string;
  description: string;
  type: OfferType;
 
  buyQuantity?: number;
  freeQuantity?: number;

  multiQuantity?: number;
  multiPrice?: number;
}

export interface AppliedOffer {
  offerId: string;
  productName: string;
  description: string;
  savings: number;
  timesApplied: number;
}

export interface BillBreakdown {
  subtotal: number;
  appliedOffers: AppliedOffer[];
  totalSavings: number;
  finalTotal: number;
  itemBreakdowns: ItemBreakdown[];
}

export interface ItemBreakdown {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}


export interface CartState {
  items: CartItem[];
}

export interface ProductsState {
  products: Product[];
  offers: SpecialOffer[];
}