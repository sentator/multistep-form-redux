import { createAction } from "../actionHelpers";
import {
	OrderActionTypes,
	GetOrdersAction,
	GetOrdersActionSuccess,
	CreateOrderAction,
	CreateOrderActionSuccess,
	UpdateOrderAction,
	UpdateOrderActionSuccess,
	UpdateOrderStatusAction,
	UpdateOrderStatusActionSuccess,
	GetOrderFilesAction,
	GetOrderFilesActionSuccess,
	ReplaceOrderFilesItem,
	RemoveOrderFilesItem,
} from "./actionTypes";

export const getOrders = createAction<GetOrdersAction>(OrderActionTypes.FETCH_ORDERS_REQUEST);
export const getOrdersSuccess = createAction<GetOrdersActionSuccess>(OrderActionTypes.FETCH_ORDERS_SUCCESS);
export const createOrder = createAction<CreateOrderAction>(OrderActionTypes.CREATE_ORDER_REQUEST);
export const createOrderSuccess = createAction<CreateOrderActionSuccess>(OrderActionTypes.CREATE_ORDER_SUCCESS);
export const updateOrder = createAction<UpdateOrderAction>(OrderActionTypes.UPDATE_ORDER_REQUEST);
export const updateOrderSuccess = createAction<UpdateOrderActionSuccess>(OrderActionTypes.UPDATE_ORDER_SUCCESS);
export const updateOrderStatus = createAction<UpdateOrderStatusAction>(OrderActionTypes.UPDATE_ORDER_STATUS_REQUEST);
export const updateOrderStatusSuccess = createAction<UpdateOrderStatusActionSuccess>(
	OrderActionTypes.UPDATE_ORDER_STATUS_SUCCESS
);
export const getOrderFiles = createAction<GetOrderFilesAction>(OrderActionTypes.GET_ORDER_FILES_REQUEST);
export const getOrderFilesSuccess = createAction<GetOrderFilesActionSuccess>(OrderActionTypes.GET_ORDER_FILES_SUCCESS);
export const replaceOrderFilesItem = createAction<ReplaceOrderFilesItem>(OrderActionTypes.REPLACE_ORDER_FILES_ITEM);
export const removeOrderFilesItem = createAction<RemoveOrderFilesItem>(OrderActionTypes.REMOVE_ORDER_FILES_ITEM);
