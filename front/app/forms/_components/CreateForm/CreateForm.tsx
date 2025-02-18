'use client';

import styles from './CreateForm.module.scss';
import { useState } from 'react';
import Modal from '@/app/_components/Modal/Modal';
import Form from '@/app/_components/Form/Form';
import { useAppDispatch } from '@/redux/hooks';
import { addForm } from '@/redux/slices/formsListSlice';
import formDataToJSON from '@/utils/formDataToJSON';

const CreateForm = () => {
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (json: ReturnType<typeof formDataToJSON>) => {
        dispatch(addForm(json))
            .then(() => setIsOpen(false));
    };

    return (
        <>
            <button onClick={ () => setIsOpen(true) }>Create Form</button>
            <Modal isOpen={ isOpen } onClose={ () => setIsOpen(false) } title={ 'Create Form' }>
                <Form
                    onSubmit={ handleSubmit }
                    className={ styles.form }>
                    <label>
                        <input autoFocus={true} type="text" placeholder="Name" name="name" />
                    </label>

                    <label>
                        <input type="checkbox" name="isVisible" defaultChecked={ true } /> Visible
                    </label>

                    <label>
                        <input type="checkbox" name="isReadonly" /> Readonly
                    </label>

                    <button>Create</button>
                </Form>
            </Modal>
        </>
    );
};

export default CreateForm;
