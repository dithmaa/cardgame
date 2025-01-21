import logoImg from "../../assets/img/logo.png";
import { ReactComponent as CardsSvg } from "../../assets/img/icon/cards.svg";
import { ReactComponent as ChampionSvg } from "../../assets/img/icon/champion.svg";
import { ReactComponent as SackSvg } from "../../assets/img/icon/sack-ton.svg";
import WalletSvg from "../..//assets/img/icon/wallet.svg";
import { Link } from "react-router";

const tg = window.Telegram?.WebApp;

export const HomePage = () => {
  console.log(tg);
  return (
    <div className="home-page">
      <div className="container" style={{ paddingTop: "25px" }}>
        <div className="main-page flex fdc aic">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>
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
