import "../assets/css/Game.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Game = ({ favGame, setFavGame, connected, setConnected }) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [dataGame, setDataGame] = useState();
	const { id } = useParams();
	const [dataSimilar, setdataSimilar] = useState();
	const [review, setReview] = useState([]);
	const [counterPlus, setCounterPlus] = useState(0);
	const [counterMoins, setCounterMoins] = useState(0);
	const [alReadyFav, setAlReadyFav] = useState(false);

	const handleFavorites = () => {
		if (connected) {
			const newFavGame = [...favGame];
			const find = newFavGame.find((elem) => elem.name === dataGame.name);
			if (!find) {
				newFavGame.push(dataGame);
				setFavGame(newFavGame);
				localStorage.setItem("favGame", JSON.stringify(newFavGame));
				alert(`${dataGame.name} à bien été ajouté à vos favoris.`);
			} else {
				alert(`${dataGame.name} est déjà dans vos favoris.`);
			}
		} else {
			alert("Il faut être connecté pour ajouter un jeu à vos favories");
		}
	};

	useEffect(() => {
		const fetchData = async (index) => {
			const response = await axios.get(
				`https://api.rawg.io/api/games/${id}?key=b4d1df5d588e48479fafbb6b7c2b3a41`
			);

			setDataGame(response.data);
			const response2 = await axios.get(
				`https://api.rawg.io/api/games/${id}/game-series?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=5`
			);
			setdataSimilar(response2.data);

			const response3 = await axios.get(
				`https://site--backend-gamepad--589lmtjqrlkh.code.run/reviews?gameId=${id}`
			);
			setReview(response3.data);

			console.log(response3.data);
			if (connected) {
				const newFavGame = [...favGame];
				const find = newFavGame.find(
					(elem) => elem.name === response.data.name
				);

				if (find) {
					setAlReadyFav(true);
				}
			}

			setIsLoading(false);
		};
		fetchData();
	}, []);

	const handleClickGame = async (id) => {
		const response = await axios.get(
			`https://api.rawg.io/api/games/${id}?key=b4d1df5d588e48479fafbb6b7c2b3a41`
		);
		setDataGame(response.data);
		const response2 = await axios.get(
			`https://api.rawg.io/api/games/${id}/game-series?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=5`
		);
		setdataSimilar(response2.data);

		const response3 = await axios.get(
			`https://site--backend-gamepad--589lmtjqrlkh.code.run/reviews?gameId=${id}`
		);
		setReview(response3.data);

		console.log(response3.data);
	};

	return isLoading ? (
		"Loading..."
	) : (
		<section className="main2">
			<p className="titreGame"> {dataGame.name} </p>
			<section className="containerGame">
				<div className="containerTitleAndPictureGame">
					<img
						src={dataGame.background_image}
						alt="imagegame"
						className="pictureGame"
					/>
				</div>
				<div className="containerDescriptionGame">
					<section className="containerButton">
						{!alReadyFav ? (
							<button
								className="buttonGame"
								onClick={() => {
									handleFavorites();
								}}
							>
								<p> Saved to </p>
								<p
									style={{
										color: "#74D963",
									}}
								>
									Collection
									<FontAwesomeIcon icon={faBookmark} className="iconBookmark" />
								</p>
							</button>
						) : (
							<button
								className="buttonGame"
								onClick={(index) => {
									const newFavGame = [...favGame];
									newFavGame.splice(index, 1);
									setFavGame(newFavGame);
									alert(`${dataGame.name} has been removed.`);
								}}
							>
								<p>Remove to</p>
								<p
									style={{
										color: "#74D963",
									}}
								>
									Collection
									<FontAwesomeIcon icon={faBookmark} className="iconBookmark" />
								</p>
							</button>
						)}
						;
						<button
							className="buttonGame"
							onClick={() => {
								if (connected) {
									navigate(`/review/${id}`);
								} else {
									alert("Il faut être connecté pour ajouter un commentaire.");
								}
							}}
						>
							<p> Add a </p>
							<p>
								Reviews
								<FontAwesomeIcon
									icon={faComments}
									style={{
										marginLeft: 8,
									}}
								/>
							</p>
						</button>
					</section>
					<section className="containerDesDesc">
						<div className="containerPlateforms">
							<p className="objectKey"> Platforms </p>
							{dataGame.platforms.map((platform) => {
								return (
									<span key={platform.platform.id} className="platform">
										{platform.platform.name},
									</span>
								);
							})}
						</div>
						<div className="containerGenre">
							<p className="objectKey"> Genre </p>
							{dataGame.genres.map((genre) => {
								return (
									<p key={genre.id} className="genreText">
										{genre.name}
									</p>
								);
							})}
						</div>
					</section>
					<section className="containerDesDesc">
						<div className="containerPlateforms">
							<p className="objectKey"> Released date </p>
							<p className="genreText"> {dataGame.released} </p>
						</div>
						<div>
							<p className="objectKey"> Developer </p>
							{dataGame.developers.map((developer) => {
								return (
									<p key={developer.id} className="genreText">
										{developer.name}
									</p>
								);
							})}
						</div>
					</section>
					<section className="containerDesDesc">
						<div className="containerPlateforms">
							<p className="objectKey"> Publisher </p>
							{dataGame.publishers.map((publisher) => {
								return (
									<p key={publisher.id} className="genreText">
										{publisher.name}
									</p>
								);
							})}
						</div>
						<div>
							<p className="objectKey"> Age rating </p>
							<p className="genreText"> a trouver </p>
						</div>
						<div> </div>
					</section>
					<div className="description">
						<p className="objectKey"> About </p>
						<span> {dataGame.description_raw} </span>
					</div>
				</div>
			</section>
			<p className="titleOtherGames">
				<span
					style={{
						paddingRight: 7,
					}}
				>
					Games like
				</span>
				<span> {dataGame.name} </span>
			</p>
			<section className="containerGamesSemblables">
				{dataSimilar.results.map((result) => {
					return (
						<div
							className="containerGameImgTitle"
							key={result.id}
							onClick={() => {
								handleClickGame(result.id);
								navigate(`/game/${result.id}`);
							}}
						>
							<div className="containerImgGame">
								<img src={result.background_image} alt="" className="imgGame" />
							</div>
							<div className="containerTitleGame">
								<p className="titleGame"> {result.name} </p>
							</div>
						</div>
					);
				})}
			</section>

			<h1 className="reviewsTitle">
				Reviews <span className="spanLong">{review.length}</span>
			</h1>

			{review.length === 0 ? (
				<p className="messageOreview">No review for this game !</p>
			) : (
				<section>
					<p className="reviewsSousTitle">Most relevant review</p>

					<div className="containerReviews">
						{review.map((comment) => {
							console.log(review);
							return (
								<div key={comment._id}>
									<h2 className="commentTitle">{comment.title}</h2>
									<p className="commentText">{comment.text}</p>

									<div className="containerOwner">
										<div>
											<img
												className="imgOwner"
												src={comment.owner.avatar.secure_url}
												alt=""
											/>
										</div>

										<div>
											<p className="commentDate">{comment.date}</p>
											<p className="commentUser">{comment.owner.username}</p>
										</div>

										<div className="finger">
											<FontAwesomeIcon
												className="plusMoins"
												style={{ color: counterPlus > 0 && "green" }}
												icon={faThumbsUp}
												onClick={() => {
													setCounterPlus(counterPlus + 1);
												}}
											/>
											<span style={{ color: counterPlus > 0 && "green" }}>
												{counterPlus > 0 && "+"}
											</span>
											<span
												className="counterPlus"
												style={{ color: counterPlus > 0 && "green" }}
											>
												{counterPlus}
											</span>
											<FontAwesomeIcon
												className="plusMoins"
												style={{ color: counterMoins < 0 && "red" }}
												icon={faThumbsDown}
												onClick={() => {
													setCounterMoins(counterMoins - 1);
												}}
											/>

											<span style={{ color: counterMoins < 0 && "red" }}>
												{counterMoins}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			)}
		</section>
	);
};

export default Game;
