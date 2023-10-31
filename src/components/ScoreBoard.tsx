import useAvatarUri from "../hooks/useAvatarUri";

type ScoreBoardProps = {
  user1: string;
  user2: string;
  score: number[]; //[number, number];
  turn: 0 | 1;
};
export default function ScoreBoard({
  user1,
  user2,
  score,
  turn,
}: ScoreBoardProps) {
  const avatarUri1 = useAvatarUri(user1);
  const avatarUri2 = useAvatarUri(user2);
  return (
    <div className="pt-5 flex justify-center items-center gap-20">
      <div className="flex flex-col gap-3">
        <img
          src={avatarUri1}
          alt="avatar for user one"
          className={` rounded-full ${
            turn === 0
              ? "outline-4 outline outline-[rgb(--color-text-muted)] -outline-offset-2 scale-105"
              : ""
          } transition-all duration-100 ease-linear rounded-[50%]`}
        />
        <p className="text-center text-lg font-bold">{user1}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-6xl text-center">{score[0]}</p>
        <p className="text-6xl text-center">-</p>
        <p className="text-6xl text-center">{score[1]}</p>
      </div>
      <div className="flex flex-col gap-3">
        <img
          src={avatarUri2}
          alt="avatar for user two"
          className={` rounded-full ${
            turn === 1
              ? "outline-4 outline outline-[rgb(--color-text-muted)] -outline-offset-2 scale-105"
              : ""
          } transition-all duration-100 ease-linear`}
        />
        <p className="text-center text-lg font-bold">{user2}</p>
      </div>
    </div>
  );
}
