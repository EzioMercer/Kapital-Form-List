'use client';

import styles from './EditForm.module.scss';
import { useState } from 'react';
import Modal from '@core/components/Modal/Modal';
import Form from '@core/components/Form/Form';
import { useAppDispatch } from '@/redux/hooks';
import { editFormSettings, removeField } from '@/redux/slices/formsListSlice';
import formDataToJSON from '@/utils/formDataToJSON';
import FormType from '@/types/FormType';
import AddFieldForm from '@/app/forms/_components/FormsList/FormsListItem/EditForm/AddField/AddFieldForm';
import FormTextInput from '@core/components/Form/FormTextInput/FormTextInput';
import chooseFormFieldType from '@/utils/chooseFormFieldType';

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
            editFormSettings({
                id: form._id,
                settings: {
                    ...(json as unknown as FormType['settings']),
                },
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
                        <FormTextInput name={ 'name' } autoFocus={ true } defaultValue={ form.settings.name } />

                        <label>
                            <input type="checkbox" name={ 'isVisible' } defaultChecked={ form.settings.isVisible } />
                            <span>Visible</span>
                        </label>

                        <label>
                            <input type="checkbox" name={ 'isReadOnly' } defaultChecked={ form.settings.isReadOnly } />
                            <span>Readonly</span>
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>Form fields</legend>

                        {form.fields.map((field, i) => {
                            const Field = chooseFormFieldType(field)!;

                            return (
                                <div key={ i } className={ styles['form-fields'] }>
                                    {Field}
                                    <button
                                        type={ 'button' }
                                        onClick={ () => {
                                            dispatch(
                                                removeField({
                                                    formId: form._id,
                                                    fieldId: field._id,
                                                }),
                                            );
                                        } }
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}

                        <AddFieldForm form={ form } />
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
