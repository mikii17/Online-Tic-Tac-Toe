import useAvatarUri from "../hooks/useAvatarUri"

type ScoreBoardProps = {
    user1: string;
    user2: string;
    score: number[]  //[number, number];
    turn: 0 | 1;
    handleLeave?: () => void;
};
export default function ScoreBoard({user1, user2, score, turn, handleLeave}: ScoreBoardProps){
    const avatarUri1 = useAvatarUri(user1);
    const avatarUri2 = useAvatarUri(user2);
    return (
        <div className="pt-5 flex justify-around align-middle">
            <div>
                <img src={avatarUri1} alt="avatar for user one" className={` rounded-full ${
                    turn === 0 ? "outline-4 outline outline-green-500 scale-105" : ""} transition-all duration-100 ease-linear` } />
                <p className="text-center">{user1}</p>
            </div>
            <div className="flex">
                <p className="text-6xl text-center mr-3">{score[0]}</p>
                <button className="" onClick={handleLeave}>Leave</button>
                <p className="text-6xl text-center ml-3">{score[1]}</p>
            </div>
            <div>
                <img src={avatarUri2} alt="avatar for user two" className={` rounded-full ${
                    turn === 1 ? "outline-4 outline outline-green-500 scale-105" : ""} transition-all duration-100 ease-linear` }/>
                <p className="text-center">{user2}</p>
            </div>
        </div>
    )
}