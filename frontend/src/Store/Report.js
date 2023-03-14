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

    setReport: ({ target: { name, value }}) => set(() => ({
      report: {
        ...get().report,
        [name]: value,
      }
    }), false, 'setReport'),

}), {name: 'Loja do Mirante - reportStore'}));
