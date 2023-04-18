import { OrderResponseData } from "../types";
import { COUNTRIES } from "./database";

export const replaceCountryIconPath = (values: OrderResponseData[]): OrderResponseData[] => {
	const ICONS = COUNTRIES.reduce((total: { [key: string]: string }, country) => {
		total[country.label] = country.icon;

		return total;
	}, {});

	const result = values.map((item) => ({
		...item,
		data: {
			...item.data,
			generalInformation: {
				...item.data.generalInformation,
				country: {
					...item.data.generalInformation.country,
					icon: ICONS[item.data.generalInformation.country.label],
				},
			},
		},
	}));

	return result;
};
