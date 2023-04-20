import React from "react";
import { useNavigate } from "react-router-dom";

import { StepperBarItem } from "../../../../types";
import { deliveryFormContext } from "../../../../context";
import { useActionAsync } from "../../../../store/action.hook";
import StepperBar from "../../../../components/stepperBar/StepperBar";
import NavigationLink from "../../../../components/navigationLink/NavigationLink";
import Button from "../../../../components/button/Button";
import { createOrder as createOrderAction } from "../../../../store/orders/actions";

import "./confirmData.scss";

const ConfirmData = () => {
	const { isDocumentsRequired, clearContextData, formState } = React.useContext(deliveryFormContext);
	const navigate = useNavigate();
	const createOrder = useActionAsync(createOrderAction);
	const [isSending, setSending] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const sendOrderData = async () => {
		const order = isDocumentsRequired
			? formState
			: { generalInformation: formState.generalInformation, address: formState.address };

		try {
			setSending(true);

			await createOrder({ order });
			clearContextData();
			navigate("/");
		} catch (e) {
			const error = e instanceof Error ? e.message : "Сталася помилка при створенні замовлення";
			setError(error);
		} finally {
			setSending(false);
		}
	};

	const steps: StepperBarItem[] = isDocumentsRequired
		? [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/general-information" },
				{ title: "Документи", status: "completed", url: "/new-order/documents" },
				{ title: "Адреса отримання", status: "completed", url: "/new-order/address" },
		  ]
		: [
				{ title: "Інформація про відправлення", status: "completed", url: "/new-order/general-information" },
				{ title: "Адреса отримання", status: "completed", url: "/new-order/address" },
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
				<Button title="Скасувати" type="button" onClick={() => navigate("/")} />
				<div className="page-confirmation__navigation">
					<NavigationLink to="/new-order/address" title="Редагувати форму" />
					<Button title="Відправити" onClick={sendOrderData} disabled={isSending || !!error} />
				</div>
			</div>
		</div>
	);
};

export default ConfirmData;
