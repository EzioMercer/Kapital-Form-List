'use client';

import FormType from '@/types/FormType';
import { useAppDispatch } from '@/redux/hooks';
import { removeForm } from '@/redux/slices/formsListSlice';
import EditForm from './EditForm/EditForm';
import ShowDetails from './ShowDetails/ShowDetails';

type Props = FormType;

const FormsListItem = (form: Props) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        const shouldDelete = confirm('Are you sure?');

        if (!shouldDelete) return;

        dispatch(removeForm(form._id));
    };

    return (
        <div>
            <span>{form.name}</span>
            <button onClick={ handleDelete }>Delete</button>
            <EditForm { ...form } />
            <ShowDetails { ...form } />
        </div>
    );
};

export default FormsListItem;
