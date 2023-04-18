import React from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import StepperBar from "../../../../components/stepperBar/StepperBar";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";
import { createOrderRequest, resetOrderSendingStatus } from "../../../../store/orders/actions";
import { ordersSendingStatusSelector, ordersSendingErrorSelector } from "../../../../store/orders/selectors";

import "./confirmData.scss";

const ConfirmData = () => {
	const { isDocumentsRequired, clearContextData, formState } = React.useContext(deliveryFormContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const status = useSelector(ordersSendingStatusSelector);
	const error = useSelector(ordersSendingErrorSelector);

	React.useEffect(() => {
		if (status === "success") {
			onSuccessSending();
		}
	}, [status]);

	const onSuccessSending = () => {
		dispatch(resetOrderSendingStatus());
		navigate("/");
		clearContextData();
	};

	const sendOrderData = () => {
		const order = isDocumentsRequired
			? formState
			: { generalInformation: formState.generalInformation, address: formState.address };
		dispatch(createOrderRequest({ order }));
	};

	const steps: StepperBarItem[] = isDocumentsRequired
		? [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
				{ title: "Документи", status: "completed", url: "/new-order/documents" },
				{ title: "Адреса отримання", status: "completed", url: "/new-order/address" },
		  ]
		: [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/generalInformation" },
				{ title: "Адреса отримання", status: "completed", url: "/new-order/address" },
		  ];

	return (
		<div className="page-confirmation">
			<div className="page-confirmation__stepper">
				<StepperBar steps={steps} />
			</div>
			<div className="page-confirmation__body">
				{status === "sending" && (
					<>
						<p className="page-confirmation__text">ЗАЧЕКАЙТЕ, БУДЬ ЛАСКА!</p>
						<p className="page-confirmation__text">Відбувається надсилання форми...</p>
					</>
				)}
				{status === "error" && (
					<>
						<>
							<p className="page-confirmation__text">СТАЛАСЯ ПОМИЛКА!</p>
							{error && <p className="page-confirmation__text">{error}</p>}
						</>
					</>
				)}
				{status === "idle" && (
					<>
						<p className="page-confirmation__text">ВІТАЄМО!</p>
						<p className="page-confirmation__text">
							Ви заповнили всі поля форми і тепер вона готова до відправки.
						</p>
					</>
				)}
			</div>
			<div className="page-confirmation__footer">
				<Button title="Скасувати" type="button" onClick={() => navigate("/")} />
				<div className="page-confirmation__navigation">
					<NavigationLink to="/new-order/address" title="Редагувати форму" />
					<Button
						title="Відправити"
						onClick={() => sendOrderData()}
						disabled={status === "sending" || status === "error"}
					/>
				</div>
			</div>
		</div>
	);
};

export default ConfirmData;
