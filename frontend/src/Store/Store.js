import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import request from '../Helpers/request';
import produce from 'immer';

export const useStore = create(devtools(
  (set, get) => ({
    products: [],
    cart: [],
    sale: {
      produto: 1,
      quantidade: 0,
      total: 0,
    },
    message: {
      text: '',
      type: '',
    },
    taxes: 0,

    fetchProducts: async () => {
      const response = await request('produtos', 'GET');
      set({ products: await response }, false, 'fetchProducts');
    },

    insertOnCart: () => set((state) => ({
      cart: [...state.cart, state.sale]
    }), false, 'insertOnCart'),

    removeFromCart: (id) => set((state) => ({
      cart: state.cart.filter((item) => item.produto !== id),
    }), false, 'removeFromCart'),

    updateCartItem: (id, qtd, total) => {
      const cartItemIndex = get().cart.findIndex((p) => p.produto === id);

      return set(produce((state) => {
        state.cart[cartItemIndex] = {
          ...state.cart[cartItemIndex],
          quantidade: state.cart[cartItemIndex].quantidade += qtd,
          total: state.cart[cartItemIndex].total += total };
      }), false, 'updateCart');
    },

    emptyCart: () => {
      set({ cart: [] }, false, 'emptyCart');
    },

    updateTotal: () => set((state) => ({
      sale: {
        ...state.sale,
        total: state.products[state.sale.produto - 1]?.valor * state.sale.quantidade,
      }
    }), false, 'updateTotal'),

    calculateTaxes: () => set(() => ({
      taxes: get().cart.reduce(
        (acc, curr) =>
          acc +
          curr.total * (get().products[curr.produto - 1].percentual_imposto / 100),
        0
      )
    }), false, 'calculateTaxes'),

    setMessage: ({text, type}) => set(() => ({
      message: {
        text,
        type,
      }
    }), false, 'setMessage'),

    clearMessage: () => set(() => ({
      message: {
        text: '',
        type: '',
      }
    }), false, 'clearMessage'),

    setSale: ({ target: { name, value } }) => set((state) => ({
      sale: {
        ...state.sale,
        [name]: parseInt(value)
      }
    }), false, `setSale-${name}`),

    clearSale: () => set(() => ({
      sale: {
        produto: 1,
        quantidade: 0,
        total: 0,
      }
    }), false, 'clearSale'),
}),
));
