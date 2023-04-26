import React from "react";
import { useNavigate, useParams } from "react-router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

import { StepAddressValues, StepperBarItem, OrderProgressStatusLabel } from "../../../../../../types";
import { orderFormContext } from "../../../../../../context";
import StepperBar from "../../../../../../components/stepperBar/StepperBar";
import Input from "../../../../../../components/input/Input";
import InputPhone from "../../../../../../components/inputPhone/InputPhone";
import NavigationLink from "../../../../../../components/navigationLink/NavigationLink";
import NavigationButton from "../../../../../../components/navigationButton/NavigationButton";
import Button from "../../../../../../components/button/Button";

import "./address.scss";

const Address: React.FC = () => {
	const {
		formState: { address, status },
		updateAddress,
		isDocumentsRequired,
		clearContextData,
	} = React.useContext(orderFormContext);

	const { orderId } = useParams<"orderId">();
	const navigate = useNavigate();

	if (!orderId) {
		return <p>Не знайдено замовлення з таким id</p>;
	}

	const prevStep = isDocumentsRequired
		? `/user/orders/${orderId}/documents`
		: `/user/orders/${orderId}/general-information`;
	const nextStep = `/user/orders/${orderId}/confirm-data`;

	const shouldDisableAdressInput =
		status.label === OrderProgressStatusLabel.TRANSIT || status.label === OrderProgressStatusLabel.DEPARTMENT;

	const submitStep = (data: StepAddressValues) => {
		updateAddress(data);
		navigate(nextStep);
	};

	const cancelEditing = () => {
		clearContextData();
		navigate("/");
	};

	const validationSchema = Yup.object().shape({
		deliveryAddress: Yup.string()
			.required("Значення не повинно бути пустим.")
			.matches(/^[А-ЩЬЮЯҐЄІЇ .,0-9][а-щьюяґєії' .,0-9]*$/gi, {
				message: "Доступні лише літери з українського алфавіту",
			}),
		phoneNumber: Yup.string()
			.required("Значення не повинно бути пустим.")
			.max(16, "Цей номер телефону не дійсний")
			.test("isValid", "Цей номер телефону не дійсний", (value) => isValidPhoneNumber(value, "UA")),
	});

	const steps: StepperBarItem[] = isDocumentsRequired
		? [
				{
					title: "Інформація про відправлення",
					status: "completed",
					url: `/user/orders/${orderId}/general-information`,
				},
				{ title: "Документи", status: "completed", url: `/user/orders/${orderId}/documents` },
				{ title: "Адреса отримання", status: "editing" },
		  ]
		: [
				{
					title: "Інформація про відправлення",
					status: "completed",
					url: `/user/orders/${orderId}/general-information`,
				},
				{ title: "Адреса отримання", status: "editing" },
		  ];

	return (
		<div className="address-form">
			<div className="address-form__stepper">
				<StepperBar steps={steps} />
			</div>
			<div className="address-form__form">
				<Formik initialValues={address} validationSchema={validationSchema} onSubmit={submitStep}>
					<Form className="address-form">
						<div className="address-form__row">
							<div className="address-form__column">
								<Input
									name="deliveryAddress"
									id="input_delivery-address"
									label="Адреса доставки"
									readOnly={shouldDisableAdressInput}
								/>
							</div>
							<div className="address-form__column">
								<InputPhone
									name="phoneNumber"
									id="input_phone-number"
									label="Контактний номер телефону"
									placeholder="+380"
								/>
							</div>
						</div>
						<div className="address-form__row address-form__row--controls">
							<Button title="Скасувати" type="button" onClick={cancelEditing} />
							<div className="address-form__navigation">
								<NavigationLink title="Назад" to={prevStep} />
								<NavigationButton title="Продовжити" iconPosition="right" type="submit" />
							</div>
						</div>
					</Form>
				</Formik>
			</div>
		</div>
	);
};

export default Address;
