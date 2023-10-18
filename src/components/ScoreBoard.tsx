import { useAvatarUri } from "../hooks/useAvatarUri"

type ScoreBoardProps = {
    user1: string;
    user2: string;
    score: number[]  //[number, number];
};
export default function ScoreBoard({user1, user2, score}: ScoreBoardProps){
    const avatarUri1 = useAvatarUri(user1);
    const avatarUri2 = useAvatarUri(user2);
    return (
        <div className="pt-5 flex justify-around align-middle">
            <div>
                <img src={avatarUri1} alt="avatar for user one" />
                <p className="text-center">{user1}</p>
            </div>
            <div className="flex">
                <p className="text-6xl text-center mr-3">{score[0]}</p>
                <button className="">Leave</button>
                <p className="text-6xl text-center ml-3">{score[1]}</p>
            </div>
            <div>
                <img src={avatarUri2} alt="avatar for user two" />
                <p className="text-center">{user2}</p>
            </div>
        </div>
    )
}