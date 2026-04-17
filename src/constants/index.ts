import { Product, SpecialOffer } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'soup',
    name: 'Soup',
    price: 0.65,
    unit: 'tin',
    emoji: '🥣',
    category: 'Pantry',
  },
  {
    id: 'bread',
    name: 'Bread',
    price: 0.80,
    unit: 'loaf',
    emoji: '🍞',
    category: 'Bakery',
  },
  {
    id: 'milk',
    name: 'Milk',
    price: 1.30,
    unit: 'bottle',
    emoji: '🥛',
    category: 'Dairy',
  },
  {
    id: 'apples',
    name: 'Apples',
    price: 1.00,
    unit: 'bag',
    emoji: '🍎',
    category: 'Produce',
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-apples',
    productId: 'apples',
    description: '10% off apples',
    type: 'MULTIBUY',
    multiQuantity: 1,
    multiPrice: 0.90,
  },
  {
    id: 'offer-soup-bread',
    productId: 'bread',
    description: 'Buy 2 tins of soup, get a loaf of bread for half price',
    type: 'BUY_N_GET_M_FREE',
    buyQuantity: 2,
    freeQuantity: 1,
  },
  {
    id: 'offer-milk',
    productId: 'milk',
    description: 'Buy 3 bottles of milk for the price of 2',
    type: 'BUY_N_GET_M_FREE',
    buyQuantity: 3,
    freeQuantity: 1,
  },
];

export const CURRENCY_SYMBOL = '£';