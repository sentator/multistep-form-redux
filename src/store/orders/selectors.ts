// import { createSelector } from "reselect";
import { OrdersState } from "../rootReducer";

export const ordersSelector = (state: OrdersState) => state.orders.orders;
