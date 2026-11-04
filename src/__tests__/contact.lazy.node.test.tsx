import { render } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { Route } from "../routes/contact.lazy";
import { Provider } from "react-redux";
import { makeStore } from "../store";

// Buat fetch versi palsu untuk testing, di mana fetch mengirim HTTP request ke endpoint
// createFetchMock(vi): membuat util mock
// enableMocks(): mengganti implementasi fetch yang digunakan aplikasi dengan versi mock
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const ContactRoute = Route.options.component;

if (!ContactRoute) {
	throw new Error("Contact route has no component");
}

test("can submit contact form", async () => {
	fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
	const screen = render(
		<Provider store={makeStore()}>
			<ContactRoute />
		</Provider>,
	);

	// Cari elemen berdasarkan placeholder di form
	const nameInput = screen.getByPlaceholderText("Name") as HTMLInputElement;
	const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
	const messageInput = screen.getByPlaceholderText(
		"Message",
	) as HTMLTextAreaElement;

	// Data test (mewakili data yang akan dimasukkan pengguna)
	const testData = {
		name: "Brian",
		email: "test@example.com",
		message: "This is a test message",
	};

	// Menetapkan nilai properti value dari ketiga elemen DOM dengan data test yang sudah dibuat
	nameInput.value = testData.name;
	emailInput.value = testData.email;
	messageInput.value = testData.message;

	// Tekan tombol submit
	const btn = screen.getByRole("button");
	btn.click();

	// Tunggu hasil sukses
	const h3 = await screen.findByRole("heading", { level: 3 });

	expect(h3.innerText).toContain("Submitted");

	// Memastikan jumlah request yang tercatat adalah tepat satu untuk menghindari/mendeteksi perilaku duplikasi
	const requests = fetchMocker.requests();
	expect(requests.length).toBe(1);
	expect(requests[0].url).toBe("/api/contact");

	const request = fetchMocker.mock.calls[0][0] as Request;

	expect(request.url).toBe("/api/contact");
	expect(request.method).toBe("POST");
	expect(request.headers.get("content-type")).toContain("application/json");
	expect(await request.clone().json()).toEqual(testData);
});
