export interface Action<T, P = void, M = Record<string, any>> {
	type: T;
	payload: P;
	meta?: M;
}

export function createAction<A extends Action<T, P>, T = A["type"], P = A["payload"]>(type: T) {
	return (payload: P, meta = {}) => ({
		type,
		payload,
		meta,
	});
}
