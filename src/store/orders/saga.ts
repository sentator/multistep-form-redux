import { call, put, takeLatest } from "redux-saga/effects";

import { ordersSuccess, ordersFailure, createOrderSuccess, createOrderFailure } from "./actions";
import { FETCH_ORDERS_REQUEST, CREATE_ORDER_REQUEST } from "./actionTypes";
import { OrderResponseData, OrderSendData } from "../../types";
import { fetchOrders, createNewOrder } from "../../services/ordersService";

function* fetchOrdersWorker() {
	try {
		const response: OrderResponseData[] = yield call(fetchOrders);
		yield put(ordersSuccess({ orders: response }));
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : "Сталася помилка при завантаженні списку замовлень";

		yield put(ordersFailure({ fetchingError: errorMessage }));
	}
}

function* createOrderWorker({ payload }: { type: typeof CREATE_ORDER_REQUEST; payload: { order: OrderSendData } }) {
	try {
		const response: OrderResponseData = yield call(createNewOrder, payload.order);

		yield put(createOrderSuccess({ order: response }));
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Сталася помилка при відправленні форми";

		yield put(createOrderFailure({ sendingError: errorMessage }));
	}
}

function* ordersSaga() {
	yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersWorker);
	yield takeLatest(CREATE_ORDER_REQUEST, createOrderWorker);
}

export default ordersSaga;
