import { expect, test, vi } from "vitest";
import { render } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { renderHook, waitFor } from "@testing-library/react";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// Data tiruan yang akan dikembalikan API mock
// Objek ini menjadi nilai yang diharapkan ketika hook berhasil mengambil data pizza
const testPizza = {
	id: "calabrese",
	name: "The Calabrese Pizza",
	category: "Supreme",
	description: "Salami, Pancetta, Tomatoes, Red Onions, etc.",
	image: "/public/pizzas/calabrese.webp",
	sizes: { S: 12.25, M: 16.25, L: 20.25 },
};

// Helper function untuk mengambil nilai awal hook melalui komponen
function getPizzaOfTheDay() {
	let pizza;

	// Buat komponen React yang memanggil custom hook
	function TestComponent() {
		// Ambil nili yang dikembalikan hook dan simpan ke variabel pizza
		pizza = usePizzaOfTheDay();
		return null;
	}

	// Jalankan komponen di lingkungan testing
	render(<TestComponent />);

	return pizza;
}

test("gives null when first called", async () => {
	fetch.mockResponseOnce(JSON.stringify(testPizza));
	const pizza = getPizzaOfTheDay();
	expect(pizza).toBeNull();
});

// Menggunakan API yang memang dirancang untuk menguji custom hook (renderHook => tanpa harus buat komponennya sendiri)
test("to be null on initial load", async () => {
	fetch.mockResponseOnce(JSON.stringify(testPizza));
	const { result } = renderHook(() => usePizzaOfTheDay());
	expect(result.current).toBeNull();
});

test("to call the API and give back the pizza of the day", async () => {
	fetch.mockResponseOnce(JSON.stringify(testPizza));
	const { result } = renderHook(() => usePizzaOfTheDay());

	// Periksa jika hook menghasilkan data pizza yang diharapkan
	await waitFor(() => {
		expect(result.current).toEqual(testPizza);
	});

	// Periksa jika hook meminta data dari endpoint yang benar
	expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
