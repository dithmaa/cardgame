import { useState } from "react";
import cardBack from "../../assets/img/cardss/54.png";
import { Header } from "../../components";
import { CardColor } from "./CardColor";
import {
  isRedCard,
  calculateMultiplier,
  loadCardImages,
  revealFinalCard,
  shuffleDeck,
} from "../../shared/utils/gameUtils";
import {
  BidPanel,
  ResultModal,
  CardPlace,
  GuessButtons,
  ConfirmBet,
  GuessedRow,
} from "../../shared/ui";

const cardImages = loadCardImages(54);

export const GamePage = () => {
  const [bidCount, setBidCount] = useState(0.01);
  const [currentCard, setCurrentCard] = useState(cardBack);
  const [guessedCount, setGuessedCount] = useState(0);
  const [deck, setDeck] = useState(shuffleDeck(cardImages));
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedColor, setSelectedColor] = useState<CardColor | null>(null);
  const [resultMessage, setResultMessage] = useState("");
  const [isWin, setIsWin] = useState(false);

  // Увеличение и уменьшение ставки
  const increaseBidCount = () => {
    setBidCount((bid) => parseFloat((bid + 0.01).toFixed(2)));
  };

  // Уменьшение ставки
  const decreaseBidCount = () => {
    if (bidCount > 0.01) {
      setBidCount((bid) => parseFloat((bid - 0.01).toFixed(2)));
    }
  };

  // Выбор цвета
  const handleColorSelect = (color: CardColor) => {
    if (isShuffling) return;
    setSelectedColor(color);
  };

  // Подтверждение ставки
  const handleConfirm = () => {
    if (!selectedColor || deck.length === 0 || isShuffling) return;

    setIsShuffling(true);
    setResultMessage("");
    shuffleAndReveal(selectedColor);
  };

  // Логика для выбора и показа карты
  const shuffleAndReveal = (color: CardColor) => {
    const shuffleCount = 15;
    let currentShuffle = 0;

    const interval = setInterval(() => {
      currentShuffle++;
      const randomCard = deck[Math.floor(Math.random() * deck.length)];
      setCurrentCard(randomCard);

      if (currentShuffle === shuffleCount) {
        clearInterval(interval);

        const nextCard = deck[0]; // Берем первую карту из колоды
        revealFinalCard(
          color,
          nextCard,
          cardImages,
          guessedCount,
          setGuessedCount,
          setResultMessage,
          setIsWin,
          setCurrentCard,
          setDeck,
          setIsShuffling,
          deck.slice(1), // Удаляем карту из колоды
          isRedCard,
          calculateMultiplier
        );

        // Проверяем, не закончилась ли колода
        if (deck.length === 1) {
          setDeck(shuffleDeck(cardImages)); // Перетасовываем новую колоду
        }
      }
    }, 100);
  };

  // Сброс перед следующим раундом
  const handleNext = () => {
    setResultMessage("");
    setSelectedColor(null);
    setCurrentCard(cardBack); // Закрываем карту
  };

  return (
    <div className="game-page">
      <Header />
      <div className="container">
        <GuessedRow guessedCount={guessedCount} />
        <BidPanel
          bidCount={bidCount}
          increaseBidCount={increaseBidCount}
          decreaseBidCount={decreaseBidCount}
        />
        <CardPlace currentCard={currentCard} />
        {resultMessage && <div className="overlay"></div>}
        {resultMessage && (
          <ResultModal resultMessage={resultMessage} handleNext={handleNext} />
        )}
        <ConfirmBet
          selectedColor={selectedColor}
          handleConfirm={handleConfirm}
        />
        <GuessButtons
          selectedColor={selectedColor}
          handleColorSelect={handleColorSelect}
        />
      </div>
    </div>
  );
};
