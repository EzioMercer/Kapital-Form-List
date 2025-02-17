'use client';

import styles from './CreateForm.module.scss';
import { useState } from 'react';
import Modal from '@/app/_components/Modal/Modal';
import Form from '@/app/_components/Form/Form';
import { createForm } from '@/API';

const CreateForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={ () => setIsOpen(true) }>Create Form</button>
            <Modal isOpen={ isOpen } onClose={ () => setIsOpen(false) } title={ 'Create Form' }>
                <Form
                    onSubmit={ json => {
                        createForm(json)
                            .then(() => setIsOpen(false));
                    } }
                    className={ styles.form }>
                    <label>
                        <input type="text" placeholder="Name" name="name" />
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
