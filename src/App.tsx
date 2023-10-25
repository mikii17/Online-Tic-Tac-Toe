import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Create, { action as createAction } from "./pages/Create";
import Join, { action as joinAction } from "./pages/Join";
import Home from "./pages/Home";
import Game from "./pages/Game";

// Components
import ProtectionLayout from "./components/ProtectionLayout";

// Context
import AuthProvider from "./context/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* If main has same styling for each route then use MainLayout */}
      <Route index element={<Home />}/>
      <Route path="login" element={<p>Login</p>}/>
      <Route path="signup" element={<p>signup</p>}/>
      {/* Protect routes with ProtectionLayout */}
      <Route element={<ProtectionLayout />} >
        <Route path="create" action={createAction} element={<Create />} />
        <Route path="join" action={joinAction} element={<Join />} />
        <Route path="join/:roomId" action={joinAction} element={<Join />} />
        <Route path="game/:roomId" element={<Game />} />
      </Route>

    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
