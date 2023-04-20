export const formatDateForOrderStatus = (date: Date) => {
	const formatter = new Intl.DateTimeFormat("uk", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
	return formatter.format(new Date(date));
};
