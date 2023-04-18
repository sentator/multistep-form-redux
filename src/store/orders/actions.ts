import {
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
	RESET_ORDER_SENDING_STATUS,
} from "./actionTypes";
import {
	OrdersSuccessPayload,
	OrdersFailurePayload,
	OrdersRequest,
	OrdersSuccess,
	OrdersFailure,
	CreateOrderPayload,
	CreatedOrderPayload,
	CreateOrderFailurePayload,
	CreateOrderRequest,
	CreateOrderSuccess,
	CreateOrderFailure,
	ResetOrderSendingStatus,
} from "./types";

export const ordersRequest = (): OrdersRequest => ({
	type: FETCH_ORDERS_REQUEST,
});

export const ordersSuccess = (payload: OrdersSuccessPayload): OrdersSuccess => ({
	type: FETCH_ORDERS_SUCCESS,
	payload,
});

export const ordersFailure = (payload: OrdersFailurePayload): OrdersFailure => ({
	type: FETCH_ORDERS_FAILURE,
	payload,
});

export const createOrderRequest = (payload: CreateOrderPayload): CreateOrderRequest => ({
	type: CREATE_ORDER_REQUEST,
	payload,
});

export const createOrderSuccess = (payload: CreatedOrderPayload): CreateOrderSuccess => ({
	type: CREATE_ORDER_SUCCESS,
	payload,
});

export const createOrderFailure = (payload: CreateOrderFailurePayload): CreateOrderFailure => ({
	type: CREATE_ORDER_FAILURE,
	payload,
});

export const resetOrderSendingStatus = (): ResetOrderSendingStatus => ({
	type: RESET_ORDER_SENDING_STATUS,
});
