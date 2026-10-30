import { createContext } from "react";
import type { Pizza, PizzaSize } from "./APIResponsesTypes";

/**
 * CartContext: context untuk berbagi data keranjang belanja ke seluruh komponen.
 *
 * Nilai default berupa tuple [cart, setCart], mirip hasi useState:
 * - elemen pertama: array kosong ([]) sebagai isi keranjang belanja awal.
 * - elemen kedua: fungsi kosong (function () {}) sebagai placeholder untuk fungsi pengubah keranjang belanja.
 *
 * Nilai default ini hanya dipakai saat komponen mengakses context di luar <CartContext.Provider>. Nilai aslinya diisi oleh Provider (biasanya dari useState di komponen induk (App)).
 */

export interface CartItem {
	pizza: Pizza;
	size: PizzaSize;
	price: String;
}

export const CartContext = createContext<
	[CartItem[], (cart: CartItem[]) => void]
>([[], () => {}]);
