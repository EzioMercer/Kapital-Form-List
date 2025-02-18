'use client';

import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import Form from '@core/components/Form/Form';
import { useAppDispatch } from '@/redux/hooks';
import { editForm } from '@/redux/slices/formsListSlice';
import formDataToJSON from '@/utils/formDataToJSON';
import FormType from '@/types/FormType';

type Props = FormType;

const EditForm = (form: Props) => {
    const dispatch = useAppDispatch();
    const [shouldShowEditForm, setShouldShowEditForm] = useState(false);

    const showEditForm = () => setShouldShowEditForm(true);

    const hideEditForm = () => setShouldShowEditForm(false);

    const handleEditSubmit = (json: ReturnType<typeof formDataToJSON>) => {
        dispatch(
            editForm({
                ...form,
                name: json['name'] as string,
            }),
        ).then(() => setShouldShowEditForm(false));
    };

    return (
        <>
            <button onClick={ showEditForm }>Edit Form</button>
            <Modal title={ 'Edit Form' } isOpen={ shouldShowEditForm } onClose={ hideEditForm }>
                <Form onSubmit={ handleEditSubmit }>
                    <input autoFocus={ true } type="text" name="name" defaultValue={ form.name } />

                    <button>Save</button>
                    <button onClick={ hideEditForm } type={ 'button' }>
                        Cancel
                    </button>
                </Form>
            </Modal>
        </>
    );
};

export default EditForm;
