// import { createSelector } from "reselect";
import { OrdersState } from "../rootReducer";

export const ordersSelector = (state: OrdersState) => state.orders.orders;
export const selectOrderById = (state: OrdersState, id: string | undefined) =>
	state.orders.orders.find((item) => item._id === id);
