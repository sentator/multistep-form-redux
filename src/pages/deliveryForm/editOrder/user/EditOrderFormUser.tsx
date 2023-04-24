import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { editOrderFormContext } from "../../../../context";
import { transformInvoiceItemToFile } from "../../../../utils";
import { selectOrderById } from "../../../../store/orders/selectors";
import { OrdersState } from "../../../../store/rootReducer";

import "./editOrderFormUser.scss";
import { EditOrderResponseData, OrderResponseData, UploadedFile } from "../../../../types";

const CreateOrderForm: React.FC = () => {
	const { orderId } = useParams<"orderId">();
	const order = useSelector((state: OrdersState) => selectOrderById(state, orderId));
	const { setInitialState } = React.useContext(editOrderFormContext);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (order) {
			modifyOrder(order);
		}
	}, [order]);

	const modifyOrder = async (order: OrderResponseData) => {
		setLoading(true);

		const invoiceItems = order.documents?.invoice;

		try {
			const invoiceFiles = invoiceItems?.length ? await getInvoiceFiles(invoiceItems) : null;
			const modifiedOrder: EditOrderResponseData = order.documents
				? { ...order, documents: { ...order.documents, invoice: invoiceFiles } }
				: { ...order, documents: undefined };

			setInitialState(modifiedOrder);
		} catch (e) {
			const error = e instanceof Error ? e.message : "Сталася помилка при завантаженні замовлення";
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const getInvoiceFiles = async (items: UploadedFile[]) => {
		const invoiceFiles = items.map(transformInvoiceItemToFile);
		return Promise.all(invoiceFiles);
	};

	return (
		<div className="edit-form-wrapper">
			<div className="container">
				<h1 className="edit-form-wrapper__title title">Редагування замовлення</h1>
				<div className="edit-form-wrapper__body">
					{isLoading && <div className="edit-form-wrapper__loader-layer">Завантаження...</div>}
					{!!error ? <p>{error}</p> : <Outlet />}
				</div>
			</div>
		</div>
	);
};

export default CreateOrderForm;
