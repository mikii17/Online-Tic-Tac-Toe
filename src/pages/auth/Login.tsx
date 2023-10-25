import {
  Form,
  Link,
  Navigate,
  useActionData,
  useNavigation,
} from "react-router-dom";

type ActionReturnType =
  | {
      error: string | null;
      redirect: true | null;
    }
  | undefined;

export const action = async (
  login: (email: string, password: string) => Promise<void>,
  request: Request
) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (email === null)
    return {
      error: "Email is required",
    };
  if (password === null)
    return {
      error: "Password is required",
    };
  try {
    await login(email, password);
    return {
      redirect: true,
    };
  } catch (error: any) {
    if (error.code === "auth/invalid-login-credentials") {
      return {
        error: "Invalid login credentials",
      };
    }
    return {
      error: "Something went wrong",
    };
  }
};

const Login = () => {
  const { state } = useNavigation();
  const actionResult = useActionData() as ActionReturnType ;
  if (actionResult?.redirect) return <Navigate to="/" replace/>;
  return (
    <main>
      <h1>Login</h1>
      <p>To play the game first Login</p>
      <Form method="POST">
        {state === "idle" && actionResult?.error !== null && (
          <p>{actionResult?.error}</p>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Login....." : "Login"}
        </button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
    </main>
  );
};

export default Login;