'use client';

import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
	children: ReactNode;
}

const Modal = ({ children }: Props) => {
	return createPortal(
		children,
		document.body
	)
}

export default Modal;
