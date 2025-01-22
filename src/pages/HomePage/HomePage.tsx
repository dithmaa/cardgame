import logoImg from "../../assets/img/logo.png";
import { ReactComponent as CardsSvg } from "../../assets/img/icon/cards.svg";
import { ReactComponent as ChampionSvg } from "../../assets/img/icon/champion.svg";
import { ReactComponent as SackSvg } from "../../assets/img/icon/sack-ton.svg";
import WalletSvg from "../..//assets/img/icon/wallet.svg";
import { Link } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";

const tg = window.Telegram?.WebApp;

export const HomePage = () => {
  const [userName, setName] = useState("");
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
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  console.log("telegram", tg?.initDataUnsafe);
  useEffect(() => {
    setName(String(tg?.initDataUnsafe?.user?.first_name));
  }, [tg?.initDataUnsafe]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="home-page">
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>
        {tonWalletAddress ? (
          <div className="flex flex-col items-center">
            <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect TON Wallet
          </button>
        )}
      </main>

      <div className="container" style={{ paddingTop: "25px" }}>
        <div className="main-page flex fdc aic">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>
          <h1 style={{ color: "white" }}>{userName ? userName : "Name"}</h1>
          <div className="actions">
            <div className="actions__item">
              <Link to="/game" className="actions__item_btn">
                <CardsSvg />
                <span>Play</span>
              </Link>
            </div>
            <div className="actions__item">
              <Link to="/top" className="actions__item_btn">
                <ChampionSvg />
                <span>Top</span>
              </Link>
            </div>
            <div className="actions__item">
              <Link to={"/earn"} className="actions__item_btn">
                <SackSvg />
                <span>Earn</span>
              </Link>
            </div>
            <div className="actions__item">
              <Link to={"/wallet"} className="actions__item_btn">
                <img src={WalletSvg} alt="" />
                <span>Wallet</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
