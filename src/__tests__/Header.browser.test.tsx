import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Header from "../Header";
import {
	RouterProvider,
	createRouter,
	createRootRoute,
} from "@tanstack/react-router";
import type { CartItem } from "../cartSlice";
import type { Pizza } from "../APIResponsesTypes";
import { Provider } from "react-redux";
import { makeStore } from "../store";

const testPizza: Pizza = {
	id: "pepperoni",
	name: "Pepperoni",
	category: "Classic",
	description: "Pepperoni pizza",
	image: "/images/pepperoni.webp",
	sizes: {
		S: 10,
		M: 15,
		L: 20,
	},
};

const testCart: CartItem[] = [
	{ pizza: testPizza, size: "M", price: "$15.00" },
	{ pizza: testPizza, size: "L", price: "$20.00" },
	{ pizza: testPizza, size: "S", price: "$10.00" },
];

test("correctly renders a header with a zero cart count", async () => {
	const rootRoute = createRootRoute({
		component: () => (
			<Provider store={makeStore()}>
				<Header />
			</Provider>
		),
	});

	const router = createRouter({ routeTree: rootRoute });
	const screen = render(<RouterProvider router={router}></RouterProvider>);

	const itemsInCart = screen.getByTestId("cart-number");

	await expect.element(itemsInCart).toBeInTheDocument();
	await expect.element(itemsInCart).toHaveTextContent("0");
});

test("correctly renders a header with a three cart count", async () => {
	const rootRoute = createRootRoute({
		component: () => (
			<Provider store={makeStore({ cart: { items: testCart } })}>
				<Header />
			</Provider>
		),
	});

	const router = createRouter({ routeTree: rootRoute });
	const screen = render(<RouterProvider router={router}></RouterProvider>);

	const itemsInCart = screen.getByTestId("cart-number");

	await expect.element(itemsInCart).toBeInTheDocument();
	await expect.element(itemsInCart).toHaveTextContent("3");
});
