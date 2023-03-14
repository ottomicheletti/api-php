import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import request from '../Helpers/request';
// import produce from 'immer';

export const reportStore = create(devtools(
  (set, get) => ({
    report: {
      tipo: 'produtos',
      qual: 0,
    },
    orders: [],
    data: [],

    setReport: ({ target: { name, value }}) => {
      if(name === 'tipo') {
        set(() => ({
        report: {
          ...get().report,
          [name]: value,
        },
      }), false, `setReport-${name}`);
      } else {
        set(() => ({
          report: {
            ...get().report,
            [name]: parseInt(value),
          },
        }), false, `setReport-${name}`);
      }
    },

    setOrders: async () => {
      const response = await request('pedidos', 'GET');
      set(() => ({
        orders: response.map((p) => ({ codigo: p.codigo })),
      }), false, 'setOrders')
    },

    fetchData: async (url) => {
      const response = await request(`${url}`, 'GET');
      set(() => ({
        data: response,
      }), false, 'fetchData')
    },

}), {name: 'Loja do Mirante - reportStore'}));
