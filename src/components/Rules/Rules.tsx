import rulesBtnImg from "../../assets/img/cards/next-btn.png";

export const Rules = () => {
  return (
    <div className="rules-section">
      <div className="overlay"></div>
      <div className="rules">
        <h3 className="rules-title">Welcome to the game "Red or Black."</h3>
        <b className="rules-subtitle">Rules</b>
        <b className="rules-describtion">
          The game involves a deck of 52 cards. You have to guess the color of
          the cards, the the more times in a row you guess the more you win.
        </b>
        <b className="rules-gray" style={{ color: "gray" }}>
          Each round the winnings are multiplied by:
        </b>
        <div className="rules-table" style={{ display: "flex" }}>
          <div className="rules-table__column">
            <div className="rules-table__item">1-round = x 1.25</div>
            <div className="rules-table__item">2-round = x 1.5</div>
            <div className="rules-table__item">3-round = x 2</div>
            <div className="rules-table__item">4-round = x 3</div>
            <div className="rules-table__item">5-round = x 5</div>
          </div>
          <div className="rules-table__column">
            <div className="rules-table__item">6-round = x 7</div>
            <div className="rules-table__item">7-round = x 10</div>
            <div className="rules-table__item">8-round = x 25</div>
            <div className="rules-table__item">9-round = x 50</div>
            <div className="rules-table__item">10-round = x100</div>
          </div>
        </div>
        <button className="rules-next">
          <img src={rulesBtnImg} alt="" />
        </button>
      </div>
    </div>
  );
};
