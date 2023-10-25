import { Form, Navigate, useActionData, useNavigation } from "react-router-dom";
import { isUsernameAvailable } from "../../context/AuthContext";

type ActionReturnType = {
  error: string | null;
  redirect: true | null;
} | null;

export const action = async (
  signup: (email: string, password: string, username: string) => Promise<void>,
  request: Request
) => {
  const formData = await request.formData();
  const username = formData.get("username") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const confirmPassword = formData.get("confirmPassword") as string | null;

  if (email === null)
    return {
      error: "Email is required",
    };
  if (password === null)
    return {
      error: "Password is required",
    };
  if (username === null)
    return {
      error: "Username is required",
    };
  if (confirmPassword === null)
    return {
      error: "Confirm Password is required",
    };
  if (password !== confirmPassword)
    return {
      error: "Passwords do not match",
    };
  try{
    const usernameAvailable = await isUsernameAvailable(username);
    if (!usernameAvailable)
      return {
        error: "Username is not available",
      };
  }
  catch(error: any){
    return {
      error: "Something went wrong",
    };
  }

  try {
    await signup(email, password, username);
    return {
      redirect: true,
    };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use")
      return {
        error: "Email is already in use",
      };
    return {
      error: "Something went wrong",
    };
  }
};
const Signup = () => {
  const { state } = useNavigation();
  const actionResult = useActionData() as ActionReturnType;

  console.log(state, actionResult);

  if (actionResult?.redirect === true) {
    console.log("signup success!!!");
    return <Navigate to="/join" replace />;
  }
  return (
    <main>
      <h1>Signup</h1>
      <Form method="POST">
        {state === "idle" && actionResult?.error !== null && (
          <p>{actionResult?.error}</p>
        )}
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />
        </div>
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Signup...." : "Signup"}
        </button>
      </Form>
    </main>
  );
};

export default Signup;
