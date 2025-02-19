type RadioInputOptionType = {
    value: string;
    label: string;
};

type RadioInputType = {
    type: 'radio';
    name: string;
    options: RadioInputOptionType[];
};

export default RadioInputType;
