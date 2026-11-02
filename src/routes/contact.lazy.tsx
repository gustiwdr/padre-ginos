import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import postContact from "../api/postContact";

function getString(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" ? value : "";
}

export const Route = createLazyFileRoute("/contact")({
	component: ContactRoute,
});

function ContactRoute() {
	const mutation = useMutation({
		mutationFn: function (e: SubmitEvent<HTMLFormElement>) {
			e.preventDefault();
			const formData = new FormData(e.target);

			return postContact(
				getString(formData, "name"),
				getString(formData, "email"),
				getString(formData, "message"),
			);
		},
	});

	return (
		<div className="contact">
			<h2>Contact</h2>
			{mutation.isSuccess ? (
				<h3 className="m-12.5 text-center font-normal text-[30px] text-secondary font-pacifico">
					Submitted!
				</h3>
			) : (
				<form
					className="flex flex-col items-center"
					action=""
					onSubmit={mutation.mutate}
				>
					<input
						className="my-3.75 w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary disabled:bg-[#999]"
						type="text"
						name="name"
						placeholder="Name"
					/>
					<input
						className="my-3.75 w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary disabled:bg-[#999]"
						type="email"
						name="email"
						placeholder="Email"
					/>
					<textarea
						className="my-3.75 min-h-[200px] w-[500px] rounded-[5px] border-2 border-border p-2 focus:border-primary"
						name="message"
						id=""
						placeholder="Message"
					></textarea>
					<button className="btn">Submit</button>
				</form>
			)}
		</div>
	);
}
