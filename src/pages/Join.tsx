import {
  Form,
  useNavigation,
  useActionData,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import useOnChange from "../hooks/useOnChange";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useEffect } from "react";

import logo from "../assets/logoSVG.svg";
import Input from "../components/Input";

type ActionResponse = {
  error: string | null;
  redirect: string | null;
};

export async function action(request: Request, username: string) {
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
      updatedAt: Timestamp.now(),
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
  const [roomId, handleOnChange] = useOnChange(params?.roomId);

  const state = useNavigation().state;
  const actionResponse = useActionData() as ActionResponse | null;

  useEffect(() => {
    if (actionResponse && actionResponse.redirect) {
      navigate(actionResponse.redirect, { state: { from: "/join" } });
    }
  }, [actionResponse]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-8 sm:gap-9 lg:gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52" />
      </Link>
      <h1 className="font-bold text-2xl sm:text-3xl">Join Room</h1>
      <Form method="POST" className="flex flex-col gap-10 items-center">
        {state === "idle" && actionResponse?.error && (
          <p className="text-red-600 text-lg">{actionResponse.error}</p>
        )}
        <Input
          id="roomId"
          name="roomId"
          value={roomId}
          type="text"
          onChange={handleOnChange}
        >
          Room ID
        </Input>
        <button
          disabled={state === "submitting"}
          className="relative px-8 py-3 sm:px-9 sm:py-3 text-sm sm:text-base rounded-md text-skin-inverted bg-skin-button-muted transition-all duration-300 ease-in-out
          hover:text-skin-muted-button hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-inverted hover:via-hue-inverted hover:to-hue-inverted bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
          before:w-0 before:bg-skin-button-base/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md"
        >
          {state === "submitting" ? "Join..." : "Join"}
        </button>
      </Form>
      <Link
        to="/create"
        className="text-skin-muted-button text-sm sm:text-base 
hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline"
      >
        Or create a room HERE!
      </Link>
    </main>
  );
}
