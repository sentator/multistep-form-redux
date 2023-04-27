import {
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	StepperBarItem,
	OrderFormState,
	OrderResponseData,
	OrderResponseDataWithFiles,
	OrderSendData,
} from "./orderForm";

interface OptionItem {
	id: string;
	name: string;
	label: string;
	icon?: string;
}

interface ProductItem {
	id: string;
	productName: string;
	quantity: number;
	totalPrice: number;
}

interface CurrencyRate {
	usd: { rate: number };
	eur: { rate: number };
	gbp: { rate: number };
}

export interface OrderProgressStatusItem {
	id?: string;
	label: OrderProgressStatusLabel;
	name: string;
	createdAt: string;
}

export enum OrderProgressStatusLabel {
	PROCESSED = "PROCESSED",
	WAREHOUSE = "WAREHOUSE",
	TRANSIT = "TRANSIT",
	DEPARTMENT = "DEPARTMENT",
}

interface UploadedFile {
	originalName: string;
	fileName: string;
	fileUrl: string;
}

interface OrderFilesItem {
	orderId: string;
	files: File[];
}

interface OrdersTableData {
	_id: string;
	country: OptionItem | { name: string; icon: null };
	shop: OptionItem | { name: string };
	parcelName: string;
	productName: string;
	quantity: number;
	totalPrice: string;
	promocode: string;
	trackNumber: string;
	status: OrderProgressStatusItem;
	subRows: Omit<OrdersTableData, "_id" | "progress">[] | null;
}

export type {
	OptionItem,
	ProductItem,
	CurrencyRate,
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	StepperBarItem,
	OrderFormState,
	OrderResponseData,
	OrderResponseDataWithFiles,
	OrderSendData,
	UploadedFile,
	OrderFilesItem,
	OrdersTableData,
};
