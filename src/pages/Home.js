import "../assets/css/Home.css";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";
const Home = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [dataGames, setDataGames] = useState();
	const [genre, setGenre] = useState("All");
	const [platform, setPlatform] = useState("All");
	const [genres, setGenres] = useState();
	const [platforms, setPlatforms] = useState();
	const [sort, setSort] = useState("Default");
	const TabSort = ["name", "released", "rating"];
	const [pageCount, setPageCount] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20"
			);
			setDataGames(response.data);

			const responseGenre = await axios.get(
				"https://api.rawg.io/api/genres?key=b4d1df5d588e48479fafbb6b7c2b3a41"
			);
			setGenres(responseGenre.data);

			const responsePlaform = await axios.get(
				"https://api.rawg.io/api/platforms?key=b4d1df5d588e48479fafbb6b7c2b3a41"
			);
			setPlatforms(responsePlaform.data);

			setIsLoading(false);
			setPageCount(Math.ceil(Math.ceil(response.data.count / 20)));
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20&search=${search}`
			);

			setDataGames(response.data);
			setPageCount(Math.ceil(Math.ceil(response.data.count / 20)));
		};
		fetchData();
	}, [search]);

	const handleFilter = async (event) => {
		console.log(sort);
		event.preventDefault();

		if (genre === "All" && platform === "All" && sort === "Default") {
			const response = await axios.get(
				"https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20"
			);
			setDataGames(response.data);
			setPageCount(Math.ceil(Math.ceil(response.data.count / 20)));
		} else if (genre === "All") {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20&platforms=${platform}`
			);
			setDataGames(response.data);
			setPageCount(Math.ceil(response.data.count / 20));
		} else if (platform === "All") {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20&genres=${genre}`
			);
			setDataGames(response.data);
			setPageCount(Math.ceil(response.data.count / 20));
		} else if (sort === "Default") {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20&genres=${genre}&platforms=${platform}`
			);
			setDataGames(response.data);
			setPageCount(Math.ceil(response.data.count / 20));
		} else {
			const response = await axios.get(
				`https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20&genres=${genre}&platforms=${platform}&ordering=${sort}`
			);
			setDataGames(response.data);
			setPageCount(Math.ceil(response.data.count / 20));
		}
	};

	const handlePageClick = async (event) => {
		console.log(event);
		const response = await axios.get(
			`https://api.rawg.io/api/games?key=b4d1df5d588e48479fafbb6b7c2b3a41&page_size=20&page=${
				event.selected + 1
			}`
		);
		setDataGames(response.data);
	};

	return isLoading ? (
		<p> Loading... </p>
	) : (
		<section className="main">
			<section className="containerImgLogo">
				<div>
					<img src={logo} alt="logo GamPad du main" />
				</div>
				<div className="barSearchAndIcon">
					<div>
						<input
							type="text"
							placeholder="Search for a game..."
							value={search}
							className="searchBar"
							onChange={(event) => {
								setSearch(event.target.value);
							}}
						/>
					</div>
					<div>
						<FontAwesomeIcon icon={faSearch} className="iconFontAweSomeIcon" />
					</div>
				</div>
				<div>
					<p className="textNbSearch"> {`Search ${dataGames.count} games`} </p>
				</div>
				<section>
					<form onSubmit={handleFilter} className="filters">
						<div className="styleSort">
							<label style={{ color: "white" }} htmlFor="y">
								Plaform :
							</label>
							<select
								className="select"
								id="y"
								value={platform}
								onChange={(event) => {
									setPlatform(event.target.value);
								}}
							>
								<option>All</option>
								{platforms.results.map((platform) => {
									return (
										<option key={platform.id} value={platform.id}>
											{platform.name}
										</option>
									);
								})}
							</select>
						</div>

						<div className="styleSort">
							<label style={{ color: "white" }} htmlFor="r">
								Type :
							</label>
							<select
								className="select"
								name="Type"
								id="r"
								value={genre}
								onChange={(event) => {
									setGenre(event.target.value);
								}}
							>
								<option>All</option>
								{genres.results.map((genre, index) => {
									return (
										<option key={index} value={genre.slug}>
											{genre.name}
										</option>
									);
								})}
							</select>
						</div>

						<div className="sortAndFilters">
							<div className="styleSort">
								<label style={{ color: "white" }} htmlFor="j">
									Sort by:
								</label>
								<select
									className="select2"
									name=""
									id="j"
									value={sort}
									onChange={(event) => {
										setSort(event.target.value);
									}}
								>
									<option>Default</option>
									{TabSort.map((sort, index) => {
										return (
											<option key={index} value={sort}>
												{sort}
											</option>
										);
									})}
								</select>
							</div>

							<button type="submit" className="goFilters">
								Go Filters!
							</button>
						</div>
					</form>
				</section>
			</section>
			<section className="containerGame">
				{dataGames.results.map((game) => {
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

			<ReactPaginate
				className="paginate"
				breakLabel="..."
				nextLabel=">"
				onPageChange={handlePageClick}
				previousLabel="<"
				pageCount={pageCount}
				pageRangeDisplayed={2}
				activeClassName="activePage"
				pageClassName="pageClasseName"
				pageLinkClassName="pageLinkClassName"
				breakClassName="breakClassName"
				nextClassName="nextClassName"
				previousClassName="previousClassName"
				marginPagesDisplayed={1}
			/>
		</section>
	);
};

export default Home;
