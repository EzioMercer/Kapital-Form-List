import FormType from '@/types/FormType';
import { useAppDispatch } from '@/redux/hooks';
import { removeForm } from '@/redux/slices/formsListSlice';

type Props = FormType;

const FormsListItem = ({ _id, name }: Props) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        const shouldDelete = confirm('Are you sure?');

        if (!shouldDelete) return;

        dispatch(removeForm(_id));
    };

    const handleEdit = () => {};

    return (
        <div>
            <span>{name}</span>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit Form</button>
        </div>
    );
};

export default FormsListItem;
