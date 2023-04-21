import { call, put, takeLatest } from "redux-saga/effects";

import { OrderResponseData, OrderProgressStatusItem } from "../../types";
import {
	OrderActionTypes,
	GetOrdersAction,
	CreateOrderAction,
	UpdateOrderAction,
	UpdateOrderStatusAction,
} from "./actionTypes";
import { getOrdersSuccess, createOrderSuccess, updateOrderSuccess, updateOrderStatusSuccess } from "./actions";
import { fetchOrders, createNewOrder, updateOrderData, updateOrderStatus } from "../../services/ordersService";

function* fetchOrdersWorker({
	type,
	payload,
	meta,
}: GetOrdersAction & { meta: { resolve: (value: OrderResponseData[]) => void; reject: (reason?: unknown) => void } }) {
	try {
		const response: OrderResponseData[] = yield call(fetchOrders);

		meta.resolve(response);
		yield put(getOrdersSuccess({ orders: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* createOrderWorker({
	type,
	payload,
	meta,
}: CreateOrderAction & { meta: { resolve: (value: OrderResponseData) => void; reject: (reason?: unknown) => void } }) {
	try {
		const response: OrderResponseData = yield call(createNewOrder, payload.order);

		meta.resolve(response);
		yield put(createOrderSuccess({ order: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* updateOrderWorker({
	type,
	payload,
	meta,
}: UpdateOrderAction & { meta: { resolve: (value: OrderResponseData) => void; reject: (reason?: unknown) => void } }) {
	try {
		const response: OrderResponseData = yield call(updateOrderData, payload.orderId, payload.order);

		meta.resolve(response);
		yield put(updateOrderSuccess({ order: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* updateOrderStatusWorker({
	type,
	payload,
	meta,
}: UpdateOrderStatusAction & {
	meta: { resolve: (value: OrderResponseData) => void; reject: (reason?: unknown) => void };
}) {
	try {
		const response: OrderResponseData = yield call(updateOrderStatus, payload.orderId, payload.status);

		meta.resolve(response);
		yield put(updateOrderStatusSuccess({ order: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* ordersSaga() {
	yield takeLatest(OrderActionTypes.FETCH_ORDERS_REQUEST, fetchOrdersWorker);
	yield takeLatest(OrderActionTypes.CREATE_ORDER_REQUEST, createOrderWorker);
	yield takeLatest(OrderActionTypes.UPDATE_ORDER_REQUEST, updateOrderWorker);
	yield takeLatest(OrderActionTypes.UPDATE_ORDER_STATUS_REQUEST, updateOrderStatusWorker);
}

export default ordersSaga;
