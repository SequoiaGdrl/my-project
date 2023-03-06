import "../assets/css/Favorites.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Favorites = ({ favGame, setFavGame, connected, setConnected }) => {
	const navigate = useNavigate();

	return (
		<section className="main">
			<h1 className="collection"> My Collection </h1>
			<section className="containerGame">
				{connected &&
					favGame.map((game) => {
						return (
							<div
								className="containerGameImgTitle"
								key={game.id}
								onClick={() => {
									navigate(`/game/${game.id}`);
								}}
							>
								<div className="containerImgGame">
									<img className="imgGame" src={game.background_image} alt="" />
								</div>
								<div className="containerTitleGame">
									<p className="titleGame"> {game.name} </p>
								</div>
							</div>
						);
					})}
			</section>
		</section>
	);
};

export default Favorites;
