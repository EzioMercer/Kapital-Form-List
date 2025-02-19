type Props = {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    autoFocus?: boolean;
    required?: boolean;
    disabled?: boolean;
};

const FormTextInput = ({ name, placeholder, defaultValue, autoFocus, required, disabled }: Props) => (
    <input
        type="text"
        name={ name }
        placeholder={ placeholder }
        defaultValue={ defaultValue }
        autoFocus={ autoFocus }
        required={ required }
        disabled={ disabled }
    />
);

export default FormTextInput;
