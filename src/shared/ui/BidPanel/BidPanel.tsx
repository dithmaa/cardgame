import PlusIcon from "../../../assets/img/icon/plus.png";
import MinusIcon from "../../../assets/img/icon/minus.png";

type BidPanelProps = {
  bidCount: number;
  increaseBidCount: () => void;
  decreaseBidCount: () => void;
};

export const BidPanel: React.FC<BidPanelProps> = ({
  bidCount,
  increaseBidCount,
  decreaseBidCount,
}) => {
  return (
    <div className="game__bid flex aic fdc">
      <h3 className="h3">Your bid:</h3>
      <div className="bid flex jcsb">
        <div className="bid__minus" onClick={decreaseBidCount}>
          <img src={MinusIcon} alt="" />
        </div>
        <span>{String(bidCount).slice(0, 4)}</span>
        <div className="bid__plus" onClick={increaseBidCount}>
          <img src={PlusIcon} alt="" />
        </div>
      </div>
    </div>
  );
};
