import { OrderResponseData, OrderSendData } from "../../types";
import {
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
	RESET_ORDER_SENDING_STATUS,
} from "./actionTypes";

export interface OrdersState {
	orders: OrderResponseData[];
	fetchingStatus: "idle" | "loading" | "error";
	fetchingError: string | null;
	sendingStatus: "idle" | "sending" | "error" | "success";
	sendingError: string | null;
}

export interface OrdersSuccessPayload {
	orders: OrderResponseData[];
}

export interface OrdersFailurePayload {
	fetchingError: string;
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
	payload: OrdersFailurePayload;
}

export interface CreateOrderPayload {
	order: OrderSendData;
}

export interface CreatedOrderPayload {
	order: OrderResponseData;
}

export interface CreateOrderFailurePayload {
	sendingError: string;
}

export interface CreateOrderRequest {
	type: typeof CREATE_ORDER_REQUEST;
	payload: CreateOrderPayload;
}

export interface CreateOrderSuccess {
	type: typeof CREATE_ORDER_SUCCESS;
	payload: CreatedOrderPayload;
}

export interface CreateOrderFailure {
	type: typeof CREATE_ORDER_FAILURE;
	payload: CreateOrderFailurePayload;
}

export interface ResetOrderSendingStatus {
	type: typeof RESET_ORDER_SENDING_STATUS;
}

export type OrdersActions =
	| OrdersRequest
	| OrdersSuccess
	| OrdersFailure
	| CreateOrderRequest
	| CreateOrderSuccess
	| CreateOrderFailure
	| ResetOrderSendingStatus;
