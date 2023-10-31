import { Link } from "react-router-dom";
import githubLogo from "../assets/github.svg";
const Socials = () => {
  return (
    <Link className="w-8 h-8" to="https://github.com/mikii17/Online-Tic-Tac-Toe" target="_blank">
        <img src={githubLogo} alt="github logo"/>
    </Link>
  )
}

export default Socials