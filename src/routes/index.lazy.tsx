import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="index">
			<div className="index-brand">
				<h1>Padre Gino's</h1>
				<p>Welcome to the best pizza in town!</p>
			</div>
			<ul>
				<li>
					<Link to="/order">Order</Link>
				</li>
				<li>
					<Link to="/past">Order History</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
		</div>
	);
}
