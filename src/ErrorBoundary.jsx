import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.error("Error boundary menangkap error", error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<h2>Oooopppss!!!</h2>
					<p>
						Telah terjadi error pada list ini.{" "}
						<Link to={"/"}>Klik di sini</Link> untuk kembali ke beranda.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
