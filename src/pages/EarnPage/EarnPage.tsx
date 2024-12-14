import redBtnImg from "../../assets/img/btn/red.png";
import blackBtnImg from "../../assets/img/btn/black.png";
import copyIconImg from "../../assets/img/cards/copy-icon.png";
import { Header } from "../../components";

export const EarnPage = () => {
  return (
    <div className="earn-page">
      <Header />
      <div className="container">
        <div className="earn-page">
          <div className="earn-page__plaque">
            <div className="earn-page__title">You invited</div>
            <div className="earn-page__plaque_info">
              <div className="earn-page__text">All: 0 friends</div>
              <div className="earn-page__text">Active: 0 friends</div>
            </div>
          </div>
          <div className="earn-page__buttons">
            <button className="earn-page__copy">
              <span>Copy</span>
              <img src={redBtnImg} alt="" />
            </button>
            <button className="earn-page__share">
              <span>Share</span>
              <img src={blackBtnImg} alt="" />
            </button>
          </div>
          <div className="earn-page__link">
            <div className="earn-page__title">Your Link:</div>
            <div className="earn-page__l">
              <span data-link="https://www.figma.com/design/IxdNt3n9zklyhgZLVlGlc9/Choose-Card-(Copy)?node-id=0-1&node-type=canvas&t=ys1TOHLx55nVp9SN-0">
                https://www.figma.com/desisn...
              </span>
              <img src={copyIconImg} alt="" />
            </div>
            <p>Get 10 percent of all bets of an invited friend</p>
          </div>
        </div>
      </div>
    </div>
  );
};
