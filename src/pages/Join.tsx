import {
  Form,
  useNavigation,
  useActionData,
  Navigate,
  useParams,
} from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../App";
import useOnChange from "../hooks/useOnChange";

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
  // TODO: a room with roomId
  return {
    redirect: `/game/${roomId}`,
    error: null,
    username: username as string,
  };
}

export default function Join() {
  const { setUsername } = useContext(UserContext);

  const params = useParams();
  const [roomId, handleOnChange] = useOnChange(params?.roomId)

  const state = useNavigation().state;
  const actionResponse = useActionData() as ActionResponse | null;

  if (actionResponse?.redirect && actionResponse?.username) {
    setUsername(actionResponse.username);
    return <Navigate to={actionResponse.redirect} />;
  }
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
