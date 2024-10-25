import { create } from 'zustand';


type ClientState = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
}

// Hook para abrir y cerrar el modal de crear clientes
export const useNewClients = create<ClientState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// Hook para abrir y cerrar el modal de editar clientes
export const useEditClients = create<ClientState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));