'use client';

import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
    return (
        isOpen &&
        createPortal(
            <div
                className={ styles.modal }
                onClick={ (e) => {
                    if (e.currentTarget === e.target) onClose();
                } }
            >
                <div className={ styles.content }>
                    <div className={ styles.header }>
                        <div className={ styles.title }>{title}</div>
                        <div
                            className={ styles['close-btn'] }
                            tabIndex={ 0 }
                            onClick={ onClose }
                            onKeyDown={ (e) => {
                                if (e.key === 'Enter' || e.key === ' ') onClose();
                            } }
                            role="button"
                        ></div>
                    </div>
                    <hr />
                    <div className={ styles.body }>{children}</div>
                </div>
            </div>,
            document.body,
        )
    );
};
export default Modal;
