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
		case OrderActionTypes.UPDATE_ORDER_SUCCESS:
			return {
				...state,
				orders: state.orders.map((order) => {
					if (order._id === action.payload.order._id) {
						return action.payload.order;
					}

					return order;
				}),
			};
		case OrderActionTypes.UPDATE_ORDER_STATUS_SUCCESS:
			return {
				...state,
				orders: state.orders.map((order) => {
					if (order._id === action.payload.order._id) {
						return action.payload.order;
					}

					return order;
				}),
			};
		default:
			return state;
	}
};

export default reducer;
