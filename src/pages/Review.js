import "../assets/css/Review.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Review = ({ user, setUser }) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	const { id } = useParams();
	console.log(user);

	const handleSumit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				`https://site--backend-gamepad--589lmtjqrlkh.code.run/review`,
				{
					title: title,
					text: text,
					gameId: id,
					owner: user._id,
				}
			);
			alert("Votre commentaire a bien été ajouté");
			navigate(`/game/${id}`);
		} catch (error) {
			console.log(error);
			if (
				error.response.data.message ===
				"error: a comment already exists for this game."
			) {
				alert(
					"Sorry, you can't leave a comment for this game. There is already a comment from you."
				);
				navigate(`/game/${id}`);
			}
		}
	};

	return (
		<section className="grandContainer">
			<div className="iconReview">
				<h1 className="titleReview"> White a Review</h1>
				<FontAwesomeIcon icon={faXmark} className="iconX" />
			</div>
			<section className="containerReview">
				<form className="containerInputReview" onSubmit={handleSumit}>
					<label htmlFor="title" className="labelTitle1">
						Review title
					</label>
					<input
						type="text"
						id="title"
						className="inputText"
						value={title}
						onChange={(event) => {
							setTitle(event.target.value);
						}}
					/>

					<label
						htmlFor="text"
						className="labelTitle1"
						style={{ paddingTop: 20 }}
					>
						Review text
					</label>

					<textarea
						name="text"
						id="text"
						cols="70"
						rows="5"
						value={text}
						className="inputArea"
						onChange={(event) => {
							setText(event.target.value);
						}}
					></textarea>

					<div className="containerButtonSubmit">
						<button className="buttonSubmit" type="submit">
							Publish
						</button>
					</div>
				</form>
			</section>
		</section>
	);
};

export default Review;
