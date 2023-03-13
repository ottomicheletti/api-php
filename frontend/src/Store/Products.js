import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import request from '../Helpers/request';
// import produce from 'immer';

export const productsStore = create(devtools(
  (set, get) => ({
    products: [],
    product: [],
    edit: [],

    fetchProducts: async () => {
      const response = await request('produtos', 'GET');
      const onEdit = response.map((obj) => obj = false);
      set({ edit: onEdit });
      set({ products: await response }, false, 'fetchProducts');
    },

    setOnEdit: (idx, bool) => {
      const newOnEdit = get().edit.map((b, index) => index === idx ? b = bool : b = !bool  );
      set({ edit: newOnEdit });
    },

    confirmOnEdit: (idx, bool) => set((state) => {
      state.edit[idx] = bool;
    }, false, 'updateCart'),


}), {name: 'Loja do Mirante - productsStore'}));
