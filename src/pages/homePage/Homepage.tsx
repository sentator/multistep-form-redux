import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { prepareOrdersTableData } from "../../utils";
import { useOrdersTableColumns } from "../../hooks";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersTable from "../../components/ordersTable/OrdersTable";
import { ordersRequest } from "../../store/orders/actions";
import { ordersStatusSelector, ordersSelector } from "../../store/orders/selectors";

import "./homepage.scss";

const Homepage = () => {
	const columns = useOrdersTableColumns();
	const dispatch = useDispatch();
	const orders = useSelector(ordersSelector);
	const status = useSelector(ordersStatusSelector);

	const data = React.useMemo(() => prepareOrdersTableData(orders), [orders]);

	React.useEffect(() => {
		dispatch(ordersRequest());
	}, []);

	return (
		<div className="wrapper">
			<div className="homepage">
				<header className="homepage__header">
					<div className="homepage__create-new">
						<NavigationLink
							title="Зареєструвати відправлення"
							to="/new-order/generalInformation"
							iconPosition="right"
						/>
					</div>
				</header>
				<div className="homepage__body">
					<div className="section-orders">
						<h2 className="section-orders__title">Мої відправлення</h2>
						<div className="section-orders__body">
							{status === "loading" && <p>Завантажуємо список замовлень...</p>}
							{status === "error" && <p>Сталася помилка при завантаженні списку замовлень</p>}
							{status === "idle" && orders && orders.length ? (
								<OrdersTable columns={columns} data={data} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
