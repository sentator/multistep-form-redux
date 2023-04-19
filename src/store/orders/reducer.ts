import { OrderActionTypes } from "./actionTypes";
import { OrdersActions, OrdersState } from "./types";

const initialState: OrdersState = {
	orders: [],
};

const reducer = (state = initialState, action: OrdersActions): OrdersState => {
	switch (action.type) {
		case OrderActionTypes.FETCH_ORDERS_SUCCESS:
			return { ...state, orders: action.payload.orders };
		case OrderActionTypes.CREATE_ORDER_SUCCESS:
			return { ...state, orders: [action.payload.order, ...state.orders] };
		default:
			return state;
	}
};

export default reducer;
