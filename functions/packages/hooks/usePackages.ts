import { create } from 'zustand';

type PackageState = {
  id?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewPackages = create<PackageState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export const useEditPackages = create<PackageState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));