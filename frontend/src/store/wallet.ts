// store/walletStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  setAddress: (address: string) => void;
  clearAddress: () => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (address) => set({ address }),
      clearAddress: () => set({ address: null }),
    }),
    {
      name: 'wallet-storage', // Key in localStorage
    }
  )
);
