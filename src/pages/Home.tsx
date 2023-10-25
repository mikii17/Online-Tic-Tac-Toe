import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main>
        <h1>Tic-Tac-Toe</h1>
        <p>Game rules Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa et asperiores aspernatur aliquam optio magni totam nostrum, ut nemo doloribus possimus placeat fugit, impedit, maxime atque at illo enim. Dolores provident, modi, sit commodi nemo saepe fuga, soluta eius dolorum numquam ex fugiat maxime in vero. Id mollitia cupiditate perferendis.</p>
        <Link to="/create">Create Room</Link>
        <Link to="/join">Join Room</Link>
    </main>
  )
}

export default Home