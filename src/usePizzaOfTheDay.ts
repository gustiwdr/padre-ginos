import { useEffect, useState, useDebugValue } from "react";
import type { Pizza } from "./APIResponsesTypes";

// Custom hook
export const usePizzaOfTheDay = () => {
	const [pizzaOfTheDay, setPizzaOfTheDay] = useState<Pizza | null>(null);

	useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.name}` : "Loading...");

	useEffect(() => {
		async function fetchPizzaOfTheDay() {
			const res = await fetch("/api/pizza-of-the-day");
			const data = (await res.json()) as Pizza;
			setPizzaOfTheDay(data);
		}

		void fetchPizzaOfTheDay();
	}, []);

	return pizzaOfTheDay;
};
