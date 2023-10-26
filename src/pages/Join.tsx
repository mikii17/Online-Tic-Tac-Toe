import {
  Form,
  useNavigation,
  useActionData,
  useParams,
  useNavigate,
} from "react-router-dom";

import useOnChange from "../hooks/useOnChange";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useEffect } from "react";

type ActionResponse = {
  error: string | null;
  redirect: string | null;
};

export async function action( request: Request, username: string) {
  const formData = await request.formData();
  const roomId = formData.get("roomId");

  if (roomId === null || roomId === "") {
    return {
      error: "Room Id is required",
    };
  }
  try {
    const room = await getDoc(doc(db, "room", roomId as string));
    if (!room.exists()) {
      return {
        error: "Room does not exist",
      };
    }
    if (room.data()?.user1 === username || room.data()?.user2 === username) {
      return {
        redirect: `/game/${roomId}`,
      };
    }
    if (room.data()?.user2 !== "") {
      return {
        error: "Room is full",
      };
    }
    await updateDoc(doc(db, "room", roomId as string), {
      user2: username,
      gameStatus: "playing",
    });
    return {
      redirect: `/game/${roomId}`,
    };
  } catch (error: any) {
    return {
      error: "Something went wrong",
    };
  }
}

export default function Join() {
  const params = useParams();
  const navigate = useNavigate();
  const [roomId, handleOnChange] = useOnChange(params?.roomId)

  const state = useNavigation().state;
  const actionResponse = useActionData() as ActionResponse | null;

  useEffect(() => {
    if (actionResponse && actionResponse.redirect) {
      navigate(actionResponse.redirect, {state: {from: "/join"}});
    }
  }, [actionResponse]);

  return (
    <div>
      <h1>Join</h1>
      <Form method="POST">
        {state === "idle" && actionResponse?.error && (
          <p>{actionResponse.error}</p>
        )}
        <input
          type="text"
          placeholder="roomId"
          name="roomId"
          value={roomId}
          onChange={handleOnChange}
        />
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Join..." : "Join"}
        </button>
      </Form>
    </div>
  );
}
