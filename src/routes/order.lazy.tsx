import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import type { Pizza as PizzaType, PizzaSize } from "../APIResponsesTypes";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart, clearCart, selectCartItems } from "../cartSlice";
import {
	selectPizzaType,
	setPizzaType,
	selectPizzaSize,
	setPizzaSize,
} from "../orderSlice";
import { useGetPizzasQuery, usePlaceOrderMutation } from "../api/pizzaApi";

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
	const pizzaType = useAppSelector(selectPizzaType);
	const pizzaSize = useAppSelector(selectPizzaSize);
	const { data: pizzaTypes = [], isLoading: isLoadingPizzas } =
		useGetPizzasQuery();
	const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();
	const cart = useAppSelector(selectCartItems);
	const dispatch = useAppDispatch();
	const loading = isLoadingPizzas || isPlacingOrder;

	async function checkout() {
		await placeOrder(cart);
		dispatch(clearCart());
	}

	let price: string | undefined;
	let selectedPizza: PizzaType | undefined;
	if (!loading) {
		selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
		price = selectedPizza
			? intl.format(selectedPizza.sizes[pizzaSize])
			: undefined;
	}

	return (
		<div className="mx-auto grid max-w-325 grid-cols-1 gap-12.5 lg:grid-cols-[2fr_1fr]">
			<div className="w-full lg:ml-[5%]">
				<h2>Create Order</h2>
				<form
					className="flex flex-col md:flex-row md:justify-between"
					action=""
					onSubmit={(e) => {
						e.preventDefault();

						if (!selectedPizza || !price) {
							return;
						}

						dispatch(
							addToCart({ pizza: selectedPizza, size: pizzaSize, price }),
						);
					}}
				>
					<div className="my-2.5 w-full border-b border-border p-3.75 text-center md:border-r md:border-b-0">
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
								onChange={(e) => dispatch(setPizzaType(e.target.value))}
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
										onChange={(e) =>
											dispatch(setPizzaSize(e.target.value as PizzaSize))
										}
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
										onChange={(e) =>
											dispatch(setPizzaSize(e.target.value as PizzaSize))
										}
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
										onChange={(e) =>
											dispatch(setPizzaSize(e.target.value as PizzaSize))
										}
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
						<div className="my-2.5 w-full p-3.75 text-center md:ml-6.25">
							<Pizza
								name={selectedPizza.name}
								description={selectedPizza.description}
								image={selectedPizza.image}
							/>
							<p>{price}</p>
						</div>
					)}
				</form>
			</div>
			{loading ? (
				<h2>Sedang memuat ...</h2>
			) : (
				<Cart cart={cart} checkout={() => void checkout()} />
			)}
		</div>
	);
}
