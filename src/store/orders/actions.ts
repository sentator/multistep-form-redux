import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "./actionTypes";
import { OrdersSuccessPayload, OrdersRequest, OrdersSuccess, OrdersFailure } from "./types";

export const ordersRequest = (): OrdersRequest => ({
	type: FETCH_ORDERS_REQUEST,
});

export const ordersSuccess = (payload: OrdersSuccessPayload): OrdersSuccess => ({
	type: FETCH_ORDERS_SUCCESS,
	payload,
});

export const ordersFailure = (): OrdersFailure => ({
	type: FETCH_ORDERS_FAILURE,
});
