import FormType from '@/types/FormType';
import { useAppDispatch } from '@/redux/hooks';
import { removeForm } from '@/redux/slices/formsListSlice';

type Props = FormType;

const FormsListItem = ({ _id, name }: Props) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(removeForm(_id));
    };

    return (
        <div>
            <span>{name}</span>
            <button onClick={handleClick}>Delete</button>
        </div>
    );
};

export default FormsListItem;
