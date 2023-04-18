import { all, fork } from "redux-saga/effects";

import ordersSaga from "./orders/saga";

export function* rootSaga() {
	yield all([fork(ordersSaga)]);
}
