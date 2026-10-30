import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartContext, type CartItem } from "../contexts";
import Header from "../Header";
import PizzaOfTheDay from "../PizzaOfTheDay";

// createRootRoute: route paling atas, jadi layout di sini dipakai oleh semua halaman
export const Route = createRootRoute({
	component: () => {
		// useState return dua hal: cart (index ke-0) sebagai value-nya, dan setCart (index ke-1) sebagai fungsi untuk mengubahnya.
		// Di sini keduanya sengaja tidak dipecah, langsung disimpan utuh sebagai cartHook.
		const cartHook = useState<CartItem[]>([]);

		return (
			<>
				<CartContext.Provider value={cartHook}>
					<div>
						<Header />
						<Outlet />
						<PizzaOfTheDay />
					</div>
				</CartContext.Provider>

				{/* Devtools hanya alat bantu debugging routing saat development */}
				<TanStackRouterDevtools />
				<ReactQueryDevtools />
			</>
		);
	},
});
