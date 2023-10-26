import { Link } from "react-router-dom";
import { useState } from "react";

import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../context/AuthContext";

export default function Create() {
  const { username } = useUser()!;
  const [state, setState] = useState<"idle" | "submitting">("idle");
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  const generateRoom = async () => {
    setState("submitting");
    const docRef = await addDoc(collection(db, "room"), {
      user1: username,
      user2: "",
      turn: "x",
      winner: "",
      game: ["", "", "", "", "", "", "", "", ""],
      winningLine: [],
      score: [0, 0],
      gameStatus: "waiting",
    });
    setState("idle");
    setRoomId(docRef.id);
    setIsRoomCreated(true);
  };

  return (
    <div>
      <h1>Create</h1>
      <p>
        Click Generate Room to get the URL to your room. Then copy and share the
        URL to your opponent. Finally when you are ready click Play Game button
        to get redirected to the game.
      </p>
      {!isRoomCreated ? (
        <button onClick={generateRoom} disabled={state === "submitting"}>{ state === "submitting" ? "Generating" : "Generate"} Room</button>
      ) : (
        <p>http://localhost:5173/game/{roomId}</p> // Change to correct domain
      )}
      {isRoomCreated && (
        <Link to={`/game/${roomId}`} state={{from: "/join"}}>Play Game</Link>
      )}
    </div>
  );
}
