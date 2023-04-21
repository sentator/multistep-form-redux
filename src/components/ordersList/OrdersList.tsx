import React from "react";

import { OrderResponseData } from "../../types";
import OrdersListItem from "../ordersListItem/OrdersListItem";

import "./ordersList.scss";

interface OrdersListProps {
	items: OrderResponseData[];
}

const OrdersList: React.FC<OrdersListProps> = ({ items }) => {
	return (
		<div className="orders-list">
			<div className="orders-list__list">
				{items.map((item) => (
					<div className="orders-list__item" key={item._id}>
						<OrdersListItem
							countryLabel={item.generalInformation.country.label}
							parcelName={item.generalInformation.parcelName}
							trackNumber={item.generalInformation.trackNumber}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrdersList;
