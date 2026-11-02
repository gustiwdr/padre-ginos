import { useContext } from "react";
import { CartContext } from "./contexts";
import { Link } from "@tanstack/react-router";

export default function Header() {
	const [cart] = useContext(CartContext);

	return (
		<nav className="grid w-full border-b border-border [grid-template-areas:'.__logo_logo_logo_cart']">
			<Link
				className="[grid-area:logo] flex items-center justify-center"
				to="/"
			>
				<h1 className="[width:inherit] h-[110px] border-b border-border py-5 content-[url('/public/padre_gino.svg')]">
					Padre Gino&apos;s Pizza
				</h1>
			</Link>

			<div className="[grid-area:cart] flex items-center justify-center text-[40px]">
				🛒
				<span
					data-testid="cart-number"
					className="relative -top-4.25 -left-4.25 flex size-5 items-center justify-center rounded-full bg-secondary text-[18px] text-white"
				>
					{cart.length}
				</span>
			</div>
		</nav>
	);
}
