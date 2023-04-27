import React from "react";

import Button from "../button/Button";

import "./ordersTableFilters.scss";

interface OrdersTableFiltersProps {
	filterValue: string;
	setFilterValue: (columnId: string, value: string) => void;
	columnId: string;
	options: string[];
}

const OrdersTableFilters: React.FC<OrdersTableFiltersProps> = ({ filterValue, setFilterValue, columnId, options }) => {
	const selectRef = React.useRef<HTMLSelectElement>(null);

	const applyFilter = () => {
		if (selectRef.current) {
			setFilterValue(columnId, selectRef.current.value);
		}
	};

	return (
		<div className="orders-table-filters">
			<label className="orders-table-filters__filter">
				<span className="orders-table-filters__label">Статус замовлення:</span>
				<select
					className="orders-table-filters__select"
					name="orders-table-filters-select"
					defaultValue={filterValue}
					ref={selectRef}
				>
					<option value="">Всі</option>
					{options.map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
				</select>
			</label>
			<div className="orders-table-filters__button">
				<Button title="Застосувати" onClick={applyFilter} />
			</div>
		</div>
	);
};

export default OrdersTableFilters;
