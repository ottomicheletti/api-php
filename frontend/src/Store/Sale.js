import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import request from '../Helpers/request';
import produce from 'immer';

export const saleStore = create(devtools(
  (set, get) => ({
    products: [],
    cart: [],
    sale: {
      produto: 1,
      quantidade: 0,
      total: 0,
    },
    taxes: 0,

    fetchProducts: async () => {
      const response = await request('produtos', 'GET');
      set({ products: await response }, false, 'fetchProducts');
    },

    insertOnCart: () => set(() => ({
      cart: [...get().cart, get().sale]
    }), false, 'insertOnCart'),

    removeFromCart: (id) => set(() => ({
      cart: get().cart.filter((item) => item.produto !== id),
    }), false, 'removeFromCart'),

    updateCartItem: (id, qtd, total) => {
      const cartItemIndex = get().cart.findIndex((p) => p.produto === id);

      return set(produce((state) => {
        state.cart[cartItemIndex] = {
          ...get().cart[cartItemIndex],
          quantidade: state.cart[cartItemIndex].quantidade += qtd,
          total: state.cart[cartItemIndex].total += total };
      }), false, 'updateCart');
    },

    emptyCart: () => {
      set({ cart: [] }, false, 'emptyCart');
    },

    updateTotal: () => set(() => ({
      sale: {
        ...get().sale,
        total: get().products[get().sale.produto - 1]?.valor * get().sale.quantidade,
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

    setSale: ({ target: { name, value } }) => set(() => ({
      sale: {
        ...get().sale,
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

}), {name: 'Loja do Mirante - saleStore'}));
