import FormTextInput from '@core/components/Form/FormTextInput/FormTextInput';
import FormFieldType from '@/types/FormFieldType';

const chooseFormFieldType = (formField: FormFieldType) => {
    switch (formField.type) {
        case 'text':
            return <FormTextInput key={ formField._id } { ...formField } />;
    }
};

export default chooseFormFieldType;
