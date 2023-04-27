import React from "react";
import { v4 as uuidv4 } from "uuid";

import {
	StepAddressValues,
	StepDocumentsValues,
	StepGeneralInformationValues,
	OrderProgressStatusLabel,
} from "../types";
import { OrderResponseDataWithFiles, OrderFormState } from "../types/orderForm";

const FORM_DEFAULT_STATE: OrderFormState = {
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

interface OrderFormContext {
	formState: OrderFormState;
	updateGeneralInformation: (value: StepGeneralInformationValues) => void;
	updateDocuments: (value: StepDocumentsValues) => void;
	updateAddress: (value: StepAddressValues) => void;
	clearContextData: () => void;
	isDocumentsRequired: boolean;
	addStepDocuments: () => void;
	removeStepDocuments: () => void;
	setInitialState: (data: OrderResponseDataWithFiles) => void;
}

export const orderFormContext = React.createContext<OrderFormContext>({
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
	const [formState, setFormState] = React.useState<OrderFormState>(FORM_DEFAULT_STATE);
	const [isDocumentsRequired, setDocumentsRequired] = React.useState<boolean>(false);

	const updateGeneralInformation = (value: StepGeneralInformationValues) => {
		setFormState({ ...formState, generalInformation: value });
	};

	const updateDocuments = (value: StepDocumentsValues) => {
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

	const setInitialState = (data: OrderResponseDataWithFiles) => {
		const documents: OrderFormState["documents"] =
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
		<orderFormContext.Provider
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
		</orderFormContext.Provider>
	);
};

export default Context;
