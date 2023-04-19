import { useMemo } from "react";
import { useDispatch } from "react-redux";

type AnyFunction = (...args: any[]) => any;

export function useAction<T extends AnyFunction>(creator: T) {
	const dispatch = useDispatch();

	return useMemo(() => {
		return (...args: Parameters<T>) => {
			dispatch(creator(...args));
		};
	}, [creator, dispatch]);
}

export function useActionAsync<T extends AnyFunction>(creator: T) {
	const dispatch = useDispatch();

	return useMemo(() => {
		return (...args: Parameters<T>): Promise<any> => {
			return new Promise((resolve, reject) => {
				if (args.length === 0) {
					args.push(undefined);
				}

				dispatch(creator(...args.concat({ resolve, reject })));
			});
		};
	}, [creator, dispatch]);
}
