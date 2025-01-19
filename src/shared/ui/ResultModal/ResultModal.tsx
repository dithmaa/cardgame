import nextBtnImg from "../../../assets/img/btn/next.svg";

type ResultModalProps = {
  resultMessage: string;
  handleNext: () => void;
};

export const ResultModal: React.FC<ResultModalProps> = ({
  resultMessage,
  handleNext,
}) => {
  return (
    <div className="game__result">
      <div className="win-lose active">
        <div className="win-lose__item">
          <span className={resultMessage === "Lose" ? "red-color" : ""}>
            {resultMessage}
          </span>
        </div>
        {resultMessage === "Lose" && (
          <button onClick={handleNext}>
            <img src={nextBtnImg} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};
