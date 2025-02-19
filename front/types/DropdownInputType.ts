export type DropdownInputOptionType = {
    value: string;
    label: string;
};

type DropdownInputType = {
    _id: string;
    type: 'dropdown';
    name: string;
    options: DropdownInputOptionType[];
};

export default DropdownInputType;
