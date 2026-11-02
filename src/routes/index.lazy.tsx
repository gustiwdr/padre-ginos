import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="mx-auto my-30 grid max-w-175 grid-cols-2 gap-7.5">
			<div className="flex flex-col">
				<h1 className="font-pacifico text-primary text-[2em] font-normal">
					Padre Gino&apos;s
				</h1>
				<p className="max-w-78.75 text-[40px] font-bold text-secondary uppercase">
					Welcome to the best pizza in town!
				</p>
			</div>

			<ul className="flex flex-col items-center justify-center">
				<li className="w-full max-w-62.5 text-center">
					<Link className="btn mb-2.5 block" to="/order">
						Order
					</Link>
				</li>
				<li className="w-full max-w-62.5 text-center">
					<Link className="btn mb-2.5 block" to="/past">
						Order History
					</Link>
				</li>
				<li className="w-full max-w-62.5 text-center">
					<Link className="btn mb-2.5 block" to="/contact">
						Contact
					</Link>
				</li>
			</ul>
		</div>
	);
}
