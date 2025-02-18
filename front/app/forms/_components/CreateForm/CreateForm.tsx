'use client';

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
        dispatch(addForm(json)).then(() => setIsOpen(false));
    };

    const show = () => setIsOpen(true);
    const hide = () => setIsOpen(false);

    return (
        <>
            <button onClick={ show }>Create Form</button>
            <Modal isOpen={ isOpen } onClose={ hide } title={ 'Create Form' }>
                <Form onSubmit={ handleSubmit }>
                    <input autoFocus={ true } type="text" placeholder="Name" name="name" />

                    <label>
                        <input type="checkbox" name="isVisible" defaultChecked={ true } />
                        <span>Visible</span>
                    </label>

                    <label>
                        <input type="checkbox" name="isReadonly" />
                        <span>Readonly</span>
                    </label>

                    <button>Create</button>
                    <button onClick={ hide } type={ 'button' }>
                        Cancel
                    </button>
                </Form>
            </Modal>
        </>
    );
};

export default CreateForm;
