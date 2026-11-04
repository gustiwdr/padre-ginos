import { createLazyFileRoute } from "@tanstack/react-router";
import { useSendContactMutation } from "../api/pizzaApi";

function getString(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" ? value : "";
}

export const Route = createLazyFileRoute("/contact")({
	component: ContactRoute,
});

function ContactRoute() {
	const [sendContact, { isSuccess, isLoading }] = useSendContactMutation();

	async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		await sendContact({
			name: getString(formData, "name"),
			email: getString(formData, "email"),
			message: getString(formData, "message"),
		}).unwrap();
	}

	return (
		<div className="contact">
			<h2>Contact</h2>
			{isSuccess ? (
				<h3 className="m-12.5 text-center font-normal text-[30px] text-secondary font-pacifico">
					Submitted!
				</h3>
			) : (
				<form
					className="flex flex-col items-center"
					action=""
					onSubmit={(e) => {
						void handleSubmit(e);
					}}
				>
					<input
						className="my-3.75 w-full max-w-125 rounded-[5px] border-2 border-border p-2 focus:border-primary disabled:bg-[#999] bg-white"
						type="text"
						name="name"
						placeholder="Name"
					/>
					<input
						className="my-3.75 w-full max-w-125 rounded-[5px] border-2 border-border p-2 focus:border-primary disabled:bg-[#999] bg-white"
						type="email"
						name="email"
						placeholder="Email"
					/>
					<textarea
						className="my-3.75 min-h-[200px] w-full max-w-125 rounded-[5px] border-2 border-border p-2 focus:border-primary bg-white"
						name="message"
						id=""
						placeholder="Message"
					></textarea>
					<button className="btn" disabled={isLoading}>
						Submit
					</button>
				</form>
			)}
		</div>
	);
}
