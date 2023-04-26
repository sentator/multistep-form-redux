import {
	OrderResponseData,
	OrderProgressStatusItem,
	EditOrderFormState,
	UploadedFile,
	CreateOrderFormState,
} from "../../types";
import { Action } from "../actionHelpers";

export enum OrderActionTypes {
	FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST",
	FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS",
	FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL",

	CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST",
	CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS",
	CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL",

	UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST",
	UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS",
	UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL",

	UPDATE_ORDER_STATUS_REQUEST = "UPDATE_ORDER_STATUS",
	UPDATE_ORDER_STATUS_SUCCESS = "UPDATE_ORDER_STATUS_SUCCESS",
	UPDATE_ORDER_STATUS_FAIL = "UPDATE_ORDER_STATUS_FAIL",

	GET_ORDER_FILES_REQUEST = "GET_ORDER_FILES_REQUEST",
	GET_ORDER_FILES_SUCCESS = "GET_ORDER_FILES_SUCCESS",
	GET_ORDER_FILES_FAIL = "GET_ORDER_FILES_FAIL",

	REPLACE_ORDER_FILES_ITEM = "REPLACE_ORDER_FILES_ITEM",
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
		order: CreateOrderFormState;
	}
>;
export type CreateOrderActionSuccess = Action<
	typeof OrderActionTypes.CREATE_ORDER_SUCCESS,
	{
		order: OrderResponseData;
	}
>;

export type UpdateOrderAction = Action<
	typeof OrderActionTypes.UPDATE_ORDER_REQUEST,
	{
		orderId: string;
		order: Omit<EditOrderFormState, "status">;
		filesToDelete?: UploadedFile[];
	}
>;
export type UpdateOrderActionSuccess = Action<
	typeof OrderActionTypes.UPDATE_ORDER_SUCCESS,
	{
		order: OrderResponseData;
	}
>;

export type UpdateOrderStatusAction = Action<
	typeof OrderActionTypes.UPDATE_ORDER_STATUS_REQUEST,
	{
		orderId: string;
		status: OrderProgressStatusItem;
	}
>;
export type UpdateOrderStatusActionSuccess = Action<
	typeof OrderActionTypes.UPDATE_ORDER_STATUS_SUCCESS,
	{
		order: OrderResponseData;
	}
>;

export type GetOrderFilesAction = Action<
	typeof OrderActionTypes.GET_ORDER_FILES_REQUEST,
	{
		orderId: string;
		files: UploadedFile[];
	}
>;
export type GetOrderFilesActionSuccess = Action<
	typeof OrderActionTypes.GET_ORDER_FILES_SUCCESS,
	{
		item: {
			orderId: string;
			files: File[];
		};
	}
>;
export type ReplaceOrderFilesItem = Action<
	typeof OrderActionTypes.REPLACE_ORDER_FILES_ITEM,
	{
		item: {
			orderId: string;
			files: File[];
		};
	}
>;
