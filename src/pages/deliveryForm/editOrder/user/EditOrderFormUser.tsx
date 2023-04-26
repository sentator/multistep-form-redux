import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { orderFormContext } from "../../../../context";
import { useActionAsync } from "../../../../store/action.hook";
import { getOrderFiles as getOrderFilesAction } from "../../../../store/orders/actions";
import { selectOrderById } from "../../../../store/orders/selectors";
import { OrdersState } from "../../../../store/rootReducer";

import "./editOrderFormUser.scss";
import { OrderResponseDataWithFiles, OrderFilesItem, OrderResponseData, UploadedFile } from "../../../../types";

const CreateOrderForm: React.FC = () => {
	const { orderId } = useParams<"orderId">();
	const order = useSelector((state: OrdersState) => selectOrderById(state, orderId));
	const getOrderFiles = useActionAsync(getOrderFilesAction);
	const invoiceFiles = useSelector((state: OrdersState) =>
		state.orders.files.find((item) => item.orderId === orderId)
	);
	const { setInitialState } = React.useContext(orderFormContext);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (orderId && order?.documents?.invoice && !invoiceFiles) {
			getFiles(orderId, order.documents.invoice);
		}

		if (order) {
			saveOrderToContext(order, invoiceFiles);
		}
	}, [order, invoiceFiles]);

	const getFiles = async (orderId: string, files: UploadedFile[]) => {
		setLoading(true);

		try {
			await getOrderFiles({ orderId, files });
		} catch (e) {
			const error =
				e instanceof Error ? e.message : `Сталася помилка при завантаженні файлів для замовлення ${orderId}`;
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const saveOrderToContext = (order: OrderResponseData, itemFiles?: OrderFilesItem) => {
		const modifiedOrder: OrderResponseDataWithFiles =
			order.documents && itemFiles
				? {
						...order,
						documents: {
							...order.documents,
							invoice: itemFiles.files,
						},
				  }
				: { ...order, documents: undefined };
		setInitialState(modifiedOrder);
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
