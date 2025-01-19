import React from "react";
import confirmBtn from "../../../assets/img/btn/confirm-btn.png";
import { CardColor } from "../../../pages/GamePage/CardColor";

type ConfirmBetProps = {
  selectedColor: CardColor | null;
  handleConfirm: () => void;
};

export const ConfirmBet: React.FC<ConfirmBetProps> = ({
  selectedColor,
  handleConfirm,
}) => {
  return (
    <div className="game__bet_handle">
      <div
        className={`game__bet_confirm game__bet_item ${
          !selectedColor ? "disabled" : ""
        }`}
        onClick={selectedColor ? handleConfirm : undefined}
      >
        <img src={confirmBtn} alt="Confirm" />
      </div>
    </div>
  );
};
