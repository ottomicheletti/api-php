import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(devtools(
  (set) => ({
    produtos: [],
    venda: {
      produto: 0,
      quantidade: 0,
      total: 0,
    },

    setProdutos: (data) => set(() => ({
      produtos: data,
    }), false, 'setProdutos'),

    setVenda: ({ target: { name, value } }) => set((state) => ({
      ...state,
      venda: {
        ...state.venda,
        [name]: parseInt(value)
      }
    }), false, `setVenda-${name}`),

    setTotal: () => set((state) => ({
      ...state,
      venda: {
        ...state.venda,
        total: state.produtos[state.venda.produto - 1]?.valor * state.venda.quantidade,
      }
    }), false, 'setTotal'),
}),
));
