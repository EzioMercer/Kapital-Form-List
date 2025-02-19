type RadioInputOptionType = {
    value: string;
    label: string;
};

type RadioInputType = {
    _id: string;
    type: 'radio';
    name: string;
    options: RadioInputOptionType[];
};

export default RadioInputType;
