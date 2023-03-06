import "../assets/css/Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoseul.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";

const Signup = ({ connected, setConnected }) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [picture, setPicture] = useState("");
	const [selectPicture, setselectPicture] = useState("No file selected");
	const [ErrorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage("");
		fetchdata();
	};

	const fetchdata = async () => {
		try {
			const response = await axios.post(
				"https://site--backend-gamepad--fm844hvczrhh.code.run/signup",
				{
					username: username,
					email: email,
					password: password,
					confirmPassword: confirmPassword,
					picture: picture,
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			const token = response.data.token;

			if (token) {
				Cookies.set("token", token, { expires: 14 });
				setConnected(true);
				navigate("/");
				alert("Bienvenue! Vous êtes connecté");
			}
		} catch (error) {
			if (error.response.data.message === "error: username is not inform") {
				setErrorMessage("Veuillez renseigner votre nom. ");
			}

			if (error.response.data.message === "error: email is not inform") {
				setErrorMessage("Veuillez renseigner votre Email. ");
			}

			if (error.response.data.message === "error: password is not inform") {
				setErrorMessage("Veuillez renseigner votre mot de passe. ");
			}
			if (
				error.response.data.message === "error: confirmPassword is not inform"
			) {
				setErrorMessage(
					"Veuillez renseigner la confirmation de votre mot de passe."
				);
			}
			if (
				error.response.data.message ===
				"error: password and confirmPassword are not the same"
			) {
				setErrorMessage("Vos mots de passe ne sont pas identiques");
			}

			if (error.response.data.message === "This email already has an account") {
				setErrorMessage("Votre email existe déjà.");
			}
		}
	};

	const navigate = useNavigate();
	return (
		<section className="main">
			<div className="containerAll">
				<div className="containerWorks">
					<img src={logo} alt="" />

					<div className="containerTextWorks">
						<p className="titleContainer">How it works ?</p>
						<div className="log">
							<span className="logolog">
								<FontAwesomeIcon icon={faUser} className="iconBookmark2" />
							</span>
							<p className="textWorks">
								Log in to your free account to be able to get all features of
								Gamepad
							</p>
						</div>

						<p className="textWorks">
							<FontAwesomeIcon icon={faBookmark} className="iconBookmark2" />
							Add a game to your collection
						</p>

						<p className="textWorks">
							<FontAwesomeIcon icon={faComments} className="iconBookmark2" />
							Leave a review for a game
						</p>
					</div>
				</div>

				<div className="containerLogin">
					<p className="titleContainer2">Sign up</p>

					<form className="input2" onSubmit={handleSubmit}>
						<input
							className="inputText"
							value={username}
							type="text"
							placeholder="Username "
							onChange={(event) => {
								setUsername(event.target.value);
							}}
						/>

						<input
							className="inputText"
							type="text"
							placeholder="Email "
							value={email}
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
						<div style={{ display: "flex", gap: 5 }}>
							<input
								className="inputText"
								type="password"
								placeholder="Password..."
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								style={{ width: 160 }}
							/>
							<input
								className="inputText"
								type="password"
								placeholder=" Confirm Password"
								value={confirmPassword}
								onChange={(event) => {
									setConfirmPassword(event.target.value);
								}}
								style={{ width: 160 }}
							/>
						</div>
						<div style={{ display: "flex" }}>
							<label className="label" htmlFor="file">
								Add a Photo
							</label>

							<input
								id="file"
								name="file"
								className="inputText2"
								type="file"
								placeholder=" Add a Photo"
								onChange={(event) => {
									setPicture(event.target.files[0]);
									setselectPicture("file selected");
								}}
							/>

							<FontAwesomeIcon
								icon={faArrowUpFromBracket}
								className="iconBookmark3"
								style={{ color: "black", backgroundColor: "white" }}
							/>

							<span
								style={{
									color:
										selectPicture === "No file selected" ? "#FF4655" : "white",
								}}
								className="selectPicture"
							>
								{selectPicture}
							</span>
						</div>

						<p className="errorMessage">{ErrorMessage}</p>

						<button type="submit" className="inputButton2">
							Sign Up
						</button>
					</form>
					<p
						className="subButton"
						onClick={() => {
							navigate("/login");
						}}
					>
						Have an account yet?
					</p>
				</div>
			</div>
		</section>
	);
};

export default Signup;
