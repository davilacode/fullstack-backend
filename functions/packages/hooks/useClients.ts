import { create } from 'zustand';

type ClientState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useClients = create<ClientState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));