import "../src/assets/css/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import { useState } from "react";

function App() {
	const [connected, setConnected] = useState(false);
	const [favGame, setFavGame] = useState(
		JSON.parse(localStorage.getItem("favGame")) || []
	);

	return (
		<Router>
			<Header connected={connected} setConnected={setConnected} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/game/:id"
					element={
						<Game
							favGame={favGame}
							setFavGame={setFavGame}
							connected={connected}
							setConnected={setConnected}
						/>
					}
				/>
				<Route
					path="/login"
					element={<Login connected={connected} setConnected={setConnected} />}
				/>
				<Route
					path="/signup"
					element={<Signup connected={connected} setConnected={setConnected} />}
				/>

				<Route
					path="/favorites"
					element={
						<Favorites
							favGame={favGame}
							setFavGame={setFavGame}
							connected={connected}
							setConnected={setConnected}
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
