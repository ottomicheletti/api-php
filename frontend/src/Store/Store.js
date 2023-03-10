import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(devtools(
  (set) => ({
    produtos: [],
    carrinho: [],
    venda: {
      produto: 1,
      quantidade: 0,
      total: 0,
    },
    message: {
      text: '',
      type: '',
    },

    setProdutos: (data) => set(() => ({
      produtos: data,
    }), false, 'setProdutos'),

    setTotal: () => set((state) => ({
      venda: {
        ...state.venda,
        total: state.produtos[state.venda.produto - 1]?.valor * state.venda.quantidade,
      }
    }), false, 'setTotal'),

    setCarrinho: () => set((state) => ({
      carrinho: [...state.carrinho, state.venda]
    }), false, 'setCarrinho'),

    setMessage: ({text, type}) => set(() => ({
      message: {
        text,
        type,
      }
    }), false, 'setMessage'),

    clearMessage: () => set((state) => ({
      ...state,
      message: {
        text: '',
        type: '',
      }
    }), false, 'clearMessage'),

    clearVenda: () => set((state) => ({
      ...state,
      venda: {
        produto: 1,
        quantidade: 0,
        total: 0,
      }
    }), false, 'clearVenda'),

    handleChange: ({ target: { name, value } }) => set((state) => ({
      ...state,
      venda: {
        ...state.venda,
        [name]: parseInt(value)
      }
    }), false, `handleChange-${name}`),
}),
));
