'use client';

import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import Form from '@core/components/Form/Form';
import { useAppDispatch } from '@/redux/hooks';
import { editForm } from '@/redux/slices/formsListSlice';
import formDataToJSON from '@/utils/formDataToJSON';
import FormType from '@/types/FormType';
import AddField from '@/app/forms/_components/FormsList/FormsListItem/EditForm/AddField/AddField';
import FormFieldType from '@/types/FormFieldType';
import FormTextInput from '@core/components/Form/FormTextInput/FormTextInput';

const chooseFormFieldType = (formField: FormFieldType, i: number) => {
    switch (formField.type) {
        case 'text':
            return <FormTextInput key={ i } { ...formField } />;
    }
};

type Props = {
    form: FormType;
};

const EditForm = ({ form }: Props) => {
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
                    <fieldset>
                        <legend>Form settings</legend>
                        <input type="text" name={ 'name' } autoFocus={ true } defaultValue={ form.name } />

                        <label>
                            <input type="checkbox" defaultChecked={ form.isVisible } />
                            <span>Visible</span>
                        </label>

                        <label>
                            <input type="checkbox" defaultChecked={ form.isReadOnly } />
                            <span>Readonly</span>
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>Form fields</legend>

                        {form.fields.map(chooseFormFieldType)}

                        <AddField form={ form } />
                    </fieldset>

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
