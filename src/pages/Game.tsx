import ScoreBoard from "../components/ScoreBoard";

export default function Game() {
  const data = { user1: "mickey", user2: "Estif", score: [0, 0] };
  return (
    <>
      <ScoreBoard user1={data.user1} user2={data.user2} score={data.score}/>
    </>
  );
}
