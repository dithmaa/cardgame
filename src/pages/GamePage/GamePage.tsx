import { useState } from "react";
import cardBack from "../../assets/img/cardss/54.png";
import confirmBtn from "../../assets/img/btn/confirm-btn.png";
import redBtn from "../../assets/img/btn/red.png";
import blackBtn from "../../assets/img/btn/black.png";
import winSvg from "../../assets/img/win.svg";
import loseSvg from "../../assets/img/lose.svg";
import nextBtnImg from "../../assets/img/btn/next.svg";
import { ReactComponent as PlusIcon } from "../../assets/img/icon/plus.svg";
import { ReactComponent as MinusIcon } from "../../assets/img/icon/minus.svg";
import { Header } from "../../components";

enum CardColor {
  Red = "red",
  Black = "black",
}

// Загружаем 54 карты
const cardImages = Array.from({ length: 54 }, (_, i) =>
  require(`../../assets/img/cardss/${i + 1}.png`)
);

export const GamePage = () => {
  const [bidCount, setBidCount] = useState(0.01);
  const [currentCard, setCurrentCard] = useState(cardBack);
  const [guessedCount, setGuessedCount] = useState(0);
  const [deck, setDeck] = useState(shuffleDeck());
  const [isGameOver, setIsGameOver] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedColor, setSelectedColor] = useState<CardColor | null>(null);
  const [resultMessage, setResultMessage] = useState(""); // Новое состояние для сообщения
  const [isWin, setIsWin] = useState(false); // Флаг победы

  function shuffleDeck() {
    return cardImages.slice(0, 52).sort(() => Math.random() - 0.5);
  }

  const increaseBidCount = () => setBidCount((bid) => bid + 0.01);
  const decreaseBidCount = () => {
    if (bidCount > 0.02) setBidCount((bid) => bid - 0.01);
  };

  const handleColorSelect = (color: CardColor) => {
    if (isShuffling) return;
    setSelectedColor(color);
  };

  const handleConfirm = () => {
    if (!selectedColor || deck.length === 0 || isGameOver || isShuffling)
      return;

    setIsShuffling(true);
    setResultMessage("");
    shuffleAndReveal(selectedColor);
  };

  const shuffleAndReveal = (color: CardColor) => {
    const shuffleCount = 15; // Увеличиваем количество перетасовываний на 5 (изначально было 10)
    let currentShuffle = 0;

    const interval = setInterval(() => {
      currentShuffle++;
      const randomCard = deck[Math.floor(Math.random() * deck.length)];
      setCurrentCard(randomCard);

      if (currentShuffle === shuffleCount) {
        clearInterval(interval);
        revealFinalCard(color);
      }
    }, 100); // Скорость перетасовки остается неизменной
  };

  const revealFinalCard = (color: CardColor) => {
    const nextCard = deck[0];
    const cardIndex = cardImages.indexOf(nextCard) + 1;
    const isRed = isRedCard(cardIndex);

    if (
      (color === CardColor.Red && isRed) ||
      (color === CardColor.Black && !isRed)
    ) {
      // Выигрыш
      setIsWin(true);
      const multiplier = calculateMultiplier(guessedCount + 1);
      setResultMessage(`Win x${multiplier}`);
      setGuessedCount(guessedCount + 1);

      // Очищаем сообщение через 3 секунды
      setTimeout(() => {
        setResultMessage("");
      }, 3000);
    } else {
      // Проигрыш
      setIsWin(false);
      setResultMessage("Lose");
      setGuessedCount(0);
    }

    setCurrentCard(nextCard);
    setDeck(deck.slice(1));
    setIsShuffling(false);
  };

  const handleNext = () => {
    setResultMessage(""); // Скрываем окно
  };

  const isRedCard = (index: number) => {
    return index >= 13 && index <= 38;
  };

  const calculateMultiplier = (count: number) => {
    if (count === 1) return 1.25;
    if (count === 2) return 1.5;
    if (count === 3) return 2;
    if (count === 4) return 3;
    if (count === 5) return 5;
    if (count === 6) return 7;
    if (count === 7) return 10;
    if (count === 8) return 25;
    if (count === 9) return 50;
    if (count === 10) return 100;
    return 1;
  };

  return (
    <div className="game-page">
      <Header />

      <div className="container">
        <div className="game__guessed">
          <div className="game__guessed_plaque">
            Guessed cards in a row: <span>{guessedCount}</span>
          </div>
        </div>

        <div className="game__bid flex aic fdc">
          <h3 className="h3">Your bid:</h3>
          <div className="bid flex jcsb">
            <div className="bid__minus" onClick={decreaseBidCount}>
              <MinusIcon />
            </div>
            <span>{String(bidCount).slice(0, 4)}</span>
            <div className="bid__plus" onClick={increaseBidCount}>
              <PlusIcon />
            </div>
          </div>
        </div>

        <div className="game__card">
          <img src={currentCard} alt="Card" />
        </div>
        {resultMessage && <div className="overlay"></div>}
        {resultMessage && (
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
        )}

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
      </div>
    </div>
  );
};
