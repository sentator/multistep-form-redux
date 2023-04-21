import { StepGeneralInformationValues, StepDocumentsValues, StepAddressValues } from "./deliveryForm";
import { OrderProgressStatusItem, UploadedFile } from ".";

export interface EditOrderStepDocumentsValues extends Omit<StepDocumentsValues, "invoice"> {
	invoice: UploadedFile[] | null;
}

export interface EditOrderFormState {
	generalInformation: StepGeneralInformationValues;
	documents: EditOrderStepDocumentsValues;
	address: StepAddressValues;
	status: OrderProgressStatusItem;
}
