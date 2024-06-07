import React from "react";

const ScoreBoard = ({scores, xTurn, players}) => {
  const { xScore, oScore, draw } = scores;
  return (
    <div className="scoreboard">
      <span className={`score x-score ${!xTurn && "inactive"}`}>{players.playerOneName} - {xScore}</span>
      <span className={`score draw`}>Draw - {draw}</span>
      <span className={`score o-score ${xTurn && "inactive"}`}>{players.playerTwoName} - {oScore}</span>
    </div>
  );
};

export default ScoreBoard;
