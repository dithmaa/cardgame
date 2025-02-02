import { useWalletContext } from "../../shared/context/WalletContext";
import backArrow from "../../assets/img/icon/back-arrow.png";
import miniLogo from "../../assets/img/mini-logo.png";
import tonIcon from "../../assets/img/icon/ton.png";
import { Link } from "react-router-dom";

export const Header = () => {
  const { balance } = useWalletContext();

  return (
    <header className="header">
      <div className="top-page">
        <div className="container">
          <div className="game-header flex jcsb aic">
            <Link to={"/"} className="game__back">
              <img src={backArrow} alt="" />
            </Link>
            <div className="game-header__right flex aic">
              <div className="game__logo">
                <img src={miniLogo} alt="" />
              </div>
              <div className="game__ton">
                <img src={tonIcon} alt="" />
                <span>{balance !== null ? balance.toFixed(2) : "0"}</span>
                <img src={tonIcon} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
