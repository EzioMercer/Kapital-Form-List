import FormTextInput from '@core/components/Form/FormTextInput/FormTextInput';
import FormFieldType from '@/types/FormFieldType';

const chooseFormFieldType = (formField: FormFieldType, i: number) => {
    switch (formField.type) {
        case 'text':
            return <FormTextInput key={ i } { ...formField } />;
    }
};

export default chooseFormFieldType;
