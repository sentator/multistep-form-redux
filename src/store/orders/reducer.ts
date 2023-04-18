import {
	FETCH_ORDERS_REQUEST,
	FETCH_ORDERS_SUCCESS,
	FETCH_ORDERS_FAILURE,
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_FAILURE,
	RESET_ORDER_SENDING_STATUS,
} from "./actionTypes";
import { OrdersActions, OrdersState } from "./types";

const initialState: OrdersState = {
	orders: [],
	fetchingStatus: "idle",
	fetchingError: null,
	sendingStatus: "idle",
	sendingError: null,
};

const reducer = (state = initialState, action: OrdersActions): OrdersState => {
	switch (action.type) {
		case FETCH_ORDERS_REQUEST:
			return { ...state, fetchingStatus: "loading" };
		case FETCH_ORDERS_SUCCESS:
			return { ...state, orders: action.payload.orders, fetchingStatus: "idle" };
		case FETCH_ORDERS_FAILURE:
			return { ...state, fetchingStatus: "error", fetchingError: action.payload.fetchingError };
		case CREATE_ORDER_REQUEST:
			return { ...state, sendingStatus: "sending" };
		case CREATE_ORDER_SUCCESS:
			return { ...state, orders: [action.payload.order, ...state.orders], sendingStatus: "success" };
		case CREATE_ORDER_FAILURE:
			return { ...state, sendingStatus: "error", sendingError: action.payload.sendingError };
		case RESET_ORDER_SENDING_STATUS: {
			return { ...state, sendingStatus: "idle" };
		}
		default:
			return state;
	}
};

export default reducer;
