import { model, Schema } from 'mongoose';
import type { TextInputType } from './TextInput.ts';
import TextInput from './TextInput.ts';
import type { NumberInputType } from './NumberInput.ts';
import NumberInput from './NumberInput.ts';

type FormFieldType = TextInputType | NumberInputType;

export type FormType = {
    _id: string,
    name: string,
    isVisible: boolean,
    isReadOnly: boolean,
    fields: FormFieldType[]
}

const FormsSchema = new Schema({
    name: String,
    isVisible: Boolean,
    isReadOnly: Boolean,
    fields: [{
        type: Schema.Types.Mixed,
        enum: [
            TextInput,
            NumberInput,
        ],
    }],
});

const Forms = model('Forms', FormsSchema);

export default Forms;
