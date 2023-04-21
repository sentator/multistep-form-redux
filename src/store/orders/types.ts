import { OrderResponseData } from "../../types";
import {
	GetOrdersActionSuccess,
	CreateOrderActionSuccess,
	UpdateOrderActionSuccess,
	UpdateOrderStatusActionSuccess,
} from "./actionTypes";

export interface OrdersState {
	orders: OrderResponseData[];
}

export type OrdersActions =
	| GetOrdersActionSuccess
	| CreateOrderActionSuccess
	| UpdateOrderActionSuccess
	| UpdateOrderStatusActionSuccess;
