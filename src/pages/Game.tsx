import { useParams } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import useGameLogic from "../hooks/useGameLogic";
import { GameStatus } from "../types/gameStatusType";
import FullpageModal from "../components/FullpageModal";
import BoxSkeleton from "../components/BoxSkeleton";

import Copy from "../components/Copy";

export default function Game() {
  const { roomId } = useParams();

  const {
    userData,
    game,
    handleClick,
    handleLeave,
    showReplayModal,
    gameStatus,
    winner,
    winningLine,
    score,
    turn,
    reset,
  } = useGameLogic({ roomId: roomId! });

  if (gameStatus === GameStatus.waiting) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center gap-10">
        <p className="text-2xl sm:text-3xl font-bold text-center">
          Waiting for another player...
        </p>
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
          {/**TODO: Change to correct domain */}
          <p className="w-fit relative text-xs sm:text-base text-skin-muted-button pb-2 bg-gradient-to-r from-hue-base via-hue-base to-hue-inverted bg-[length:100%_4px] bg-no-repeat bg-bottom">
            http://localhost:5173/game/{roomId}
          </p>
          <Copy copyMsg={`http://localhost:5173/game/${roomId}`} />
          {/* <button onClick={} className="flex gap-3 items-center">
            <img className="w-6 h-6 sm:w-8 sm:h-8" src={copy} alt="copy icon"/>
            <p className=" text-skin-muted-button">Copy</p>
          </button> */}
        </div>
        <BoxSkeleton />
        <button
          onClick={handleLeave}
          className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline"
        >
          Leave Room
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-20">
      {showReplayModal && (
        // <div className="absolute z-10 bg-slate-500 opacity-90 flex flex-col justify-center items-center min-h-screen min-w-full">
        //   <div className="flex flex-col justify-center items-center">
        //     <h1 className="text-4xl font-bold text-center">
        //       {gameStatus === GameStatus.tie
        //         ? "It's a tie!"
        //         : `${winner === "x" ? userData.user1 : userData.user2} is the winner!`}
        //     </h1>
        //     <button
        //       className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
        //       onClick={reset}
        //     >
        //       Play again
        //     </button>
        //   </div>
        // </div>
        <FullpageModal>
          <>
            <h1 className="text-4xl font-bold text-center text-skin-muted">
              {gameStatus === GameStatus.tie
                ? "It's a tie!"
                : `${
                    winner === "x" ? userData.user1 : userData.user2
                  } is the winner!`}
            </h1>
            <button
              className="px-10 py-4 rounded-md text-skin-muted-button bg-skin-button-base disabled:opacity-75"
              onClick={reset}
            >
              Play again
            </button>
          </>
        </FullpageModal>
      )}

      <section>
        <ScoreBoard
          user1={userData.user1}
          user2={userData.user2}
          score={score}
          turn={turn}
        />
      </section>
      <section className="flex justify-center items-center">
        <div className="box">
          {game.map((val, index) => {
            return (
              <div
                onClick={() => handleClick(index)}
                className={`${
                  val === "" ? "no-tic" : val === "x" ? "x-tic" : "o-tic"
                } ${
                  gameStatus === GameStatus.win
                    ? winningLine?.includes(index)
                      ? "win"
                      : ""
                    : ""
                }`}
              ></div>
            );
          })}
        </div>
      </section>
      <section className="flex justify-center items-center">
        <button
          onClick={handleLeave}
          className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline"
        >
          Leave Room
        </button>
      </section>
    </main>
  );
}
