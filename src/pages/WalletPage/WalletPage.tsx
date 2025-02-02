import { Header } from "../../components";
import walletPagePlaque from "../../assets/img/cards/wallet-page-plaque.png";
import connectWalletPng from "../../assets/img/cards/connect-wallet.png";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import { useWalletContext } from "../../shared/context/WalletContext";

export const WalletPage = () => {
  const { setWalletData } = useWalletContext();
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { balance } = useWalletContext();

  const fetchBalance = useCallback(
    async (address: string): Promise<number | null> => {
      try {
        console.log("Fetching balance for:", address);

        const response = await fetch("https://toncenter.com/api/v2/jsonRPC", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "getAddressBalance",
            params: { address },
            id: "1",
          }),
        });

        const data = await response.json();

        if (data.result) {
          const balance = Number(data.result) / 1e9;
          console.log("Balance response:", balance);
          return balance;
        } else {
          console.error("Failed to fetch balance:", data.error);
          return null;
        }
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        return null;
      }
    },
    []
  );

  const handleWalletConnection = useCallback(
    async (address: string) => {
      setTonWalletAddress(address);

      const cachedBalance = localStorage.getItem("walletBalance");
      if (cachedBalance) {
        setWalletData(Number(cachedBalance), address);
        setIsLoading(false);
        return;
      }

      const balance = await fetchBalance(address);
      if (balance !== null) {
        setWalletData(balance, address);
        localStorage.setItem("walletBalance", balance.toString());
        localStorage.setItem("walletAddress", address);
      }
      setIsLoading(false);
    },
    [fetchBalance, setWalletData]
  );

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    setWalletData(0, null); // Обнуление состояния контекста
    localStorage.removeItem("walletBalance");
    localStorage.removeItem("walletAddress");
    console.log("Wallet disconnected successfully!");
    setIsLoading(false);
  }, [setWalletData]);

  useEffect(() => {
    const checkWalletConnection = async () => {
      const cachedAddress = localStorage.getItem("walletAddress");

      if (cachedAddress) {
        handleWalletConnection(cachedAddress);
      } else if (tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account.address);
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

  const handleFakeWithdraw = () => {
    if (!tonWalletAddress) {
      alert("Wallet not connected!");
      return;
    }

    const confirmed = window.confirm(
      "Telegram Alert: Are you sure you want to send 0.01 TON to this app?"
    );

    if (confirmed) {
      console.log("Transaction simulated: 0.01 TON deducted.");
      alert("Transaction successful (simulated)");
    }
  };

  const handleWalletAction = async () => {
    setIsLoading(true);
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return <h1 className="text-center text-white"></h1>;
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
          <div
            className="wallet-page__account mt-10"
            style={{ padding: "25px 0" }}
          >
            <h3>Your balance</h3>
            <div className="wallet-page__plaque">
              <span className="!py-2">
                {balance !== null ? balance.toFixed(2) : "0"}
              </span>
              <img src={walletPagePlaque} alt="" />
            </div>
          </div>
          <div className="wallet-page__account">
            <h3>Withdrawn:</h3>
            <div className="wallet-page__plaque">
              <span className="!py-2">0</span>
              <img src={walletPagePlaque} alt="" />
            </div>
          </div>

          {tonWalletAddress ? (
            <div className="flex flex-col items-center">
              <button
                onClick={handleFakeWithdraw}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl mb-4"
              >
                Simulate 0.01 TON Withdraw
              </button>

              <button
                onClick={handleWalletAction}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-2xl wallet-page__action"
              >
                Disconnect Wallet
              </button>
              <p className="my-4 text-[#fff]">
                Connected: {formatAddress(tonWalletAddress)}
              </p>
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
