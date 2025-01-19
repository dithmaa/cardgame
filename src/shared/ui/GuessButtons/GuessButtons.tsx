import { CardColor } from "../../../pages/GamePage/CardColor";
import redBtn from "../../../assets/img/btn/red.png";
import blackBtn from "../../../assets/img/btn/black.png";
type GuessButtonsProps = {
  selectedColor: CardColor | null;
  handleColorSelect: (color: CardColor) => void;
};

export const GuessButtons: React.FC<GuessButtonsProps> = ({
  selectedColor,
  handleColorSelect,
}) => {
  return (
    <div className="game__guess flex">
      <div
        className={`game__guess_item ${
          selectedColor === CardColor.Red ? "selected" : ""
        }`}
        onClick={() => handleColorSelect(CardColor.Red)}
      >
        <span>Red</span>
        <img src={redBtn} alt="Red" />
      </div>
      <div
        className={`game__guess_item ${
          selectedColor === CardColor.Black ? "selected" : ""
        }`}
        onClick={() => handleColorSelect(CardColor.Black)}
      >
        <span>Black</span>
        <img src={blackBtn} alt="Black" />
      </div>
    </div>
  );
};
