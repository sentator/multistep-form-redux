import { StepGeneralInformationValues, StepDocumentsValues, StepAddressValues } from "./createOrderForm";
import { OptionItem, OrderProgressStatusItem, ProductItem, UploadedFile } from ".";

export interface EditOrderStepDocumentsValues extends Omit<StepDocumentsValues, "invoice"> {
	invoice: File[] | null;
}

export interface EditOrderFormState {
	generalInformation: StepGeneralInformationValues;
	documents: EditOrderStepDocumentsValues;
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
