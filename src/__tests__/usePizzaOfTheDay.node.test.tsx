import { beforeEach, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { useGetPizzaOfTheDayQuery } from "../api/pizzaApi";
import { createWrapper } from "./test-utils";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

beforeEach(() => {
	fetchMocker.resetMocks();
});

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

// Menggunakan API yang memang dirancang untuk menguji custom hook (renderHook => tanpa harus buat komponennya sendiri)
test("to be null on initial load", () => {
	fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
	const { result } = renderHook(() => useGetPizzaOfTheDayQuery(), {
		wrapper: createWrapper(),
	});
	expect(result.current.data).toBeUndefined();
});

test("to call the API and give back the pizza of the day", async () => {
	fetchMocker.mockResponseOnce(JSON.stringify(testPizza));

	const { result } = renderHook(() => useGetPizzaOfTheDayQuery(), {
		wrapper: createWrapper(),
	});

	// Periksa jika hook menghasilkan data pizza yang diharapkan
	await waitFor(() => {
		expect(result.current.data).toEqual(testPizza);
	});

	// Periksa jika hook meminta data dari endpoint yang benar
	expect(fetchMocker).toBeCalledWith(
		expect.objectContaining({
			url: "/api/pizza-of-the-day",
		}),
	);

	expect(fetchMocker).toHaveBeenCalledTimes(1);
});
