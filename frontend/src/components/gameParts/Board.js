import Square from "./Square";


export const Board = ({ board, squareEvent, disabled }) => {
  return (
    <div className="board">
      {board.map((value, index) => {
        return <Square value={value} key={index} squareEvent={() => value === null && squareEvent(index)} disabled={disabled} />;
      })}
    </div>
  );
};
