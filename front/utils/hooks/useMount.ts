import { useRef } from 'react';

const useMount = (cb: Function) => {
	const isDone = useRef(false);

	if (isDone.current) return;

	isDone.current = true;

	cb();
}

export default useMount;
