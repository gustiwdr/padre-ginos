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
		<div className="order">
			<h2>Create Order</h2>
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();

					if (!selectedPizza || !price) {
						return;
					}

					setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
				}}
			>
				<div>
					<div>
						<label htmlFor="pizzaType">Pizza Type:</label>
						<select
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
					<div>
						<label htmlFor="pizzaSize">Pizza Size:</label>
						<div>
							<span>
								<input
									type="radio"
									name="pizzaSize"
									id="pizza-s"
									checked={pizzaSize === "S"}
									value="S"
									onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
								/>
								<label htmlFor="pizza-s">Small</label>
							</span>
							<span>
								<input
									type="radio"
									name="pizzaSize"
									id="pizza-m"
									checked={pizzaSize === "M"}
									value="M"
									onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
								/>
								<label htmlFor="pizza-m">Medium</label>
							</span>
							<span>
								<input
									type="radio"
									name="pizzaSize"
									id="pizza-l"
									checked={pizzaSize === "L"}
									value="L"
									onChange={(e) => setPizzaSize(e.target.value as PizzaSize)}
								/>
								<label htmlFor="pizza-l">Large</label>
							</span>
						</div>
					</div>
					<button type="submit">Add to cart</button>
				</div>
				{loading || !selectedPizza ? (
					<h3>Sedang memuat ...</h3>
				) : (
					<div className="order-pizza">
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
