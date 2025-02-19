'use client';

import FormType from '@/types/FormType';
import { useAppDispatch } from '@/redux/hooks';
import { removeForm } from '@/redux/slices/formsListSlice';

type Props = {
    id: FormType['_id'];
};

const DeleteForm = ({ id }: Props) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        const shouldDelete = confirm('Are you sure?');

        if (!shouldDelete) return;

        dispatch(removeForm(id));
    };

    return <button onClick={ handleDelete }>Delete</button>;
};

export default DeleteForm;
