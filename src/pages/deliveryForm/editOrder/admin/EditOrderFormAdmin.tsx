import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { ORDER_STATUS_OPTIONS } from "../../../../utils";
import { OrdersState } from "../../../../store/rootReducer";
import { useActionAsync } from "../../../../store/action.hook";
import { updateOrderStatus as updateOrderStatusAction } from "../../../../store/orders/actions";
import { selectOrderById } from "../../../../store/orders/selectors";
import { Autocomplete } from "../../../../components/autocomplete/Autocomplete";
import Button from "../../../../components/button/Button";

import "./editOrderFormAdmin.scss";

const EditOrderFormAdmin: React.FC = () => {
	const navigate = useNavigate();
	const { orderId } = useParams<"orderId">();
	const order = useSelector((state: OrdersState) => selectOrderById(state, orderId));
	const updateOrderStatus = useActionAsync(updateOrderStatusAction);

	const [isSending, setSending] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	if (!orderId || !order) {
		return <p>Замовлення з таким id не існує</p>;
	}

	const submitForm = async (values: typeof initialValues) => {
		try {
			setSending(true);

			await updateOrderStatus({ orderId, status: values.status });
			navigate("/");
		} catch (e) {
			const error = e instanceof Error ? e.message : "Сталася помилка при зміні статусу замовлення";
			setError(error);
		} finally {
			setSending(false);
		}
	};

	const initialValues = {
		status: order.status,
	};

	const validationSchema = Yup.object().shape({
		status: Yup.mixed().required("Значення не повинно бути пустим."),
	});

	return (
		<div className="edit-order-form-wrapper">
			<div className="container">
				<h1 className="edit-order-form-wrapper__title title">Сторінка адміністратора</h1>
				<div className="edit-order-form-wrapper__body">
					<div className="edit-order-form-wrapper__form">
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
							<Form className="edit-order-form-admin">
								<div className="edit-order-form-admin__row">
									<div className="edit-order-form-admin__column">
										<Autocomplete
											options={ORDER_STATUS_OPTIONS}
											id="order_status"
											name="status"
											label="Статус замовлення"
										/>
									</div>
									<div className="edit-order-form-admin__column">
										{isSending && (
											<div className="edit-order-form-admin__message">
												<p className="edit-order-form-admin__title">ЗАЧЕКАЙТЕ, БУДЬ ЛАСКА!</p>
												<p className="edit-order-form-admin__description">
													Здійснюється зміна статусу замовлення...
												</p>
											</div>
										)}
										{!!error && (
											<div className="edit-order-form-admin__message">
												<p className="edit-order-form-admin__title">ПОМИЛКА!</p>
												<p className="edit-order-form-admin__description">{error}</p>
											</div>
										)}
									</div>
								</div>
								<div className="edit-order-form-admin__controls">
									<Button title="Скасувати" onClick={() => navigate("/")} type="button" />
									<Button title="Змінити статус" type="submit" disabled={isSending || !!error} />
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditOrderFormAdmin;
