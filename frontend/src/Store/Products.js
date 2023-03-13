import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import request from '../Helpers/request';
// import produce from 'immer';

export const productsStore = create(devtools(
  (set, get) => ({
    products: [],
    edit: [],
    types: [],
    product: {
      nome: '',
      valor: 0,
      tipo: null,
    },

    fetchProducts: async () => {
      const produtos = await request('produtos', 'GET');
      const tipos = await request('tipos_produto', 'GET')
      const onEdit = produtos.map((obj) => obj = false);
      set({ products: await produtos, edit: onEdit, types: tipos  }, false, 'fetchProducts');
    },

    setOnEdit: (idx, bool) => {
      const newOnEdit = get().edit.map((b, index) => index === idx ? b = bool : b = !bool  );
      set({ edit: newOnEdit }, false, 'setOnEdit');
    },

    confirmOnEdit: (idx, bool) => set((state) => {
      state.edit[idx] = bool;
    }, false, 'confirmOnEdit'),

    setProduct: (idx) => set((state) => ({
      ...state,
      product: get().products[idx],
    }), false, 'setProduct'),

    onEditProduct: ({ target: { name, value }}) => set(() => ({
      product: {
        ...get().product,
        [name]: name === 'nome' ? value : parseFloat(value),
      }
    }), false, `onEditProduct-${name}`),

}), {name: 'Loja do Mirante - productsStore'}));
