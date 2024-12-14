import { Header } from "../../components";
import walletPagePlaque from "../../assets/img/cards/wallet-page-plaque.png";
import connectWalletPng from "../../assets/img/cards/connect-wallet.png";

export const WalletPage = () => {
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
          <div className="wallet-page__account">
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
          <button className="wallet-page__action">
            <img src={connectWalletPng} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
