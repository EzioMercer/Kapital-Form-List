'use client';

import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import FormType from '@/types/FormType';
import Form from '@core/components/Form/Form';
import formDataToJSON from '@/utils/formDataToJSON';
import { useAppDispatch } from '@/redux/hooks';
import FormTextInput from '@core/components/Form/FormTextInput/FormTextInput';
import { addField } from '@/redux/slices/formsListSlice';
import TextInputType from '@/types/TextInputType';

type Props = {
    form: FormType;
};

const AddFieldForm = ({ form }: Props) => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleEditSubmit = (json: ReturnType<typeof formDataToJSON>) => {
        dispatch(
            addField({
                id: form._id,
                fieldData: {
                    ...(json as TextInputType),
                    type: 'text',
                },
            }),
        ).then(() => setIsOpen(false));
    };

    return (
        <>
            <button onClick={ () => setIsOpen(true) } type={ 'button' }>
                Add field
            </button>

            <Modal title={ 'Add Field' } isOpen={ isOpen } onClose={ () => setIsOpen(false) }>
                <Form onSubmit={ handleEditSubmit }>
                    <FormTextInput name={ 'name' } placeholder={ 'Enter input name' } autoFocus={ true } required={ true } />
                    <button>Add text input</button>
                </Form>
            </Modal>
        </>
    );
};

export default AddFieldForm;
