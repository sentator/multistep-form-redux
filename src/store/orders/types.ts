import { OrderResponseData } from "../../types";
import { GetOrdersAction, GetOrdersActionSuccess, CreateOrderAction, CreateOrderActionSuccess } from "./actionTypes";

export interface OrdersState {
	orders: OrderResponseData[];
}

export type OrdersActions = GetOrdersAction | GetOrdersActionSuccess | CreateOrderAction | CreateOrderActionSuccess;
