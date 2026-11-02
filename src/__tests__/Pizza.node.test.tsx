import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import Pizza from "../Pizza";
afterEach(cleanup);

test("alt text renders on image", () => {
	const name = "My Favorite Pizza";
	const src = "https://picsum.photos/200";
	const { container } = render(
		<Pizza name={name} description="super cool pizza" image={src} />,
	);

	const img = container.querySelector("img") as HTMLImageElement;
	expect(img.src).toBe(src);
	expect(img.alt).toBe(name);
});

test("to have default image if none is provided", () => {
	const { container } = render(
		<Pizza name={"Cool Pizza"} description="super cool pizza" />,
	);

	const img = container.querySelector("img") as HTMLImageElement;
	expect(img.src).not.toBe("");
});
