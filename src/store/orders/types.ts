import { OrderResponseData, OrderFilesItem } from "../../types";
import {
	GetOrdersActionSuccess,
	CreateOrderActionSuccess,
	UpdateOrderActionSuccess,
	UpdateOrderStatusActionSuccess,
	GetOrderFilesActionSuccess,
	ReplaceOrderFilesItem,
	RemoveOrderFilesItem,
} from "./actionTypes";

export interface OrdersState {
	orders: OrderResponseData[];
	files: OrderFilesItem[];
}

export type OrdersActions =
	| GetOrdersActionSuccess
	| CreateOrderActionSuccess
	| UpdateOrderActionSuccess
	| UpdateOrderStatusActionSuccess
	| GetOrderFilesActionSuccess
	| ReplaceOrderFilesItem
	| RemoveOrderFilesItem;
