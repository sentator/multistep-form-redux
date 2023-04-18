import { call, put, takeLatest } from "redux-saga/effects";

import { ordersSuccess, ordersFailure } from "./actions";
import { FETCH_ORDERS_REQUEST } from "./actionTypes";
import { OrderResponseData } from "../../types";
import { apiClient } from "../../apiClient";
import { replaceCountryIconPath } from "../../utils";

const fetchOrders = async () => {
	const { data } = await apiClient.get<OrderResponseData[]>("/api/orders");
	const orders = replaceCountryIconPath(data);
	return orders;
};

function* fetchOrdersWorker() {
	try {
		const response: OrderResponseData[] = yield call(fetchOrders);

		yield put(ordersSuccess({ orders: response }));
	} catch (error) {
		yield put(ordersFailure());
	}
}

function* ordersSaga() {
	yield takeLatest(FETCH_ORDERS_REQUEST, fetchOrdersWorker);
}

export default ordersSaga;
