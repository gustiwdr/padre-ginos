import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../Header";
import PizzaOfTheDay from "../PizzaOfTheDay";

// createRootRoute: route paling atas, jadi layout di sini dipakai oleh semua halaman
export const Route = createRootRoute({
	component: () => (
		<>
			<div>
				<Header />
				<Outlet />
				<PizzaOfTheDay />
			</div>

			{/* Devtools hanya alat bantu debugging routing saat development */}
			<TanStackRouterDevtools />
			<ReactQueryDevtools />
		</>
	),
});
