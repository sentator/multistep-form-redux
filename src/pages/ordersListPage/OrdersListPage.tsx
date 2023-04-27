import React from "react";
import { useSelector } from "react-redux";

import { prepareOrdersTableData } from "../../utils";
import { useOrdersTableColumns } from "../../hooks";
import { useActionAsync } from "../../store/action.hook";
import NavigationLink from "../../components/navigationLink/NavigationLink";
import OrdersTable from "../../components/ordersTable/OrdersTable";
import { getOrders as getOrdersAction } from "../../store/orders/actions";
import { ordersSelector } from "../../store/orders/selectors";

import "./ordersListPage.scss";

const OrdersListPage = () => {
	const columns = useOrdersTableColumns();
	const orders = useSelector(ordersSelector);

	const data = React.useMemo(() => prepareOrdersTableData(orders), [orders]);
	const getOrdersList = useActionAsync(getOrdersAction);

	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!orders.length) {
			getOrders();
		}
	}, []);

	const getOrders = async () => {
		try {
			setLoading(true);
			await getOrdersList();
		} catch (error) {
			setError("Сталася помилка при завантаженні списку замовлень");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="wrapper">
			<div className="homepage">
				<header className="homepage__header">
					<div className="homepage__create-new">
						<NavigationLink
							title="Зареєструвати відправлення"
							to="/new-order/general-information"
							iconPosition="right"
						/>
					</div>
				</header>
				<div className="homepage__body">
					<div className="section-orders">
						<h2 className="section-orders__title">Мої відправлення</h2>
						<div className="section-orders__body">
							{isLoading && <p>Завантажуємо список замовлень...</p>}
							{!!error && <p>{error}</p>}
							{!isLoading && !error && orders && orders.length ? (
								<OrdersTable columns={columns} data={data} />
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrdersListPage;
