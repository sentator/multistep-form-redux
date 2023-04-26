import { isAxiosError } from "axios";

import { EditOrderSendData, OrderProgressStatusItem, OrderResponseData, OrderSendData, UploadedFile } from "../types";
import { apiClient } from "../apiClient";
import { replaceCountryIconPath } from "../utils";

export const fetchOrders = async () => {
	const { data } = await apiClient.get<OrderResponseData[]>("/api/orders");
	const orders = replaceCountryIconPath(data);
	return orders;
};

export const sendFiles = async (files: File[] | null | undefined) => {
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

export const deleteFiles = async (files: UploadedFile[] | null | undefined) => {
	if (files) {
		try {
			const response = await apiClient.post<{ deletedFiles: UploadedFile[] }>("/api/files/delete", files, {
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
	try {
		const response = await apiClient.post<OrderResponseData>("/api/orders", orderData, {
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
	try {
		const response = await apiClient.put<OrderResponseData>(`/api/orders/${orderId}`, orderData, {
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

export const getOrderFiles = (orderId: string, files: UploadedFile[]) => {
	try {
		const filesPromises = files.map(async (item) => {
			const extensionStartIndex = item.fileName.indexOf(".");
			const fileExtension = item.fileName.slice(extensionStartIndex + 1);
			let options: { type: string } | undefined = undefined;

			switch (fileExtension) {
				case "png":
					options = { type: "image/png" };
					break;
				case "jpg":
					options = { type: "image/jpeg" };
					break;
				case "pdf":
					options = { type: "application/pdf" };
					break;
				default:
					break;
			}

			const file = await fetch(item.fileUrl)
				.then((r) => r.blob())
				.then((blobFile) => new File([blobFile], item.originalName, options))
				.catch((e) => {
					throw new Error(e);
				});

			return file;
		});

		return Promise.all(filesPromises);
	} catch (e) {
		throw new Error(`Не вдалося завантажити файли для замовлення ${orderId}`);
	}
};
