import "../assets/css/Header.css";
import logo from "../assets/img/logo.png";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ connected, setConnected }) => {
	const navigate = useNavigate();

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
					{" "}
					My Collection{" "}
				</p>

				{connected ? (
					<button className="boutonHeader2">
						<p
							className="textBouton"
							onClick={() => {
								navigate("/login");
								setConnected(false);
								Cookies.remove("token");
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
