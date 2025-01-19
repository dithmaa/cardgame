export const CardPlace: React.FC<{ currentCard: string }> = ({
  currentCard,
}) => {
  return (
    <div className="game__card">
      <img src={currentCard} alt="Card" />
    </div>
  );
};
