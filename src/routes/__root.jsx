import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { CartContext } from "../contexts";
import Header from "../Header";
import PizzaOfTheDay from "../PizzaOfTheDay";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

// createRootRoute: route paling atas, jadi layout di sini dipakai oleh semua halaman
export const Route = createRootRoute({
	component: () => {
		// useState return dua hal: cart (index ke-0) sebagai value-nya, dan setCart (index ke-1) sebagai fungsi untuk mengubahnya.
		// Di sini keduanya sengaja tidak dipecah, langsung disimpan utuh sebagai cartHook.
		const cartHook = useState([]);

		return (
			<>
				<CartContext.Provider value={cartHook}>
					<div>
						<Header />
						<Outlet />
						<PizzaOfTheDay />
					</div>
				</CartContext.Provider>
				<TanStackRouterDevtools />
			</>
		);
	},
});
