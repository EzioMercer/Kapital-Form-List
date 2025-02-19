import TextInputType from '@/types/TextInputType';
import NumberInputType from '@/types/NumberInputType';
import CheckboxInputType from '@/types/CheckboxInputType';
import RadioInputType from '@/types/RadioInputType';
import DropdownInputType from '@/types/DropdownInputType';

type FormFieldType = TextInputType | NumberInputType | CheckboxInputType | RadioInputType | DropdownInputType;

export default FormFieldType;
