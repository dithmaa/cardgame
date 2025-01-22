import { Header } from "../../components";
import walletPagePlaque from "../../assets/img/cards/wallet-page-plaque.png";
import connectWalletPng from "../../assets/img/cards/connect-wallet.png";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import { useCallback, useEffect, useState } from "react";

export const WalletPage = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    const encodedAddress = new TextEncoder().encode(address);
    const firstPart = String.fromCharCode(...encodedAddress.slice(0, 4));
    const lastPart = String.fromCharCode(...encodedAddress.slice(-4));
    return `${firstPart}...${lastPart}`;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="wallet-page opacity-40">
      <Header />
      <div className="container">
        <div
          className="wallet-page"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="wallet-page__account" style={{ padding: "25px 0" }}>
            <h3>Your balance</h3>
            <div className="wallet-page__plaque">
              <span>0</span>
              <img src={walletPagePlaque} alt="" />
            </div>
          </div>
          <div className="wallet-page__account">
            <h3>Withdrawn:</h3>
            <div className="wallet-page__plaque">
              <span>0</span>
              <img src={walletPagePlaque} alt="" />
            </div>
          </div>

          {tonWalletAddress ? (
            <div className="flex flex-col items-center">
              <p className="mb-4">
                Connected: {formatAddress(tonWalletAddress)}
              </p>
              <button
                onClick={handleWalletAction}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <button
              onClick={handleWalletAction}
              className="wallet-page__action"
            >
              <img src={connectWalletPng} alt="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
