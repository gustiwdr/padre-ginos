import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useContext } from "react";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";
import type { Pizza as PizzaType, PizzaSize } from "../APIResponsesTypes";

// intl untuk format angka menjadi bentuk currency
const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
	component: Order,
});

const sizeLabelClass =
	"mx-3.75 mb-2.5 inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-[5px] border border-[#999] bg-border text-[#999] peer-checked:bg-white peer-checked:text-[#333] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary";

function Order() {
	const [pizzaType, setPizzaType] = useState("pepperoni");
	const [pizzaSize, setPizzaSize] = useState<PizzaSize>("M");
	const [pizzaTypes, setPizzaTypes] = useState<PizzaType[]>([]);
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useContext(CartContext);

	async function checkout() {
		setLoading(true);

		await fetch("/api/order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cart,
			}),
		});

		setCart([]);
		setLoading(false);
	}

	let price: string | undefined;
	let selectedPizza: PizzaType | undefined;
	if (!loading) {
		selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
		price = selectedPizza
			? intl.format(selectedPizza.sizes[pizzaSize])
			: undefined;
	}

	useEffect(() => {
		void fetchPizzaTypes();
	}, []);

	async function fetchPizzaTypes() {
		await new Promise((res) => setTimeout(res, 3000));

		const pizzaRes = await fetch("/api/pizzas");
		const pizzasJson = (await pizzaRes.json()) as PizzaType[];
		setPizzaTypes(pizzasJson);
		setLoading(false);
	}

	return (
		<div className="w-full ml-[5%]">
			<h2>Create Order</h2>
			<form
				className="flex justify-between"
				action=""
				onSubmit={(e) => {
					e.preventDefault();

					if (!selectedPizza || !price) {
						return;
					}

					setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
				}}
			>
				<div className="my-2.5 w-full border-r border-border p-3.75 text-center">
					<div className="my-2.5 text-center">
						<label
							className="mb-2.5 block text-[20px] text-secondary"
							htmlFor="pizzaType"
						>
							Pizza Type:
						</label>
						<select
							className="form-select mb-7.5 block w-full py-1.25 pl-1.25 text-[16px]"
							name="pizzaType"
							onChange={(e) => setPizzaType(e.target.value)}
							value={pizzaType}
						>
							{pizzaTypes.map((pizza) => (
								<option key={pizza.id} value={pizza.id}>
									{pizza.name}
								</option>
							))}
						</select>
					</div>
					<div className="my-2.5 text-center">
						<label
							className="mb-2.5 block text-[20px] text-secondary"
							htmlFor="pizzaSize"
						>
							Pizza Size:
						</label>
						<div>
							<span>
								<input
									className="peer sr-only"
									type="radio"
									name="pizzaSize"
									id="pizza-s"
									checked={pizzaSize === "S"}
									value="S"
									onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
								/>
								<label className={sizeLabelClass} htmlFor="pizza-s">
									Small
								</label>
							</span>
							<span>
								<input
									className="peer sr-only"
									type="radio"
									name="pizzaSize"
									id="pizza-m"
									checked={pizzaSize === "M"}
									value="M"
									onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
								/>
								<label className={sizeLabelClass} htmlFor="pizza-m">
									Medium
								</label>
							</span>
							<span>
								<input
									className="peer sr-only"
									type="radio"
									name="pizzaSize"
									id="pizza-l"
									checked={pizzaSize === "L"}
									value="L"
									onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
								/>
								<label className={sizeLabelClass} htmlFor="pizza-l">
									Large
								</label>
							</span>
						</div>
					</div>
					<button className="btn" type="submit">
						Add to cart
					</button>
				</div>
				{loading || !selectedPizza ? (
					<h3>Sedang memuat ...</h3>
				) : (
					<div className="my-2.5 ml-6.25 w-full p-3.75 text-center">
						<Pizza
							name={selectedPizza.name}
							description={selectedPizza.description}
							image={selectedPizza.image}
						/>
						<p>{price}</p>
					</div>
				)}
			</form>
			{loading ? (
				<h2>Sedang memuat ...</h2>
			) : (
				<Cart cart={cart} checkout={() => void checkout()} />
			)}
		</div>
	);
}
