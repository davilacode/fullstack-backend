import { create } from 'zustand';

type PackageState = {
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
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));