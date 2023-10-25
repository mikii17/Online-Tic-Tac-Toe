import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
  Link,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../context/AuthContext";

// type ActionResponse = {
//   error: string | null;
//   redirect: string | null;
//   username: string | null;
//   roomId: string | null;
// };

// export async function action({ request }: { request: Request }) {
//   const formData = await request.formData();
//   const username = formData.get("username");

//   if (username === null || username === "") {
//     return {
//       error: "User name is required",
//       redirect: null,
//     };
//   }
//   try {
//     // TODO: Make fetch request to server to create room
//     const docRef = await addDoc(collection(db, "room"), {
//       user1: username,
//       user2: "",
//       turn: "x",
//       winner: "",
//       game: ["", "", "", "", "", "", "", "", ""],
//       winningLine: [],
//       score: [0, 0],
//       gameStatus: "waiting",
//     });

//     return {
//       redirect: `/game/${docRef.id}`, //TODO: rediret: "/game/${roomId}",
//       error: null,
//       username: username as string,
//     };
//   }catch(error: any) { // !!ANY
//     return {
//       error: error.message,
//       redirect: null,
//     };
//   }
// }

export default function Create() {
  const navigate = useNavigate();
  const { username } = useUser()!;
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  // const state = useNavigation().state;
  // const actionResponse = useActionData() as ActionResponse | null;

  // useEffect(() => {
  //   if (actionResponse?.redirect && actionResponse?.username) {
  //     navigate(actionResponse.redirect);
  //   }
  // }, [actionResponse]);
  const generateRoom = async () => {
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
    setRoomId(docRef.id);
    setIsRoomCreated(true);
  }

  return (
    <div>
      <h1>Create</h1>
      <p>
        Click Generate Room to get the URL to your room. Then copy and share the
        URL to your opponent. Finally when you are ready click Play Game button
        to get redirected to the game.
      </p>
      {!isRoomCreated ? (
        <button onClick={generateRoom}>Generate Room</button>
      ) : (
        <p>https://localhost:5173/game/{roomId}</p> // Change to correct domain
      )}
      {!isRoomCreated && <Link to={`https://localhost:5173/game/${roomId}`}>Play Game</Link>}
      {/* <Form method="POST">
        {state === "idle" && actionResponse?.error && (
          <p>{actionResponse.error}</p>
        )}
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Creating..." : "Create"}
        </button>
      </Form> */}
    </div>
  );
}
