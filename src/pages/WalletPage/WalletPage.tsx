import { Header } from "../../components";
import walletPagePlaque from "../../assets/img/cards/wallet-page-plaque.png";
import connectWalletPng from "../../assets/img/cards/connect-wallet.png";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";

export const WalletPage = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);

  const fetchBalance = useCallback(async (address: string) => {
    try {
      console.log("Fetching balance for:", address); // Для отладки

      const response = await fetch("https://toncenter.com/api/v2/jsonRPC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "getAddressBalance", // Метод для получения баланса
          params: {
            address: address, // Адрес для получения баланса
          },
          id: "1", // Идентификатор запроса
        }),
      });

      const data = await response.json();

      if (data.ok && data.result) {
        console.log("Balance response:", data.result); // Для отладки
        setBalance(Number(data.result) / 1e9); // Преобразуем баланс из наноTON в TON
      } else {
        console.error("Failed to fetch balance:", data.error);
        setBalance(null);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
      setBalance(null);
    }
  }, []);

  const handleWalletConnection = useCallback(
    (address: string) => {
      setTonWalletAddress(address);
      console.log("Wallet connected successfully!");
      setIsLoading(false);
      fetchBalance(address); // Загружаем баланс
    },
    [fetchBalance]
  );

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
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="wallet-page">
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
              <span>
                {balance !== null ? balance.toFixed(2) : "Loading..."}
              </span>
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
              <p className="my-4 text-[#fff]">
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
