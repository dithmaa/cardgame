export const GuessedRow = ({ guessedCount }: { guessedCount: number }) => {
  return (
    <div className="game__guessed">
      <div className="game__guessed_plaque">
        Guessed cards in a row: <span>{guessedCount}</span>
      </div>
    </div>
  );
};
