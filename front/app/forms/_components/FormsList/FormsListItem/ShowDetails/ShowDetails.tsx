'use client';

import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import Form from '@core/components/Form/Form';
import FormType from '@/types/FormType';

type Props = FormType;

const ShowDetails = (form: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const show = () => setIsOpen(true);

    const hide = () => setIsOpen(false);

    return (
        <>
            <button onClick={ show }>Show Details</button>
            <Modal title={ 'Edit Form' } isOpen={ isOpen } onClose={ hide }>
                <Form onSubmit={ () => {} }>
                    <input type="text" disabled={ true } defaultValue={ form.name } />

                    <label>
                        <input type="checkbox" disabled={ true } defaultChecked={ form.isVisible } />
                        <span>Visible</span>
                    </label>

                    <label>
                        <input type="checkbox" disabled={ true } defaultChecked={ form.isReadOnly } />
                        <span>Readonly</span>
                    </label>

                    <button onClick={ hide } type={ 'button' }>
                        Cancel
                    </button>
                </Form>
            </Modal>
        </>
    );
};

export default ShowDetails;
