import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { editOrderFormContext } from "../../../../context";
import { selectOrderById } from "../../../../store/orders/selectors";
import { OrdersState } from "../../../../store/rootReducer";

import "./editOrderFormUser.scss";

const CreateOrderForm: React.FC = () => {
	const { orderId } = useParams<"orderId">();
	const order = useSelector((state: OrdersState) => selectOrderById(state, orderId));
	const { setInitialState } = React.useContext(editOrderFormContext);

	React.useEffect(() => {
		if (order) {
			setInitialState(order);
		}
	}, []);

	return (
		<div className="delivery-form-wrapper">
			<div className="container">
				<h1 className="delivery-form-wrapper__title title">Редагування замовлення</h1>
				<div className="delivery-form-wrapper__body">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default CreateOrderForm;
