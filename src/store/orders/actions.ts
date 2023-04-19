import { createAction } from "../actionHelpers";
import {
	OrderActionTypes,
	GetOrdersAction,
	GetOrdersActionSuccess,
	CreateOrderAction,
	CreateOrderActionSuccess,
} from "./actionTypes";

export const getOrders = createAction<GetOrdersAction>(OrderActionTypes.FETCH_ORDERS_REQUEST);
export const getOrdersSuccess = createAction<GetOrdersActionSuccess>(OrderActionTypes.FETCH_ORDERS_SUCCESS);
export const createOrder = createAction<CreateOrderAction>(OrderActionTypes.CREATE_ORDER_REQUEST);
export const createOrderSuccess = createAction<CreateOrderActionSuccess>(OrderActionTypes.CREATE_ORDER_SUCCESS);
