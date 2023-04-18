import { isAxiosError } from "axios";

import { OrderResponseData, OrderSendData, UploadedFile } from "../types";
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
		const response = await apiClient.post<OrderResponseData>("/api/orders", JSON.stringify({ data }), {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		if (isAxiosError<OrderResponseData>(error)) {
			throw new Error("Не вдалося відправити дані форми");
		}
	}

	return null;
};
