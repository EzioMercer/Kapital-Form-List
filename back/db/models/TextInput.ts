import { model, Schema } from 'mongoose';

export type TextInputType = {
    _id: string;
    type: 'text';
    name: string;
};

const TextInputSchema = new Schema({
    _id: String,
    type: {
        type: String,
        default: 'text',
        enums: ['text'],
    },
    name: String,
});

const TextInput = model('TextInput', TextInputSchema);

export default TextInput;
