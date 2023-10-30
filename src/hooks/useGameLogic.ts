import { useEffect, useState } from "react";
import { Timestamp, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

import { GameStatus } from "../types/gameStatusType";
import { isTicTacToeComplete } from "../utiles";
import { useUser } from "../context/AuthContext";
import { redirect } from "react-router-dom";

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
        //TODO: handle error
        return redirect("/join");
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

  // useEffect(() => {
  //   if (gameStatus !== GameStatus.playing) return;
  //   if (
  //     !(username === userData.user1 && turn === 0) &&
  //     !(username === userData.user2 && turn === 1)
  //   )
  //     return;
  // }, [
  //   game,
  //   gameStatus,
  //   turn,
  //   username,
  //   userData.user1,
  //   userData.user2,
  //   winner,
  //   winningLine,
  //   score,
  //   setTurn,
  //   setGameStatus,
  //   setWinner,
  //   setWinningLine,
  //   setScore,
  //   setGame,
  //   setUserData,
  //   roomId,
  // ]);

  // Reset game

  const reset = () => {
    updateDB({
      game: ["", "", "", "", "", "", "", "", ""],
      gameStatus: GameStatus.playing,
      turn: turn,
      winner: "",
      winningLine: null,
      updatedAt: Timestamp.now(),
    });

    // setGameStatus(GameStatus.playing);
    // setGame(["", "", "", "", "", "", "", "", ""]);
    // setWinner("");
    // setWinningLine(null);
  };
  const handleLeave = async () => {
    if (username === userData.user1) {
       await deleteDoc(doc(db, "room", roomId));
    } else if (username === userData.user2){
      updateDB({
        user2: "",
        gameStatus: GameStatus.waiting,
        game: ["", "", "", "", "", "", "", "", ""],
        turn: 0,
        winner: "",
        winningLine: null,
        score: [0, 0],
        updatedAt: Timestamp.now(),
      });
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
        // setGameStatus(GameStatus.tie);
        newGameStatus = GameStatus.tie;
      } else if (result === "Incomplete") {
        // setTurn((prevTurn) => (prevTurn === 0 ? 1 : 0));
        newTurn = turn === 0 ? 1 : 0;
      } else {
        // setGameStatus(GameStatus.win);
        newGameStatus = GameStatus.win;

        // setWinner(result.winner);
        newWinner = result.winner;

        // setWinningLine(result.winLine);
        newWinningLine = result.winLine;

        // setScore((prevScore) => {
        //   if (result.winner === "x") {
        //     return [prevScore[0] + 1, prevScore[1]];
        //   } else {
        //     return [prevScore[0], prevScore[1] + 1];
        //   }
        // });
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
