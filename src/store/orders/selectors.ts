// import { createSelector } from "reselect";
import { OrdersState } from "../rootReducer";

export const ordersFetchingStatusSelector = (state: OrdersState) => state.orders.fetchingStatus;
export const ordersSendingStatusSelector = (state: OrdersState) => state.orders.sendingStatus;
export const ordersFetchingErrorSelector = (state: OrdersState) => state.orders.fetchingError;
export const ordersSendingErrorSelector = (state: OrdersState) => state.orders.sendingError;
export const ordersSelector = (state: OrdersState) => state.orders.orders;
