import { skipToken } from "@reduxjs/toolkit/query/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useGetPastOrderQuery, useGetPastOrdersQuery } from "../api/pizzaApi";
import ErrorBoundary from "../ErrorBoundary";
import Modal from "../Modal";

const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const tableClass =
	"my-6.25 w-full min-w-[400px] border-collapse border border-[#ddd] font-sans text-[0.9em] [&_th]:px-3.75 [&_th]:py-3 [&_th]:text-center [&_td]:px-3.75 [&_td]:py-3 [&_td]:text-center [&_thead_tr]:bg-secondary [&_thead_tr]:text-left [&_thead_tr]:text-white [&_tbody_tr]:border-b [&_tbody_tr]:border-[#ddd] [&_tbody_tr:nth-of-type(even)]:bg-[#f6fef0] [&_tbody_tr:last-of-type]:border-b-2 [&_tbody_tr:last-of-type]:border-secondary";

export const Route = createLazyFileRoute("/past")({
	component: ErrorBoundaryWrappedPastOrderRoute,
});

function ErrorBoundaryWrappedPastOrderRoute() {
	return (
		<ErrorBoundary>
			<PastOrdersRoute />
		</ErrorBoundary>
	);
}

function PastOrdersRoute() {
	const [focusedOrder, setFocusedOrder] = useState<number>();
	const [page, setPage] = useState(1);

	const { data: focusedOrderData } = useGetPastOrderQuery(
		// jika focusedOrder, memiliki nilai, argumen tersebut diteruskan
		// jika focusedOrder undefined, RTK Query menerima skipToken (tidak melakukan fetching)
		focusedOrder ?? skipToken,
	);

	const { currentData, isLoading, isFetching, isError } =
		useGetPastOrdersQuery(page);

	if (isLoading) {
		return (
			<div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
				<h2>Sedang memuat...</h2>
			</div>
		);
	}

	if (isError) {
		throw new Error("Past orders could not be loaded");
	}

	if (!currentData) {
		return <p>Sedang memuat...</p>;
	}

	return (
		<div className="mx-auto min-h-[650px] w-[90%] max-w-[900px]">
			{isFetching && <p>Memperbarui data...</p>}
			<table className={tableClass}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Date</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{currentData.map((order) => (
						<tr key={order.order_id}>
							<td>
								<button
									className="btn"
									onClick={() => setFocusedOrder(order.order_id)}
								>
									{order.order_id}
								</button>
							</td>
							<td>{order.date}</td>
							<td>{order.time}</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex items-center justify-evenly">
				<button
					className="btn"
					disabled={isFetching || page <= 1}
					onClick={() => setPage(page - 1)}
				>
					Previous
				</button>
				<div className="font-pacifico text-xl text-primary">{page}</div>
				<button
					className="btn"
					disabled={isFetching || currentData.length < 10}
					onClick={() => setPage(page + 1)}
				>
					Next
				</button>
			</div>

			{focusedOrder ? (
				<Modal>
					<h2>Order # {focusedOrder}</h2>
					{focusedOrderData ? (
						<table className={tableClass}>
							<thead>
								<tr>
									<th>Image</th>
									<th>Name</th>
									<th>Size</th>
									<th>Quantity</th>
									<th>Price</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								{focusedOrderData.orderItems.map((pizza) => (
									<tr key={`${pizza.pizzaTypeId}_${pizza.name}`}>
										<td>
											<img
												className="w-12.5"
												src={pizza.image}
												alt={pizza.name}
											/>
										</td>
										<td>{pizza.name}</td>
										<td>{pizza.size}</td>
										<td>{pizza.quantity}</td>
										<td>{intl.format(pizza.price)}</td>
										<td>{intl.format(pizza.total)}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>Sedang memuat...</p>
					)}
					<button className="btn" onClick={() => setFocusedOrder(undefined)}>
						Close
					</button>
				</Modal>
			) : null}
		</div>
	);
}
