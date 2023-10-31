import { useEffect, useState } from "react";
import {
  Timestamp,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { GameStatus } from "../types/gameStatusType";
import { isTicTacToeComplete } from "../utiles";
import { useUser } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Turn = 0 | 1;
type DataType = {
  user1: string | undefined;
  user2: string | undefined;
  game: string[] | undefined;
  gameStatus: GameStatus;
  turn: Turn | undefined;
  winner: string | undefined;
  winningLine: [number, number, number] | null;
  score: [number, number] | undefined;
};

export default function useGameLogic({ roomId }: { roomId: string }) {
  const navigate = useNavigate();
  const { username } = useUser() as { username: string };

  // Define states

  const [userData, setUserData] = useState({ user1: "", user2: "" });
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.waiting);
  const [turn, setTurn] = useState<Turn>(0);
  const [winner, setWinner] = useState("");
  const [winningLine, setWinningLine] = useState<
    [number, number, number] | null
  >(null);
  const [score, setScore] = useState<[number, number]>([0, 0]);

  const [game, setGame] = useState(["", "", "", "", "", "", "", "", ""]);

  const showReplayModal =
    gameStatus === GameStatus.win || gameStatus === GameStatus.tie;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "room", roomId), (doc) => {
      if (!doc.exists()) {
        console.log("No such document!");
        return navigate("/create");
      }

      const data: DataType = doc.data() as DataType;

      if (data.gameStatus === GameStatus.waiting) {
        setGameStatus(GameStatus.waiting);
        setUserData({ user1: data.user1!, user2: data.user2! });
        setGame(data.game || ["", "", "", "", "", "", "", "", ""]);
        setTurn(data.turn || 0);
        setWinner(data.winner || "");
        setWinningLine(data.winningLine || null);
        setScore(data.score || [0, 0]);
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

  // Reset game

  const reset = () => {
    updateDB({
      game: ["", "", "", "", "", "", "", "", ""],
      gameStatus: GameStatus.playing,
      turn: turn === 0 ? 1 : 0,
      winner: "",
      winningLine: null,
      updatedAt: Timestamp.now(),
    });

  };
  const handleLeave = async () => {
    if (username === userData.user1) {
      await deleteDoc(doc(db, "room", roomId));
    } else if (username === userData.user2) {
      await updateDB({
        user2: "",
        gameStatus: GameStatus.waiting,
        game: ["", "", "", "", "", "", "", "", ""],
        turn: 0,
        winner: "",
        winningLine: null,
        score: [0, 0],
        updatedAt: Timestamp.now(),
      });
      navigate("/create")
    }
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
      const result = isTicTacToeComplete(newGame);
      let newGameStatus: GameStatus = GameStatus.playing;
      let newTurn: Turn = turn;
      let newWinner: string = winner;
      let newWinningLine: [number, number, number] | null = winningLine;
      let newScore: [number, number] = score;

      if (result === "Draw") {
        newGameStatus = GameStatus.tie;
      } else if (result === "Incomplete") {
        newTurn = turn === 0 ? 1 : 0;
      } else {
        newGameStatus = GameStatus.win;

        newWinner = result.winner;

        newWinningLine = result.winLine;

        newScore =
          result.winner === "x"
            ? [score[0] + 1, score[1]]
            : [score[0], score[1] + 1];
      }
      updateDB({
        game: newGame,
        gameStatus: newGameStatus,
        turn: newTurn,
        winner: newWinner,
        winningLine: newWinningLine,
        score: newScore,
        updatedAt: Timestamp.now(),
      });
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
    handleLeave,
    reset,
    handleClick,
  };
}
