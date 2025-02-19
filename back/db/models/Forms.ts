import { model, Schema } from 'mongoose';
import type { TextInputType } from './TextInput.ts';
import TextInput from './TextInput.ts';
import type { NumberInputType } from './NumberInput.ts';
import NumberInput from './NumberInput.ts';

type FormFieldType = TextInputType | NumberInputType;

export type FormType = {
    _id: string,
    settings: {
        name: string,
        isVisible: boolean,
        isReadOnly: boolean,
    },
    fields: FormFieldType[]
}

const FormSettingsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
    },
    isReadOnly: {
        type: Boolean,
        required: true,
    },
});

const FormsSchema = new Schema({
    settings: {
        type: FormSettingsSchema,
        required: true,
    },
    fields: [{
        type: Schema.Types.Mixed,
        enum: [
            TextInput,
            NumberInput,
        ],
    }],
});

const Forms = model<FormType>('Forms', FormsSchema);

export default Forms;
