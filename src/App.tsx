import { createContext, useContext, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Create, { action as createAction } from "./pages/Create";
import Join, { action as joinAction } from "./pages/Join";
import Game from "./pages/Game";

// Components
import MainLayout from "./components/MainLayout";
import ProtectionLayout from "./components/ProtectionLayout";

export const UserContext = createContext<UserContextType>(null!);

export function useUser(){
  return useContext(UserContext);
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Create />} action={createAction} />
      <Route path="join" action={joinAction} element={<Join />} />
      <Route path="join/:roomId" action={joinAction} element={<Join />} />
      <Route path="game" element={<ProtectionLayout />} >
        <Route path=":roomId" element={<Game />} />
      </Route>
    </Route>
  )
);

function App() {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{username, setUsername}}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
