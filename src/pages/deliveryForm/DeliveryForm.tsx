import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import "./deliveryForm.scss";

const DeliveryForm: React.FC = () => {
	const { pathname } = useLocation();

	if (pathname === "/new-order") {
		return <Navigate to="/new-order/general-information" />;
	}

	return (
		<div className="delivery-form-wrapper">
			<div className="container">
				<h1 className="delivery-form-wrapper__title title">Нове відправлення</h1>
				<div className="delivery-form-wrapper__body">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DeliveryForm;
