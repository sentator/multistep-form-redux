// import { createSelector } from "reselect";
import { OrdersState } from "../rootReducer";

export const ordersStatusSelector = (state: OrdersState) => state.orders.status;
export const ordersSelector = (state: OrdersState) => state.orders.orders;
