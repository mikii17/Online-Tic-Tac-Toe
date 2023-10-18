type ScoreBoardProps = {
    user1: string;
    user2: string;
    score: [number, number];
};
export default function ScoreBoard({user1, user2, score}: ScoreBoardProps){
    return (
        <div>
            <h2>{user1}: {score[0]}</h2>
            <h2>{user2}: {score[1]}</h2>
        </div>
    )
}