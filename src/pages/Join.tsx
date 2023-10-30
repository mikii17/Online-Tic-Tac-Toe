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

import logo from "../assets/logoSVG.svg"
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
    <main className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-44 h-44 lg:w-60 lg:h-60 " />
      </Link>
      <h1 className="font-bold text-4xl sm:text-5xl">Join Room</h1>
      <Form method="POST" className="flex flex-col gap-10 items-center">
        {state === "idle" && actionResponse?.error && (
          <p className="text-red-600 text-lg">{actionResponse.error}</p>
        )}
        {/* <div className="group relative before:content-[''] before:w-full before:h-1 before:bg-skin-button-muted before:absolute before:bottom-[-4px]">
          <label htmlFor="roomId" className={`absolute ${roomId === "" ? 'top-1/2' : 'top-0'} -translate-y-1/2 text-skin-muted group-focus:top-0 transition-all duration-200 ease-in`}>Room ID</label>
          <input
            type="text"
            name="roomId"
            id="roomId"
            value={roomId}
            onChange={handleOnChange}
            className=" w-full sm:w-96 outline-none bg-transparent px-5 py-3"
          />
        </div> */}
        <Input id="roomId" name="roomId" value={roomId} type="text" onChange={handleOnChange}>Room ID</Input>
        <button disabled={state === "submitting"} className="px-10 py-4 rounded-md text-skin-inverted bg-skin-button-muted disabled:opacity-75">
          {state === "submitting" ? "Join..." : "Join"}
        </button>
      </Form>
      <Link to="/create" className="text-skin-muted-button hover:underline-offset-4 hover:underline focus:underline-offset-4 focus:underline">Or create a room HERE!</Link>
    </main>
  );
}
