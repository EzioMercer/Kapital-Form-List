import { model, Schema } from 'mongoose';

export type TextInputType = {
    type: 'text';
    name: string;
};

const TextInputSchema = new Schema({
    type: {
        type: String,
        default: 'text',
        enums: ['text'],
    },
    name: String,
});

const TextInput = model('TextInput', TextInputSchema);

export default TextInput;
