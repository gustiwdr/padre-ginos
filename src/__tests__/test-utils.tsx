import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../store";

// Komponen wrapper
export function createWrapper() {
	const store = makeStore();

	return function Wrapper({ children }: { children: ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	};
}
