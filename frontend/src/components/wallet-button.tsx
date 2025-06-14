'use client';

import { useState } from 'react';

import { useWalletStore } from '@/store/wallet';

import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

import { toast } from 'react-toastify';

const WalletButton = () => {
  const [loading, setLoading] = useState(false);
  
  const address = useWalletStore((state) => state.address);
  const setAddress = useWalletStore((state) => state.setAddress);
  const clearAddress = useWalletStore((state) => state.clearAddress);

  const connectWallet = async () => {
    try {
      setLoading(true);
      
      if (!window.ethereum) {
        toast.error('MetaMask not found');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setAddress(address);
      toast.success(`Connected: ${address.slice(0, 6)}...`);
    } catch (err: unknown) {
      toast.error('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    clearAddress();
    toast.info('Wallet disconnected');
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {!address ? (
        <Button
          onClick={connectWallet}
          variant="secondary"
          size="lg"
          disabled={loading}
          className="bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 border-gray-600/30 hover:border-gray-500/50 px-6 py-3 transition-all duration-300"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <>
          <span className="text-gray-300 text-sm bg-gray-700 px-3 py-1 rounded-lg">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <Button
            onClick={disconnectWallet}
            variant="ghost"
            size="icon"
            className="text-red-400 hover:text-red-600"
            title="Disconnect"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default WalletButton;
