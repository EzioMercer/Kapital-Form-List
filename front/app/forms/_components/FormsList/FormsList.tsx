import FormsListItem from './FormsListItem/FormsListItem';
import FormType from '@/types/FormType';

type Props = {
    items: FormType[];
}

const FormsList = ({ items }: Props) => (
    <ul>
        {
            items.map((item, i) => <FormsListItem key={ i } { ...item } />)
        }
    </ul>
);

export default FormsList;
