import "../assets/css/Login.css";
import {
	FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
import {
	faUser
} from "@fortawesome/free-regular-svg-icons";
import {
	faComments
} from "@fortawesome/free-regular-svg-icons";
import {
	faBookmark
} from "@fortawesome/free-regular-svg-icons";
import logo from "../assets/img/logoseul.png";
import {
	useNavigate,
	Link
} from "react-router-dom";
import {
	useState
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({
	connected,
	setConnected,
	user,
	setUser
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrorMessage("");
		fetchdata();
	};

	const fetchdata = async () => {
		try {
			const response = await axios.post(
				"https://site--backend-gamepad--589lmtjqrlkh.code.run/login", {
					email: email,
					password: password,
				}
			);
			const token = response.data.token;
			if (response.data.message === "bad password") {
				setErrorMessage("Votre mot de passe est incorrect");
			}
			if (token) {
				Cookies.set("token", token, {
					expires: 14
				});
				setConnected(true);
				setUser(response.data);
				localStorage.setItem("user", JSON.stringify(response.data));
				console.log(response.data);
				navigate("/");
				alert("Bienvenue! Vous êtes connecté");
			}
		} catch (error) {
			if (error.response.data.message === "User not found") {
				setErrorMessage("Votre email n'est pas reconnu dans notre base.");
			}
		}
	};

	const navigate = useNavigate();
	return ( <
		section className = "main" >
		<
		div className = "containerAll" >
		<
		div className = "containerWorks" >
		<
		img src = {
			logo
		}
		alt = "" / >

		<
		div className = "containerTextWorks" >
		<
		p className = "titleContainer" > How it works ? < /p> <
		div className = "log" >
		<
		span className = "logolog" >
		<
		FontAwesomeIcon icon = {
			faUser
		}
		className = "iconBookmark2" / >
		<
		/span> <
		p className = "textWorks" >
		Log in to your free account to be able to get all features of
		Gamepad <
		/p> <
		/div>

		<
		p className = "textWorks" >
		<
		FontAwesomeIcon icon = {
			faBookmark
		}
		className = "iconBookmark2" / >
		Add a game to your collection <
		/p>

		<
		p className = "textWorks" >
		<
		FontAwesomeIcon icon = {
			faComments
		}
		className = "iconBookmark2" / >
		Leave a review
		for a game <
		/p> <
		/div> <
		/div>

		<
		div className = "containerLogin" >
		<
		p className = "titleContainer2" > Login < /p>

		<
		form className = "input"
		onSubmit = {
			handleSubmit
		} >
		<
		input className = "inputText"
		type = "text"
		placeholder = "Email... "
		value = {
			email
		}
		onChange = {
			(event) => {
				setEmail(event.target.value);
			}
		}
		/> <
		input className = "inputText"
		type = "password"
		placeholder = "Password..."
		value = {
			password
		}
		onChange = {
			(event) => {
				setPassword(event.target.value);
			}
		}
		/>

		<
		p className = "errorMessage" > {
			errorMessage
		} < /p> <
		button type = "submit"
		className = "inputButton2" >
		Connexion <
		/button> <
		/form> <
		p className = "subButton"
		onClick = {
			() => {
				navigate("/signup");
			}
		} >
		Don 't have an account yet? <
		/p> <
		/div> <
		/div> <
		/section>
	);
};
export default Login;