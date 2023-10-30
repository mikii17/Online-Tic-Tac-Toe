import { Link } from "react-router-dom";
import logo from "../assets/logoSVG.svg";

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-10">
      <Link to="/">
        <img src={logo} alt="logo" className="w-44 h-44 lg:w-60 lg:h-60 " />
      </Link>
      <h1 className="font-bold text-4xl sm:text-5xl">Tic-Tac-Toe</h1>
      <p className="px-5 text-center text-skin-muted text-base md:text-lg leading-8 sm:max-w-xl lg:max-w-3xl ">
        Game rules Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Culpa et asperiores aspernatur aliquam optio magni totam nostrum, ut
        nemo doloribus possimus placeat fugit, impedit, maxime atque at illo
        enim. Dolores provident, modi, sit commodi nemo saepe fuga, soluta eius
        dolorum numquam ex fugiat maxime in vero. Id mollitia cupiditate
        perferendis.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-14">
        <Link
          to="/create"
          className="px-10 py-4 rounded-md text-skin-muted-button bg-skin-button-base"
        >
          Create Room
        </Link>
        <Link
          to="/join"
          className="px-10 py-4 rounded-md text-skin-inverted bg-skin-button-muted"
        >
          Join Room
        </Link>
      </div>
    </main>
  );
};

export default Home;
