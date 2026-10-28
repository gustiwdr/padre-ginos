import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";
import Order from "./Order";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Cart from "./Cart";
import Header from "./Header";
import { CartContext } from "./contexts";

const App = () => {
	const cartHook = useState([]);

	return (
		// StrictMode: komponen pembungkus yang membantu mendeteksi potensi masalah di aplikasi React. StrictMode tidak memengaruhi perilaku aplikasi di produksi, tetapi memberikan peringatan dan pemeriksaan tambahan selama pengembangan. Strictmode memberikan extra warning, dia akan menjalankan app kita sebanyak dua kali/render app dua kali.
		<StrictMode>
			<CartContext.Provider value={cartHook}>
				<Header />
				<Order />
				<PizzaOfTheDay />
			</CartContext.Provider>
		</StrictMode>
	);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
