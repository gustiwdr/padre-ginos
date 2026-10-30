import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

const App = () => {
	return (
		// StrictMode: komponen pembungkus yang membantu mendeteksi potensi masalah di aplikasi React. StrictMode tidak memengaruhi perilaku aplikasi di produksi, tetapi memberikan peringatan dan pemeriksaan tambahan selama pengembangan. Strictmode memberikan extra warning, dia akan menjalankan app kita sebanyak dua kali/render app dua kali.
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	);
};

const container = document.getElementById("root");

if (!container) {
	throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
