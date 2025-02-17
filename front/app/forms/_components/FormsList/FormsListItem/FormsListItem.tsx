import FormType from '@/types/FormType';

type Props = FormType;

const FormsListItem = ({ name }: Props) => (
    <div>{ name }</div>
);

export default FormsListItem;
