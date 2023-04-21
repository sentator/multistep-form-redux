export const createOrderFormPaths = {
	["/new-order"]: "/new-order",
	["/new-order/general-information"]: "/new-order/general-information",
	["/new-order/documents"]: "/new-order/documents",
	["/new-order/address"]: "/new-order/address",
	["/new-order/confirm-data"]: "/new-order/confirm-data",
} as const;

export const editOrderFormUserPaths = {
	["/user/orders"]: "/user/orders",
	["/user/orders/:orderId"]: "/user/orders/:orderId",
	["/user/orders/:orderId/general-information"]: "/user/orders/:orderId/general-information",
	["/user/orders/:orderId/documents"]: "/user/orders/:orderId/documents",
	["/user/orders/:orderId/address"]: "/user/orders/:orderId/address",
	["/user/orders/:orderId/confirm-data"]: "/user/orders/:orderId/confirm-data",
} as const;
