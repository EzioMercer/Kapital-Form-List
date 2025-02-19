type Props = {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    autoFocus?: boolean;
    required?: boolean;
};

const FormTextInput = ({ name, placeholder, defaultValue, autoFocus, required }: Props) => (
    <input
        type="text"
        name={ name }
        placeholder={ placeholder }
        defaultValue={ defaultValue }
        autoFocus={ autoFocus }
        required={ required }
    />
);

export default FormTextInput;
