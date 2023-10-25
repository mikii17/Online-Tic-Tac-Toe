import { Form, useNavigation, useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { db } from "../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

type ActionResponse = {
  error: string | null;
  redirect: string | null;
  username: string | null;
  roomId: string | null;
};

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const username = formData.get("username");

  if (username === null || username === "") {
    return {
      error: "User name is required",
      redirect: null,
    };
  }
  try {
    // TODO: Make fetch request to server to create room
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
    
    return {
      redirect: `/game/${docRef.id}`, //TODO: rediret: "/game/${roomId}",
      error: null,
      username: username as string,
    };
  }catch(error: any) { // !!ANY
    return {
      error: error.message,
      redirect: null,
    };
  }  
}

export default function Create() {
  const navigate = useNavigate();
  const state = useNavigation().state;
  const actionResponse = useActionData() as ActionResponse | null;

  useEffect(() => {
    if (actionResponse?.redirect && actionResponse?.username) {
      navigate(actionResponse.redirect);
    }
  }, [actionResponse]);

  return (
    <div>
      <h1>Create</h1>
      <Form method="POST">
        {state === "idle" && actionResponse?.error && (
          <p>{actionResponse.error}</p>
        )}
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Creating..." : "Create"}
        </button>
      </Form>
    </div>
  );
}
