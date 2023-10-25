import { Form, Link, redirect, useActionData, useNavigation } from "react-router-dom"

export const action = async (login:  (email: string, password: string) => Promise<void>, request: Request) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (email === null) 
    return {
      error: "Email is required",
    }
  if (password === null)
    return {
      error: "Password is required"
    }
    try {
      await login(email, password);
      return redirect("/");
    
    } catch (error: any) {
      if (error.code === "auth/invalid-login-credentials"){
        return {
          error: "Invalid login credentials"
        }
      }
      
      return {
        error: "Something went wrong",
      }
    }
}

const Login = () => {
const { state } = useNavigation();
const actionResult = useActionData() as {error: string | null} | null;
  return (
    <main>
      <h1>Login</h1>
      <p>To play the game first Login</p>
      <Form method="POST">
        {state === "idle" && actionResult?.error !== null && <p>{actionResult?.error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button disabled={state === "submitting"}>{state === "submitting" ? "Login....." : "Login"}</button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
    </main>
  )
}

export default Login