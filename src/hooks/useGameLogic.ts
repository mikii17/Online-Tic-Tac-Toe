import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { GameStatus } from "../types/gameStatusType";
import { isTicTacToeComplete } from "../utiles";
import { UserContext } from "../App";

type Turn = 0 | 1;
type DataType = {
  user1: string | undefined;
  user2: string | undefined;
  game: string[] | undefined;
  gameStatus: GameStatus;
  turn: Turn | undefined;
  winner: string | undefined;
  winningLine: [number, number, number] | undefined | null;
  score: [number, number] | undefined;
};

export default function useGameLogic({ roomId }: { roomId: string }) {
  const { username } = useContext(UserContext);

  // Define states

  const [userData, setUserData] = useState({ user1: "", user2: "" });
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.waiting);
  const [turn, setTurn] = useState<Turn>(0);
  const [winner, setWinner] = useState("");
  const [winningLine, setWinningLine] = useState<
    [number, number, number] | null
  >();
  const [score, setScore] = useState<[number, number]>([0, 0]);
  
  const [game, setGame] = useState(["", "", "", "", "", "", "", "", ""]);
  
  const showReplayModal = gameStatus === GameStatus.win || gameStatus === GameStatus.tie;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "room", roomId), (doc) => {
      if (!doc.exists()) {
        console.log("No such document!");
        //TODO: handle error
      }

      const data: DataType = doc.data() as DataType;

      if (data.gameStatus === GameStatus.waiting) {
        setGameStatus(GameStatus.waiting);
        return;
      }
      setUserData({ user1: data.user1!, user2: data.user2! });
      setGame(data.game || ["", "", "", "", "", "", "", "", ""]);
      setGameStatus(data.gameStatus);
      setTurn(data.turn || 0);
      setWinner(data.winner || "");
      setWinningLine(data.winningLine || null);
      setScore(data.score || [0, 0]);

      return () => {
        unsub();
      };
    });
  }, []);

  const updateDB = async (data: any) => {
    await updateDoc(doc(db, "room", roomId), data);
  };

  // Check if game is complete

  useEffect(() => {
    if (gameStatus !== GameStatus.playing) return;
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
    }
    updateDB({
      game,
      gameStatus,
      turn,
      winner,
      winningLine: winningLine || null,
      score,
    });
  }, [
    game,
    setTurn,
    setGameStatus,
    setWinner,
    setWinningLine,
    setScore,
    setGame,
    setUserData,
    roomId,
  ]);

  // Reset game

  const reset = () => {
    setGameStatus(GameStatus.playing);
    setGame(["", "", "", "", "", "", "", "", ""]);
    setWinner("");
    setWinningLine(null);
  };

  // Handle click

  const handleClick = (index: number) => {
    if (
      !(username === userData.user1 && turn === 0) &&
      !(username === userData.user2 && turn === 1)
    )
      return;
    if (gameStatus === GameStatus.playing && game[index] === "") {
      const newGame = [...game];
      newGame[index] = turn === 0 ? "x" : "o";
      setGame(newGame);
    }
  };

  // Return values

  return {
    userData,
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
