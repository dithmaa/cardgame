import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextProps {
  balance: number | null;
  walletAddress: string | null;
  setWalletData: (balance: number | null, walletAddress: string | null) => void;
  setBalance: React.Dispatch<React.SetStateAction<number | null>>; // Экспортируем setBalance
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const setWalletData = (
    newBalance: number | null,
    newWalletAddress: string | null
  ) => {
    setBalance(newBalance);
    setWalletAddress(newWalletAddress);
  };

  return (
    <WalletContext.Provider
      value={{ balance, walletAddress, setWalletData, setBalance }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within WalletProvider");
  }
  return context;
};
