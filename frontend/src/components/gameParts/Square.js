// To make squares on the board
const Square = ({ value, squareEvent, disabled }) => {
  const style = value === "X" ? "box-x" : "box-o";
  return (
    <button type="button" className={style} onClick={squareEvent} disabled={disabled} >
      {value}
    </button>
  );
};

export default Square;