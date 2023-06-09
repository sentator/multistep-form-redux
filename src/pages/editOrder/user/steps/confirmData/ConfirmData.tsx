import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { StepperBarItem } from "../../../../../types";
import { orderFormContext } from "../../../../../context";
import { useActionAsync } from "../../../../../store/action.hook";
import { updateOrder as updateOrderAction } from "../../../../../store/orders/actions";
import { OrdersState } from "../../../../../store/rootReducer";
import StepperBar from "../../../../../components/stepperBar/StepperBar";
import NavigationLink from "../../../../../components/navigationLink/NavigationLink";
import Button from "../../../../../components/button/Button";

import "./confirmData.scss";

const ConfirmData = () => {
	const { isDocumentsRequired, clearContextData, formState } = React.useContext(orderFormContext);
	const { orderId } = useParams<"orderId">();
	const filesToDelete = useSelector(
		(state: OrdersState) => state.orders.orders.find((order) => order._id === orderId)?.documents?.invoice
	);
	const navigate = useNavigate();
	const updateOrder = useActionAsync(updateOrderAction);
	const [isSending, setSending] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	if (!orderId) {
		return <p>Не знайдено замовлення з таким id</p>;
	}

	const sendOrderData = async () => {
		const { status, ...restOrderState } = formState;

		try {
			setSending(true);

			await updateOrder({ order: restOrderState, orderId, isDocumentsRequired, filesToDelete });
			clearContextData();
			navigate("/");
		} catch (e) {
			const error = e instanceof Error ? e.message : "Сталася помилка при створенні замовлення";
			setError(error);
		} finally {
			setSending(false);
		}
	};

	const cancelEditing = () => {
		clearContextData();
		navigate("/");
	};

	const steps: StepperBarItem[] = isDocumentsRequired
		? [
				{
					title: "Інформація про відправлення",
					status: "completed",
					url: `/user/orders/${orderId}/general-information`,
				},
				{ title: "Документи", status: "completed", url: `/user/orders/${orderId}/documents` },
				{ title: "Адреса отримання", status: "completed", url: `/user/orders/${orderId}/address` },
		  ]
		: [
				{
					title: "Інформація про відправлення",
					status: "completed",
					url: `/user/orders/${orderId}/general-information`,
				},
				{ title: "Адреса отримання", status: "completed", url: `/user/orders/${orderId}/address` },
		  ];

	return (
		<div className="page-confirmation">
			<div className="page-confirmation__stepper">
				<StepperBar steps={steps} />
			</div>
			<div className="page-confirmation__body">
				{isSending && (
					<>
						<p className="page-confirmation__text">ЗАЧЕКАЙТЕ, БУДЬ ЛАСКА!</p>
						<p className="page-confirmation__text">Відбувається надсилання форми...</p>
					</>
				)}
				{!!error && (
					<>
						<>
							<p className="page-confirmation__text">СТАЛАСЯ ПОМИЛКА!</p>
							<p className="page-confirmation__text">{error}</p>
						</>
					</>
				)}
				{!isSending && !error && (
					<>
						<p className="page-confirmation__text">ВІТАЄМО!</p>
						<p className="page-confirmation__text">
							Ви заповнили всі поля форми і тепер вона готова до відправки.
						</p>
					</>
				)}
			</div>
			<div className="page-confirmation__footer">
				<Button title="Скасувати" type="button" onClick={cancelEditing} />
				<div className="page-confirmation__navigation">
					<NavigationLink to={`/user/orders/${orderId}/address`} title="Назад" />
					<Button title="Відправити" onClick={sendOrderData} disabled={isSending || !!error} />
				</div>
			</div>
		</div>
	);
};

export default ConfirmData;
