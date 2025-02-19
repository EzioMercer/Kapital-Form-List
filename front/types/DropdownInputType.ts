export type DropdownInputOptionType = {
    value: string;
    label: string;
};

type DropdownInputType = {
    type: 'dropdown';
    name: string;
    options: DropdownInputOptionType[];
};

export default DropdownInputType;
