import { call, put, takeLatest } from "redux-saga/effects";

import { OrderResponseData } from "../../types";
import { OrderActionTypes, GetOrdersAction, CreateOrderAction } from "./actionTypes";
import { getOrdersSuccess, createOrderSuccess } from "./actions";
import { fetchOrders, createNewOrder } from "../../services/ordersService";

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

function* ordersSaga() {
	yield takeLatest(OrderActionTypes.FETCH_ORDERS_REQUEST, fetchOrdersWorker);
	yield takeLatest(OrderActionTypes.CREATE_ORDER_REQUEST, createOrderWorker);
}

export default ordersSaga;
