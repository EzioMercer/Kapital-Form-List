import TextInputType from '@/types/TextInputType';

type Props = TextInputType & {
    defaultValue?: string;
};

const FormTextInput = ({ name, defaultValue }: Props) => {
    return <input type="text" name={ name } defaultValue={ defaultValue ?? '' } />;
};

export default FormTextInput;
