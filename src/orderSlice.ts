import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PizzaSize } from "./APIResponsesTypes";

export interface OrderState {
	pizzaType: string;
	pizzaSize: PizzaSize;
}

const initialState: OrderState = {
	pizzaType: "pepperoni",
	pizzaSize: "M",
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setPizzaType: (state, action: PayloadAction<string>) => {
			state.pizzaType = action.payload;
		},

		setPizzaSize: (state, action: PayloadAction<PizzaSize>) => {
			state.pizzaSize = action.payload;
		},
	},
	selectors: {
		selectPizzaType: (sliceState) => sliceState.pizzaType,
		selectPizzaSize: (sliceState) => sliceState.pizzaSize,
	},
});

export { orderSlice };
export const { setPizzaType, setPizzaSize } = orderSlice.actions;
export default orderSlice.reducer;

export const { selectPizzaType, selectPizzaSize } = orderSlice.selectors;
