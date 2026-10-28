import { usePizzaOfTheDay } from "./usePizzaOfTheDay";

const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const PizzaOfTheDay = () => {
	const pizzaOfTheDay = usePizzaOfTheDay();

	if (!pizzaOfTheDay) {
		return <div>Sedang memuat ...</div>;
	}

	return (
		<div className="pizza-of-the-day">
			<h2>Pizza Of The Day</h2>
			<div>
				<div className="pizza-of-the-day-info">
					<h3>{pizzaOfTheDay.name}</h3>
					<p>{pizzaOfTheDay.description}</p>
					<p className="pizza-of-the-day-price">
						From: <span>{intl.format(pizzaOfTheDay.sizes.S)}</span>
					</p>
				</div>
				<img
					src={pizzaOfTheDay.image}
					alt={pizzaOfTheDay.name}
					className="pizza-of-the-day-image"
				/>
			</div>
		</div>
	);
};

export default PizzaOfTheDay;
