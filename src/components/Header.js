import "../assets/css/Header.css";
import logo from "../assets/img/logo.png";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ connected, setConnected, user, setUser }) => {
	const navigate = useNavigate();

	console.log(user);

	return (
		<section className="containerHeader">
			<div
				onClick={() => {
					navigate("/");
				}}
			>
				<img className="logoHeader" src={logo} alt="logo GamePad" />
			</div>
			<div className="textAndBoutonHeader">
				<p
					className="textHeader"
					onClick={() => {
						navigate("/favorites");
					}}
				>
					My Collection
				</p>

				{connected && (
					<div className="containerUserHeader">
						<span className="nameHeader">{user.username}</span>
						<img className="imgHeader" src={user.avatar.secure_url} alt="" />
					</div>
				)}

				{connected ? (
					<button className="boutonHeader2">
						<p
							className="textBouton"
							onClick={() => {
								navigate("/login");
								setConnected(false);
								Cookies.remove("token");
								localStorage.removeItem("user");
							}}
						>
							Deconnection
						</p>
					</button>
				) : (
					<button className="boutonHeader">
						<p
							className="textBouton"
							onClick={() => {
								navigate("/login");
							}}
						>
							Login
						</p>
					</button>
				)}
			</div>
		</section>
	);
};

export default Header;
