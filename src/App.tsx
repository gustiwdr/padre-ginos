import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const App = () => {
	return (
		// StrictMode: komponen pembungkus yang membantu mendeteksi potensi masalah di aplikasi React. StrictMode tidak memengaruhi perilaku aplikasi di produksi, tetapi memberikan peringatan dan pemeriksaan tambahan selama pengembangan. Strictmode memberikan extra warning, dia akan menjalankan app kita sebanyak dua kali/render app dua kali.
		<StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</StrictMode>
	);
};

const container = document.getElementById("root");

if (!container) {
	throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
