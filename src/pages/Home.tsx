import { Link } from "react-router-dom";
import logo from "../assets/logoSVG.svg";
import { Slide, ToastContainer } from "react-toastify";
import Signout from "../components/Signout";

const Home = () => {
  
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-8 sm:gap-9">
      <Link to="/">
        <img src={logo} alt="logo" className="w-36 h-36 sm:w-44 sm:h-44 xl:w-52 xl:h-52" />
      </Link>
      <h1 className="font-bold text-2xl sm:text-3xl">Tic-Tac-Toe</h1>
      <p className="px-5 text-center text-skin-muted text-sm sm:text-base leading-6 sm:leading-7 sm:max-w-xl lg:max-w-3xl ">
        Game rules Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Culpa et asperiores aspernatur aliquam optio magni totam nostrum, ut
        nemo doloribus possimus placeat fugit, impedit, maxime atque at illo
        enim. Dolores provident, modi, sit commodi nemo saepe fuga, soluta eius
        dolorum numquam ex fugiat maxime in vero. Id mollitia cupiditate
        perferendis.
      </p>
      <div className="flex flex-col items-center sm:flex-row gap-6 sm:gap-14">
        <Link
          to="/create"
          className="relative px-8 py-3 sm:px-9 sm:py-3 text-sm sm:text-base rounded-md text-skin-muted-button bg-skin-button-base transition-all duration-300 ease-in-out
                    hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-base hover:via-hue-base hover:to-hue-base bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
                    before:w-0 before:bg-skin-button-muted/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md"
        >
          Create Room
        </Link>
        <Link
          to="/join"
          className="relative px-6 py-3 sm:px-9 sm:py-3 text-sm sm:text-base rounded-md text-skin-inverted bg-skin-button-muted transition-all duration-300 ease-in-out
          hover:text-skin-muted-button hover:bg-transparent hover:bg-gradient-to-r hover:from-hue-inverted hover:via-hue-inverted hover:to-hue-inverted bg-[length:0%_4px] hover:bg-[length:100%_4px] hover:bg-no-repeat bg-bottom
          before:w-0 before:bg-skin-button-base/50 before:content-[''] before:absolute before:h-full before:top-0 before:left-0 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out before:rounded-md"
        >
          Join Room
        </Link>
      </div>
      <Signout />
      <ToastContainer transition={Slide} />
    </main>
  );
};

export default Home;
