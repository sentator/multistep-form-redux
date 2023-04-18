import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from "./actionTypes";
import { OrdersActions, OrdersState } from "./types";

const initialState: OrdersState = {
	orders: [],
	status: "idle",
};

const reducer = (state = initialState, action: OrdersActions): OrdersState => {
	switch (action.type) {
		case FETCH_ORDERS_REQUEST:
			return { ...state, status: "loading" };
		case FETCH_ORDERS_SUCCESS:
			return { ...state, orders: action.payload.orders, status: "idle" };
		case FETCH_ORDERS_FAILURE:
			return { ...state, status: "error" };

		default:
			return state;
	}
};

export default reducer;
