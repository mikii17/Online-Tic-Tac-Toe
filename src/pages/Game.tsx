import { useAvatarUri } from "../hooks/useAvatarUri"

export default function Game(){
    const data = {user1 : "mickey", user2: "Estif", score: [0, 0]}
    const avatarUri1 = useAvatarUri(data.user1);
    const avatarUri2 = useAvatarUri(data.user2);
    return (
        <div>
            <img src={avatarUri1} alt="avatar for user one" />
            <img src={avatarUri2} alt="avatar for user two" />
        </div>
    )
}