import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
	StepAddressValues,
	StepGeneralInformationValues,
	EditOrderFormState,
	EditOrderStepDocumentsValues,
	OrderResponseData,
	OrderProgressStatusLabel,
} from "../types";

const FORM_DEFAULT_STATE: EditOrderFormState = {
	generalInformation: {
		country: null,
		shop: null,
		parcelName: "",
		orderComposition: [{ id: uuidv4(), productName: "", quantity: 1, totalPrice: 0 }],
		customsFees: [{ value: true }],
		promocode: "",
		trackNumber: "",
	},
	documents: {
		invoice: null,
		lastName: "",
		firstName: "",
		patronymicName: "",
		passport: "",
		birthDate: null,
		passportIssueDate: null,
		passportIssuedBy: "",
		registrationAddress: "",
		identificationNumber: "",
	},
	address: {
		deliveryAddress: "",
		phoneNumber: "",
	},
	status: {
		name: "Заявка оброблена",
		label: OrderProgressStatusLabel.PROCESSED,
		createdAt: "",
	},
};

interface EditOrderFormContext {
	formState: EditOrderFormState;
	updateGeneralInformation: (value: StepGeneralInformationValues) => void;
	updateDocuments: (value: EditOrderStepDocumentsValues) => void;
	updateAddress: (value: StepAddressValues) => void;
	clearContextData: () => void;
	isDocumentsRequired: boolean;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
	setInitialState: (data: OrderResponseData) => void;
}

export const editOrderFormContext = React.createContext<EditOrderFormContext>({
	formState: FORM_DEFAULT_STATE,
	updateGeneralInformation: (value) => {},
	updateDocuments: (value) => {},
	updateAddress: (value) => {},
	clearContextData: () => {},
	isDocumentsRequired: false,
	addStepDocuments: () => {},
	removeStepDocuments: () => {},
	setInitialState: () => {},
});

interface ContextProps {
	children: React.ReactNode;
}

const Context: React.FC<ContextProps> = ({ children }) => {
	const [formState, setFormState] = React.useState<EditOrderFormState>(FORM_DEFAULT_STATE);
	const [isDocumentsRequired, setDocumentsRequired] = React.useState<boolean>(false);

	const updateGeneralInformation = (value: StepGeneralInformationValues) => {
		setFormState({ ...formState, generalInformation: value });
	};

	const updateDocuments = (value: EditOrderStepDocumentsValues) => {
		setFormState({ ...formState, documents: value });
	};

	const updateAddress = (value: StepAddressValues) => {
		setFormState({ ...formState, address: value });
	};

	const clearContextData = () => {
		setFormState(FORM_DEFAULT_STATE);
	};

	const addStepDocuments = () => {
		setDocumentsRequired(true);
	};

	const removeStepDocuments = () => {
		setDocumentsRequired(false);
	};

	const setInitialState = (data: OrderResponseData) => {
		const documents: EditOrderFormState["documents"] =
			data.documents && data.documents.firstName
				? {
						...data.documents,
						birthDate: new Date(data.documents.birthDate),
						passportIssueDate: new Date(data.documents.passportIssueDate),
				  }
				: FORM_DEFAULT_STATE.documents;
		setFormState({
			generalInformation: data.generalInformation,
			documents,
			address: data.address,
			status: data.status,
		});
	};

	return (
		<editOrderFormContext.Provider
			value={{
				formState,
				updateGeneralInformation,
				updateDocuments,
				updateAddress,
				clearContextData,
				isDocumentsRequired,
				addStepDocuments,
				removeStepDocuments,
				setInitialState,
			}}
		>
			{children}
		</editOrderFormContext.Provider>
	);
};

export default Context;