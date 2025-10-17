'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './WalletConnect.css';

export default function WalletConnect() {
  const { connected, publicKey } = useWallet();

  return (
    <div className="wallet-connect">
      <WalletMultiButton className="wallet-button">
        {connected 
          ? `${publicKey?.toString().slice(0, 4)}...${publicKey?.toString().slice(-4)}`
          : 'Connect Wallet'
        }
      </WalletMultiButton>
      
      {connected && (
        <div className="wallet-status">
          <div className="status-indicator"></div>
          <span>Wallet Connected</span>
        </div>
      )}
    </div>
  );
}