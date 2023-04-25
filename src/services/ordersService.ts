import { isAxiosError } from "axios";

import { EditOrderSendData, OrderProgressStatusItem, OrderResponseData, OrderSendData, UploadedFile } from "../types";
import { apiClient } from "../apiClient";
import { replaceCountryIconPath } from "../utils";

export const fetchOrders = async () => {
	const { data } = await apiClient.get<OrderResponseData[]>("/api/orders");
	const orders = replaceCountryIconPath(data);
	return orders;
};

const _sendFiles = async (files: File[] | null | undefined) => {
	if (files) {
		const formData = new FormData();

		files.forEach((file) => {
			formData.append("files", file);
		});

		try {
			const response = await apiClient.post<UploadedFile[]>("/api/files", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			return response.data;
		} catch (error) {
			if (isAxiosError<UploadedFile[]>(error)) {
				throw new Error("Сталася помилка при відправленні файлів");
			}
		}
	}

	return null;
};

const _deleteFiles = async (files: UploadedFile[] | null | undefined) => {
	if (files) {
		const body = JSON.stringify(files);
		try {
			const response = await apiClient.post<{ deletedFiles: UploadedFile[] }>("/api/files/delete", body, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			return response.data.deletedFiles;
		} catch (error) {
			if (isAxiosError<{ deletedFiles: UploadedFile[] }>(error)) {
				throw new Error("Сталася помилка при видаленні файлів");
			}
		}
	}

	return null;
};

export const createNewOrder = async (orderData: OrderSendData) => {
	const isDocumentsRequired = !!orderData.documents;
	const uploadedFiles = await _sendFiles(orderData.documents?.invoice);

	if (isDocumentsRequired && !uploadedFiles) {
		throw new Error("Не прикріплено жодного файлу");
	}

	const data = isDocumentsRequired
		? { ...orderData, documents: { ...orderData.documents, invoice: uploadedFiles } }
		: orderData;

	try {
		const response = await apiClient.post<OrderResponseData>("/api/orders", JSON.stringify({ ...data }), {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		if (isAxiosError<OrderResponseData>(error)) {
			throw new Error("Не вдалося відправити форму");
		}
	}

	return null;
};

export const updateOrderData = async (orderId: string, orderData: EditOrderSendData) => {
	const isDocumentsRequired = !!orderData.documents;

	try {
		await _deleteFiles(orderData.documents?.invoiceSavedFiles);
		const uploadedFiles = await _sendFiles(orderData.documents?.invoiceCurrentFiles);

		if (isDocumentsRequired && !uploadedFiles) {
			throw new Error("Не прикріплено жодного файлу");
		}

		const data = isDocumentsRequired
			? { ...orderData, documents: { ...orderData.documents, invoice: uploadedFiles } }
			: orderData;

		const response = await apiClient.put<OrderResponseData>(`/api/orders/${orderId}`, JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		if (isAxiosError<OrderResponseData>(error)) {
			throw new Error("Не вдалося відправити форму");
		}
	}

	return null;
};

export const updateOrderStatus = async (orderId: string, orderStatus: OrderProgressStatusItem) => {
	try {
		const response = await apiClient.put<OrderResponseData>(
			`/api/orders/${orderId}`,
			JSON.stringify({ status: orderStatus }),
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response.data;
	} catch (error) {
		if (isAxiosError<OrderResponseData>(error)) {
			throw new Error("Не вдалося відправити форму");
		}
	}

	return null;
};
