import { Form, useNavigation, useActionData, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { UserContext } from "../App";

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
  // TODO: Make fetch request to server to create room
  return {
    redirect: "/game/2", //TODO: rediret: "/game/${roomId}",
    error: null,
    username: username as string,
  };
}

export default function Create() {
  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();
  const state = useNavigation().state;
  const actionResponse = useActionData() as ActionResponse | null;

  // if (actionResponse?.redirect && actionResponse?.username) {
  //   setUsername(actionResponse.username);
  //   return <Navigate to={actionResponse.redirect} />;
  // }
  useEffect(() => {
    if (actionResponse?.redirect && actionResponse?.username) {
      setUsername(actionResponse.username);
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
        <input type="text" placeholder="User name" name="username" />
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Creating..." : "Create"}
        </button>
      </Form>
    </div>
  );
}
