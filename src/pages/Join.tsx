import {
  Form,
  useNavigation,
  useActionData,
  useParams,
  useNavigate
} from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../App";
import useOnChange from "../hooks/useOnChange";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

type ActionResponse = {
  error: string | null;
  redirect: string | null;
  username: string | null;
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const roomId = formData.get("roomId");

  if (username === null || username === "") {
    return {
      error: "User name is required",
      redirect: null,
    };
  }

  if (roomId === null || roomId === "") {
    return {
      error: "Room Id is required",
      redirect: null,
    };
  }
  // TODO: Make fetch request to server to join the user to
  try {
    await updateDoc(doc(db, "room", roomId as string), {
      user2: username,
      gameStatus: "playing",
    });

  } catch (error: any) {
    return {
      error: error.message,
      redirect: null,
    };
  }
  // TODO: a room with roomId
  return {
    redirect: `/game/${roomId}`,
    error: null,
    username: username as string,
  };
}

export default function Join() {
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const params = useParams();
  const [roomId, handleOnChange] = useOnChange(params?.roomId)

  const state = useNavigation().state;
  const actionResponse = useActionData() as ActionResponse | null;

  useEffect(() => {
    if (actionResponse?.redirect && actionResponse?.username) {
      setUsername(actionResponse.username);
      navigate(actionResponse.redirect);
    }
  }, [actionResponse]);

  return (
    <div>
      <h1>Join</h1>
      <Form method="POST">
        {state === "idle" && actionResponse?.error && (
          <p>{actionResponse.error}</p>
        )}
        <input type="text" placeholder="Username" name="username" />
        <input
          type="text"
          placeholder="roomId"
          name="roomId"
          value={roomId}
          onChange={handleOnChange}
        />
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Creating..." : "Create"}
        </button>
      </Form>
    </div>
  );
}
