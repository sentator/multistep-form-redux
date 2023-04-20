import {
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	DeliveryFormState,
	StepperBarItem,
} from "./deliveryForm";

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

interface OrderProgressStatusItem {
	label: OrderProgressStatusLabel;
	status: string;
	createdAt: string;
}

export enum OrderProgressStatusLabel {
	PROCESSED = "PROCESSED",
	WAREHOUSE = "WAREHOUSE",
	TRANSIT = "TRANSIT",
	DEPARTMENT = "DEPARTMENT",
}

interface OrderResponseData {
	_id: string;
	data: {
		generalInformation: {
			country: OptionItem;
			shop: OptionItem;
			parcelName: string;
			orderComposition: ProductItem[];
			customsFees: [{ value: boolean }];
			promocode: string;
			trackNumber: string;
		};
		documents?: {
			invoice: UploadedFile[];
			lastName: string;
			firstName: string;
			patronymicName: string;
			passport: string;
			birthDate: Date;
			passportIssueDate: Date;
			passportIssuedBy: string;
			registrationAddress: string;
			identificationNumber: string;
		};
		address: {
			deliveryAddress: string;
			phoneNumber: string;
		};
		progress: OrderProgressStatusItem[];
	};
	createdAt: string;
	updatedAt: string;
	progress: OrderProgressStatusItem[];
}

interface OrderSendData extends Omit<DeliveryFormState, "documents">, Partial<Pick<DeliveryFormState, "documents">> {
	progress: OrderProgressStatusItem[];
}

interface UploadedFile {
	originalName: string;
	fileName: string;
	fileUrl: string;
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
	progress: OrderProgressStatusItem[];
	subRows: Omit<OrdersTableData, "_id" | "progress">[] | null;
}

export type {
	OptionItem,
	ProductItem,
	CurrencyRate,
	StepGeneralInformationValues,
	StepDocumentsValues,
	StepAddressValues,
	DeliveryFormState,
	StepperBarItem,
	OrderResponseData,
	OrderSendData,
	UploadedFile,
	OrdersTableData,
};
