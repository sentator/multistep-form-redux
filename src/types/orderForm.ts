import { OptionItem, OrderProgressStatusItem, ProductItem, UploadedFile } from ".";

export interface StepGeneralInformationValues {
	country: OptionItem | null;
	shop: OptionItem | null;
	parcelName: string;
	orderComposition: ProductItem[];
	customsFees: [{ value: boolean }];
	promocode: string;
	trackNumber: string;
}
export interface StepDocumentsValues {
	invoice: File[] | null;
	lastName: string;
	firstName: string;
	patronymicName: string;
	passport: string;
	birthDate: Date | null;
	passportIssueDate: Date | null;
	passportIssuedBy: string;
	registrationAddress: string;
	identificationNumber: string;
}
export interface StepAddressValues {
	deliveryAddress: string;
	phoneNumber: string;
}

export interface StepperBarItem {
	title: string;
	status: "editing" | "completed" | "hidden";
	url?: string;
}

export interface OrderFormState {
	generalInformation: StepGeneralInformationValues;
	documents: StepDocumentsValues;
	address: StepAddressValues;
	status: OrderProgressStatusItem;
}

export interface OrderResponseData {
	_id: string;
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
	createdAt: string;
	updatedAt: string;
	progress: OrderProgressStatusItem[];
	status: OrderProgressStatusItem;
}

export interface OrderResponseDataWithFiles {
	_id: string;
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
		invoice: File[] | null;
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
	createdAt: string;
	updatedAt: string;
	progress: OrderProgressStatusItem[];
	status: OrderProgressStatusItem;
}

export interface OrderSendData extends Omit<OrderFormState, "documents" | "status"> {
	documents:
		| {
				invoice: UploadedFile[];
				lastName: string;
				firstName: string;
				patronymicName: string;
				passport: string;
				birthDate: string;
				passportIssueDate: string;
				passportIssuedBy: string;
				registrationAddress: string;
				identificationNumber: string;
		  }
		| {};
}
