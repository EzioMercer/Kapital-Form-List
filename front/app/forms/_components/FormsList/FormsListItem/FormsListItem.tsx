import FormType from '@/types/FormType';
import EditForm from './EditForm/EditForm';
import ShowDetails from './ShowDetails/ShowDetails';
import DeleteForm from './DeleteForm/DeleteForm';

type Props = {
    form: FormType;
};

const FormsListItem = ({ form }: Props) => (
    <div>
        <span>{form.name}</span>
        <EditForm form={ form } />
        <ShowDetails form={ form } />
        <DeleteForm id={ form._id } />
    </div>
);

export default FormsListItem;
