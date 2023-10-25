import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Create from "./pages/Create";
import Join, { action, action as joinAction } from "./pages/Join";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login, { action as loginAction } from "./pages/auth/Login";

// Components
import ProtectionLayout from "./components/ProtectionLayout";

// Context
import { useAuth } from "./context/AuthContext";

function App() {
  const {login} = useAuth();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* If main has same styling for each route then use MainLayout */}
        <Route index element={<Home />} />
        <Route
          path="login"
          element={<Login />  }
          action={({ request }: { request: Request }) =>
            loginAction(login, request)
          }
        />
        <Route path="signup" element={<p>signup</p>} />
        {/* Protect routes with ProtectionLayout */}
        <Route element={<ProtectionLayout />}>
          <Route path="create" element={<Create />} />
          <Route path="join" action={joinAction} element={<Join />} />
          <Route path="join/:roomId" action={joinAction} element={<Join />} />
          <Route path="game/:roomId" element={<Game />} />
        </Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
