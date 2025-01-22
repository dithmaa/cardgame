import logoImg from "../../assets/img/logo.png";
import CardsSvg from "../../assets/img/icon/cards.svg";
import ChampionSvg from "../../assets/img/icon/champion.svg";
import SackSvg from "../../assets/img/icon/sack-ton.svg";
import WalletSvg from "../..//assets/img/icon/wallet.svg";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const tg = window.Telegram?.WebApp;

export const HomePage = () => {
  const [userName, setName] = useState("");

  console.log("telegram", tg?.initDataUnsafe);
  useEffect(() => {
    setName(String(tg?.initDataUnsafe?.user?.first_name));
  }, [tg?.initDataUnsafe]);

  return (
    <div className="home-page">
      <div className="container" style={{ paddingTop: "25px" }}>
        <div className="main-page flex fdc aic">
          <div className="logo">
            <img src={logoImg} alt="" />
          </div>
          <h1 style={{ color: "white" }}>{userName ? userName : "Name"}</h1>
          <div className="actions">
            <div className="actions__item">
              <Link to="/game" className="actions__item_btn">
                <img src={CardsSvg} alt="" />
                <span>Play</span>
              </Link>
            </div>
            <div className="actions__item">
              <Link to="/top" className="actions__item_btn">
                <img src={ChampionSvg} alt="" />
                <span>Top</span>
              </Link>
            </div>
            <div className="actions__item">
              <Link to={"/earn"} className="actions__item_btn">
                <img src={SackSvg} alt="" />
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
