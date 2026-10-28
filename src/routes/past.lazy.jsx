import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import getPastOrders from "../api/getPastOrders";

export const Route = createLazyFileRoute("/past")({
	component: PastOrdersRoute,
});

function PastOrdersRoute() {
	// state untuk menyimpan halaman yang sedang dibuka, dimulai dari halaman 1.
	// page (index ke-0) itu value-nya, setPage (index ke-1) fungsi untuk mengubahnya.
	const [page, setPage] = useState(1);

	// useQuery dari React Query dipakai untuk mengambil data dari server (fetching) sekaligus mengelola cache-nya.
	// Hasilnya berupa object, di sini kita ambil isLoading (true selama data pertama kali diambil) dan data (hasil dari queryFn).
	const { isLoading, data } = useQuery({
		// queryKey: "identitas" cache untuk query ini.
		// Karena ada page di dalamnya, tiap halaman punya cache sendiri, dan setiap page berubah, query otomatis jalan lagi.
		queryKey: ["past-orders", page],

		// queryFn: fungsi yang benar-benar mengambil data, di sini getPastOrders sesuai halaman yang aktif.
		queryFn: () => getPastOrders(page),

		// staleTime: berapa lama (dalam milidetik) data dianggap masih "fresh".
		// 30000 ms = 30 detik, selama itu React Query memakai cache dan tidak fetch ulang ke server.
		staleTime: 30000,
	});

	if (isLoading) {
		return (
			<div className="past-orders">
				<h2>Sedang memuat...</h2>
			</div>
		);
	}

	return (
		<div className="past-orders">
			<table>
				<thead>
					<tr>
						<td>ID</td>
						<td>Date</td>
						<td>Time</td>
					</tr>
				</thead>
				<tbody>
					{data.map((order) => (
						<tr key={order.order_id}>
							<td>{order.order_id}</td>
							<td>{order.date}</td>
							<td>{order.time}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="pages">
				<button disabled={page <= 1} onClick={() => setPage(page - 1)}>
					Previous
				</button>
				<div>{page}</div>
				<button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
					Next
				</button>
			</div>
		</div>
	);
}
