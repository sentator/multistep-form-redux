import { OrderResponseData } from "../../types";
import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "./actionTypes";

export interface OrdersState {
	orders: OrderResponseData[];
	status: "idle" | "loading" | "error";
}

export interface OrdersSuccessPayload {
	orders: OrderResponseData[];
}

export interface OrdersRequest {
	type: typeof FETCH_ORDERS_REQUEST;
}

export interface OrdersSuccess {
	type: typeof FETCH_ORDERS_SUCCESS;
	payload: OrdersSuccessPayload;
}

export interface OrdersFailure {
	type: typeof FETCH_ORDERS_FAILURE;
}

export type OrdersActions = OrdersRequest | OrdersSuccess | OrdersFailure;
