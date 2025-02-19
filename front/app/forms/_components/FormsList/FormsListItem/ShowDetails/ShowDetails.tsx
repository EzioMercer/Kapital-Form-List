'use client';

import { cloneElement, useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import Form from '@core/components/Form/Form';
import FormType from '@/types/FormType';
import chooseFormFieldType from '@/utils/chooseFormFieldType';

type Props = {
    form: FormType;
};

const ShowDetails = ({ form }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const show = () => setIsOpen(true);
    const hide = () => setIsOpen(false);

    return (
        <>
            <button onClick={ show }>Show Details</button>
            <Modal title={ 'Edit Form' } isOpen={ isOpen } onClose={ hide }>
                <Form onSubmit={ () => {} }>
                    <fieldset>
                        <legend>Form settings</legend>
                        <input type="text" disabled={ true } defaultValue={ form.settings.name } />

                        <label>
                            <input type="checkbox" disabled={ true } defaultChecked={ form.settings.isVisible } />
                            <span>Visible</span>
                        </label>

                        <label>
                            <input type="checkbox" disabled={ true } defaultChecked={ form.settings.isReadOnly } />
                            <span>Readonly</span>
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>Form fields</legend>

                        {form.fields.map((formField, i) =>
                            cloneElement(chooseFormFieldType(formField, i)!, {
                                disabled: true,
                            }),
                        )}
                    </fieldset>

                    <button onClick={ hide } type={ 'button' }>
                        Cancel
                    </button>
                </Form>
            </Modal>
        </>
    );
};

export default ShowDetails;
