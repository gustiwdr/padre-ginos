import { createContext } from "react";

/**
 * CartContext: context untuk berbagi data keranjang belanja ke seluruh komponen.
 *
 * Nilai default berupa tuple [cart, setCart], mirip hasi useState:
 * - elemen pertama: array kosong ([]) sebagai isi keranjang belanja awal.
 * - elemen kedua: fungsi kosong (function () {}) sebagai placeholder untuk fungsi pengubah keranjang belanja.
 *
 * Nilai default ini hanya dipakai saat komponen mengakses context di luar <CartContext.Provider>. Nilai aslinya diisi oleh Provider (biasanya dari useState di komponen induk (App)).
 */

export const CartContext = createContext([[], function () {}]);
