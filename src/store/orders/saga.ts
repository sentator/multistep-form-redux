import { call, put, takeLatest, takeEvery } from "redux-saga/effects";

import { EditOrderSendData, OrderResponseData, OrderSendData, UploadedFile } from "../../types";
import {
	OrderActionTypes,
	GetOrdersAction,
	CreateOrderAction,
	UpdateOrderAction,
	UpdateOrderStatusAction,
	GetOrderFilesAction,
} from "./actionTypes";
import {
	getOrdersSuccess,
	createOrderSuccess,
	updateOrderSuccess,
	updateOrderStatusSuccess,
	getOrderFilesSuccess,
	replaceOrderFilesItem,
	removeOrderFilesItem,
} from "./actions";
import {
	fetchOrders,
	createNewOrder,
	updateOrderData,
	updateOrderStatus,
	getOrderFiles,
	sendFiles,
	deleteFiles,
} from "../../services/ordersService";

function* fetchOrdersWorker({
	type,
	payload,
	meta,
}: GetOrdersAction & { meta: { resolve: (value: OrderResponseData[]) => void; reject: (reason?: unknown) => void } }) {
	try {
		const response: OrderResponseData[] = yield call(fetchOrders);

		meta.resolve(response);
		yield put(getOrdersSuccess({ orders: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* createOrderWorker({
	type,
	payload,
	meta,
}: CreateOrderAction & { meta: { resolve: (value: OrderResponseData) => void; reject: (reason?: unknown) => void } }) {
	try {
		const isDocumentsRequired = !!payload.order.documents.invoice;

		// upload new files to the server
		const uploadedFiles: UploadedFile[] | null = isDocumentsRequired
			? yield call(sendFiles, payload.order.documents?.invoice)
			: null;

		if (isDocumentsRequired && !uploadedFiles) {
			throw new Error("Не прикріплено жодного файлу");
		}

		// prepare order data for sending to the server
		const orderData: OrderSendData =
			isDocumentsRequired && uploadedFiles
				? {
						...payload.order,
						documents: {
							...payload.order.documents,
							invoice: uploadedFiles,
							birthDate: payload.order.documents.birthDate?.toISOString() ?? "",
							passportIssueDate: payload.order.documents.passportIssueDate?.toISOString() ?? "",
						},
				  }
				: { ...payload.order, documents: undefined };

		// upload new order on the server
		const response: OrderResponseData = yield call(createNewOrder, orderData);

		// save fileItems to store if they exist
		yield payload.order.documents.invoice
			? put(getOrderFilesSuccess({ item: { orderId: response._id, files: payload.order.documents.invoice } }))
			: null;

		meta.resolve(response);
		yield put(createOrderSuccess({ order: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* updateOrderWorker({
	type,
	payload,
	meta,
}: UpdateOrderAction & { meta: { resolve: (value: OrderResponseData) => void; reject: (reason?: unknown) => void } }) {
	try {
		// remove saved files from on the server
		yield payload.isDocumentsRequired ? call(deleteFiles, payload.filesToDelete) : null;

		// upload new files to the server
		const uploadedFiles: UploadedFile[] | null = payload.isDocumentsRequired
			? yield call(sendFiles, payload.order.documents.invoice)
			: null;

		if (payload.isDocumentsRequired && !uploadedFiles) {
			throw new Error("Не прикріплено жодного файлу");
		}

		// prepare order data for sending to the server
		const orderData: EditOrderSendData =
			payload.isDocumentsRequired && uploadedFiles
				? {
						...payload.order,
						documents: {
							...payload.order.documents,
							invoice: uploadedFiles,
							birthDate: payload.order.documents.birthDate?.toISOString() ?? "",
							passportIssueDate: payload.order.documents.passportIssueDate?.toISOString() ?? "",
						},
				  }
				: { ...payload.order, documents: {} };

		// upload new order data on the server
		const response: OrderResponseData = yield call(updateOrderData, payload.orderId, orderData);

		// replace orderFilesItem in store if documents are required. Otherwise, remove orderFilesItem from the store
		yield payload.isDocumentsRequired && !!payload.order.documents.invoice
			? put(replaceOrderFilesItem({ item: { orderId: payload.orderId, files: payload.order.documents.invoice } }))
			: put(removeOrderFilesItem({ orderId: payload.orderId }));

		meta.resolve(response);
		yield put(updateOrderSuccess({ order: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* updateOrderStatusWorker({
	type,
	payload,
	meta,
}: UpdateOrderStatusAction & {
	meta: { resolve: (value: OrderResponseData) => void; reject: (reason?: unknown) => void };
}) {
	try {
		const response: OrderResponseData = yield call(updateOrderStatus, payload.orderId, payload.status);

		meta.resolve(response);
		yield put(updateOrderStatusSuccess({ order: response }));
	} catch (error) {
		meta.reject(error);
	}
}

function* getOrderFilesWorker({
	type,
	payload,
	meta,
}: GetOrderFilesAction & {
	meta: { resolve: (value: File[]) => void; reject: (reason?: unknown) => void };
}) {
	try {
		const response: File[] = yield call(getOrderFiles, payload.orderId, payload.files);

		meta.resolve(response);
		yield put(getOrderFilesSuccess({ item: { orderId: payload.orderId, files: response } }));
	} catch (error) {
		meta.reject(error);
	}
}

function* ordersSaga() {
	yield takeLatest(OrderActionTypes.FETCH_ORDERS_REQUEST, fetchOrdersWorker);
	yield takeLatest(OrderActionTypes.CREATE_ORDER_REQUEST, createOrderWorker);
	yield takeLatest(OrderActionTypes.UPDATE_ORDER_REQUEST, updateOrderWorker);
	yield takeLatest(OrderActionTypes.UPDATE_ORDER_STATUS_REQUEST, updateOrderStatusWorker);
	yield takeEvery(OrderActionTypes.GET_ORDER_FILES_REQUEST, getOrderFilesWorker);
}

export default ordersSaga;
