import { StepGeneralInformationValues, StepDocumentsValues, StepAddressValues } from "./createOrderForm";
import { OptionItem, OrderProgressStatusItem, ProductItem, UploadedFile } from ".";

export interface EditOrderFormState {
	generalInformation: StepGeneralInformationValues;
	documents: StepDocumentsValues;
	address: StepAddressValues;
	status: OrderProgressStatusItem;
}

export interface EditOrderResponseData {
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

export interface EditOrderSendData extends Omit<EditOrderFormState, "documents" | "status"> {
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
