'use client';

import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import FormType from '@/types/FormType';
import { updateForm } from '@/API';

type Props = {
    form: FormType;
};

const AddField = ({ form }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={ () => setIsOpen(true) } type={ 'button' }>
                Add field
            </button>

            <Modal title={ 'Add Field' } isOpen={ isOpen } onClose={ () => setIsOpen(false) }>
                <button
                    onClick={ () => {
                        const x = {
                            ...form,
                            fields: [
                                ...form.fields,
                                {
                                    type: `text`,
                                    name: `name`,
                                },
                            ],
                        };

                        // @ts-ignore
                        updateForm(x);
                    } }
                >
                    Add text input
                </button>
            </Modal>
        </>
    );
};

export default AddField;
