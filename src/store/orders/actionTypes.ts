import { OrderResponseData, OrderSendData } from "../../types";
import { Action } from "../actionHelpers";

export enum OrderActionTypes {
	FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST",
	FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS",
	FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL",

	CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST",
	CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
	CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL",
}

export type GetOrdersAction = Action<typeof OrderActionTypes.FETCH_ORDERS_REQUEST>;
export type GetOrdersActionSuccess = Action<
	typeof OrderActionTypes.FETCH_ORDERS_SUCCESS,
	{
		orders: OrderResponseData[];
	}
>;
export type CreateOrderAction = Action<
	typeof OrderActionTypes.CREATE_ORDER_REQUEST,
	{
		order: OrderSendData;
	}
>;
export type CreateOrderActionSuccess = Action<
	typeof OrderActionTypes.CREATE_ORDER_SUCCESS,
	{
		order: OrderResponseData;
	}
>;
