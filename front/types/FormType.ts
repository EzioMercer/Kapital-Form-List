import FormFieldType from '@/types/FormFieldType';

type FormType = {
    _id: string;
    name: string;
    isVisible: boolean;
    isReadOnly: boolean;
    fields: FormFieldType[];
};

export default FormType;
