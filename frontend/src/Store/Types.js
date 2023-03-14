import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import request from '../Helpers/request';
// import produce from 'immer';

export const typesStore = create(devtools(
  (set, get) => ({
    types: [],
    type: {
      codigo: 0,
      nome: '',
      percentual_imposto: 0,
    },
    edit: [],

    fetchTypes: async () => {
      const tipos = await request('tipos_produto', 'GET')
      const onEdit = tipos.map((obj) => obj = false);
      set({ edit: onEdit, types: tipos  }, false, 'fetchTypes');
    },

    setOnEdit: (idx, bool) => {
      const newOnEdit = get().edit.map((b, index) => index === idx ? b = bool : b = !bool  );
      set({ edit: newOnEdit }, false, 'setOnEdit');
    },

    confirmOnEdit: (idx, bool) => set((state) => {
      state.edit[idx] = bool;
    }, false, 'confirmOnEdit'),

    setType: (idx) => set((state) => ({
      ...state,
      type: get().types[idx],
    }), false, 'setType'),

    onEditType: ({ target: { name, value }}) => set(() => ({
      type: {
        ...get().type,
        [name]: name === 'nome' ? value : parseFloat(value),
      }
    }), false, `onEditType-${name}`),

}), {name: 'Loja do Mirante - typesStore'}));
