import ScoreBoard from "../components/ScoreBoard";
import useGameLogic from "../hooks/useGameLogic";
import { GameStatus } from "../types/gameStatusType";


export default function Game() {
  const data = { user1: "Dany", user2: "Estif" };
  const {
    game,
    handleClick,
    showReplayModal,
    gameStatus,
    winner,
    winningLine,
    score,
    turn,
    reset,
  } = useGameLogic();
  
  return (
    <main className="flex flex-col justify-center min-h-screen">
      {showReplayModal && (
        <div className="absolute z-10 bg-slate-500 opacity-90 flex flex-col justify-center items-center min-h-screen min-w-full">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center">
              {gameStatus === GameStatus.tie
                ? "It's a tie!"
                : `${winner === "x" ? data.user1 : data.user2} is the winner!`}
            </h1>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
              onClick={reset}
            >
              Play again
            </button>
          </div>
        </div>
      )}

      <section>
        <ScoreBoard
          user1={data.user1}
          user2={data.user2}
          score={score}
          turn={turn}
        />
      </section>
      <section className="flex justify-center items-center grow-[1]">
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
    </main>
  );
}
