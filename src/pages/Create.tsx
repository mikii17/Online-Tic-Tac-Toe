import { Link } from "react-router-dom";
import { useState } from "react";

import { db } from "../config/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useUser } from "../context/AuthContext";

import logo from "../assets/logoSVG.svg";
import Copy from "../components/Copy";

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
      turn: 0,
      winner: "",
      game: ["", "", "", "", "", "", "", "", ""],
      winningLine: [],
      score: [0, 0],
      gameStatus: "waiting",
      updatedAt: Timestamp.now(),
    });
    setState("idle");
    setRoomId(docRef.id);
    setIsRoomCreated(true);
  };
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-44 h-44 lg:w-60 lg:h-60 " />
      </Link>
      <h1 className="font-bold text-4xl sm:text-5xl">Create Room</h1>
      <p className="px-5 text-center text-skin-muted text-base md:text-lg leading-8 sm:max-w-xl lg:max-w-3xl ">
        Click Generate Room to get the URL to your room. Then copy and share the
        URL to your opponent. Finally when you are ready click Play Game button
        to get redirected to the game.
      </p>
      {!isRoomCreated ? (
        <button
          onClick={generateRoom}
          disabled={state === "submitting"}
          className="relative px-10 py-4 rounded-md text-skin-muted-button bg-skin-button-base transition-all duration-300 ease-in-out
                    hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-base hover:via-hue-base hover:to-hue-base bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
                    before:w-0 before:bg-skin-button-muted/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md"
        >
          {state === "submitting" ? "Generating" : "Generate"} Room
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
          {/**TODO: Change to correct domain */}
          <p className="w-fit relative text-xs sm:text-base text-skin-muted-button pb-2 bg-gradient-to-r from-hue-base via-hue-base to-hue-inverted bg-[length:100%_4px] bg-no-repeat bg-bottom">
          https://online-tic-tac-toe-sigma.vercel.app/game/{roomId}
          </p>
          <Copy copyMsg={`https://online-tic-tac-toe-sigma.vercel.app/game/${roomId}`} />
          {/* <button className="flex gap-3 items-center" onClick={copyLink}>
          <img className="w-6 h-6 sm:w-8 sm:h-8" src={copy} alt="copy icon"/>
          <p className="text-skin-muted-button">Copy</p>
        </button> */}
        </div>
      )}
      {isRoomCreated && (
        <Link
          to={`/game/${roomId}`}
          state={{ from: "/join" }}
          className="relative px-10 py-4 rounded-md text-skin-inverted bg-skin-button-muted transition-all duration-300 ease-in-out
          hover:text-skin-muted-button hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-inverted hover:via-hue-inverted hover:to-hue-inverted bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
          before:w-0 before:bg-skin-button-base/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md"
        >
          Play Game
        </Link>
      )}
      <Link
        to="/join"
        className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline"
      >
        Already created room? Join here!
      </Link>
    </main>
  );
}
