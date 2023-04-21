import { OrderResponseData } from "../types";
import { COUNTRIES } from "./database";

export const replaceCountryIconPath = (values: OrderResponseData[]): OrderResponseData[] => {
	const ICONS = COUNTRIES.reduce((total: { [key: string]: string }, country) => {
		total[country.label] = country.icon;

		return total;
	}, {});

	const result = values.map((item) => ({
		...item,
		generalInformation: {
			...item.generalInformation,
			country: {
				...item.generalInformation.country,
				icon: ICONS[item.generalInformation.country.label],
			},
		},
	}));

	return result;
};
