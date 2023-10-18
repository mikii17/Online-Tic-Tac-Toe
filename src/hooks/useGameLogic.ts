import { useEffect, useState } from "react";
import { GameStatus } from "../types/gameStatusType";
import { isTicTacToeComplete } from "../utiles";

type Turn = 0 | 1;


export default function useGameLogic() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.playing);
  const [turn, setTurn] = useState<Turn>(0);
  const [winner, setWinner] = useState("");
  const [winningLine, setWinningLine] = useState<
    [number, number, number] | null
  >();
  const [score, setScore] = useState<[number, number]>([0, 0]);
  const [showReplayModal, setShowReplayModal] = useState(false);

  const [game, setGame] = useState(["", "", "", "", "", "", "", "", ""]);

  useEffect(() => {
    const result = isTicTacToeComplete(game);
    if (result === "Draw") {
      setGameStatus(GameStatus.tie);
    } else if (result === "Incomplete") {
      setTurn((prevTurn) => (prevTurn === 0 ? 1 : 0));
    } else {
      setGameStatus(GameStatus.win);
      setWinner(result.winner);
      setWinningLine(result.winLine);
      setScore((prevScore) => {
        if (result.winner === "x") {
          return [prevScore[0] + 1, prevScore[1]];
        } else {
          return [prevScore[0], prevScore[1] + 1];
        }
      });
      setShowReplayModal(true);
    }
  }, [game]);

  const reset = () => {
    setGameStatus(GameStatus.playing);
    setGame(["", "", "", "", "", "", "", "", ""]);
    setShowReplayModal(false);
    setWinner("");
    setWinningLine(null);
  };

  const handleClick = (index: number) => {
    if (gameStatus === GameStatus.playing && game[index] === "") {
      const newGame = [...game];
      newGame[index] = turn === 0 ? "x" : "o";
      setGame(newGame);
    }
  };

  return {
    game,
    gameStatus,
    turn,
    winner,
    winningLine,
    score,
    showReplayModal,
    reset,
    handleClick,
  };
}