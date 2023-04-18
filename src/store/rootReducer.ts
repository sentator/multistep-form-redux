import { combineReducers } from "redux";

import ordersReducer from "./orders/reducer";

const rootReducer = combineReducers({
	orders: ordersReducer,
});

export type OrdersState = ReturnType<typeof rootReducer>;
export default rootReducer;
