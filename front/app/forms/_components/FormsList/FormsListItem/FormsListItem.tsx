'use client';

import FormType from '@/types/FormType';
import { useAppDispatch } from '@/redux/hooks';
import { editForm, removeForm } from '@/redux/slices/formsListSlice';
import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import Form from '@core/components/Form/Form';
import formDataToJSON from '@/utils/formDataToJSON';

type Props = FormType;

const FormsListItem = (form: Props) => {
    const dispatch = useAppDispatch();
    const [shouldShowEditForm, setShouldShowEditForm] = useState(false);

    const handleDelete = () => {
        const shouldDelete = confirm('Are you sure?');

        if (!shouldDelete) return;

        dispatch(removeForm(form._id));
    };

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
        <div>
            <span>{form.name}</span>
            <button onClick={ handleDelete }>Delete</button>
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
        </div>
    );
};

export default FormsListItem;
