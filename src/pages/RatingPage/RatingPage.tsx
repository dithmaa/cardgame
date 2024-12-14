import ratingPageRedPlaque from "../../assets/img/cards/top-page-red.png";
import ratingPageBlackPlaque from "../../assets/img/cards/top-page-black.png";
import bestPlayersImg from "../../assets/img/cards/best-players.png";
import { Header } from "../../components";

export const RatingPage = () => {
  return (
    <div className="top-page">
      <Header />
      <div className="container">
        <div className="top-page">
          <div className="top-page__info">
            <div className="top-page__info_item">
              <div className="top-page__info_content">
                <span>Players:</span>
                <span>10000</span>
              </div>
              <img src={ratingPageRedPlaque} alt="" />
            </div>
            <div className="top-page__info_item">
              <div className="top-page__info_content">
                <span>Online:</span>
                <span>10000</span>
              </div>
              <img src={ratingPageBlackPlaque} alt="" />
            </div>
          </div>
          <h2 className="h2">Best Players</h2>
          <div className="top-page__players">
            <div className="top-page__players_item">
              <span>1. Players#1</span>
              <img src={bestPlayersImg} alt="" />
            </div>
            <div className="top-page__players_item">
              <span>2. Players#2</span>
              <img src={bestPlayersImg} alt="" />
            </div>
            <div className="top-page__players_item">
              <span>3. Players#3</span>
              <img src={bestPlayersImg} alt="" />
            </div>
            <div className="top-page__players_item">
              <span>4. Players#4</span>
              <img src={bestPlayersImg} alt="" />
            </div>
            <div className="top-page__players_item">
              <span>5. Players#5</span>
              <img src={bestPlayersImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
