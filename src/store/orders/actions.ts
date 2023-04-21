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
