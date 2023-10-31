import { toast } from "react-toastify";
import { useAuth, useUser } from "../context/AuthContext";

const Signout = () => {
  const user = useUser();
  const { signout } = useAuth();

  const signoutHandler = async () => {
    try {
      await signout();
      toast.success("Successful.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        className: `bg-[rgb(var(--color-text-base))] text-skin-muted`,
      });
    } catch (e: any) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        className: `bg-[rgb(var(--color-text-base))] text-skin-muted`,
      });
    }
  };
  return (
    <>
      {user != null && (
        <div>
          <button
            onClick={signoutHandler}
            className="relative pb-4 px-4 text-skin-muted transition-all duration-300 ease-in-out
              hover:text-skin-muted-button hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-inverted hover:via-hue-inverted hover:to-hue-inverted bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom"
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default Signout;
