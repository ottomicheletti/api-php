import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const messageStore = create(devtools(
  (set) => ({
    message: {
      text: '',
      type: '',
    },
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
}), {name: 'Loja do Mirante - messageStore'}));
