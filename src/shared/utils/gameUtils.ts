import { CardColor } from "../../pages/GamePage/CardColor";
export const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const isRedCard = (index: number): boolean => {
  return index >= 13 && index <= 38;
};

export const calculateMultiplier = (count: number): number => {
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

export const loadCardImages = (count: number): string[] => {
  return Array.from({ length: count }, (_, i) =>
    require(`../../assets/img/cardss/${i + 1}.png`)
  );
};
export const revealFinalCard = (
  color: CardColor,
  nextCard: string,
  cardImages: string[],
  guessedCount: number,
  setGuessedCount: (value: number) => void,
  setResultMessage: (value: string) => void,
  setIsWin: (value: boolean) => void,
  setCurrentCard: (value: string) => void,
  setDeck: (value: string[]) => void,
  setIsShuffling: (value: boolean) => void,
  deck: string[],
  isRedCard: (index: number) => boolean,
  calculateMultiplier: (count: number) => number
) => {
  const cardIndex = cardImages.indexOf(nextCard) + 1;
  const isRed = isRedCard(cardIndex);

  if (
    (color === CardColor.Red && isRed) ||
    (color === CardColor.Black && !isRed)
  ) {
    // Win
    setIsWin(true);
    const multiplier = calculateMultiplier(guessedCount + 1);
    setResultMessage(`Win x${multiplier}`);
    setGuessedCount(guessedCount + 1);
  } else {
    // Lose
    setIsWin(false);
    setResultMessage("Lose");
    setGuessedCount(0);
  }

  setCurrentCard(nextCard); // Показываем финальную карту
  setDeck(deck.slice(1)); // Убираем карту из колоды
  setIsShuffling(false);

  // Закрываем карту и плашку через 3 секунды
  setTimeout(() => {
    setCurrentCard(cardImages[53]); // Устанавливаем рубашку (54.png)
    setResultMessage(""); // Сбрасываем сообщение
    setIsWin(false); // Сбрасываем состояние выигрыша
  }, 3000);
};

export const shuffleDeck = (cardImages: string[]): string[] => {
  const deck = [...cardImages.slice(0, 52)]; // Используем только 52 карты
  return shuffleArray(deck); // Перемешиваем
};
