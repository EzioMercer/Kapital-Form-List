import { model, Schema } from 'mongoose';

export type NumberInputType = {
    type: 'number';
    name: string;
};

const NumberInputSchema = new Schema({
    type: {
        type: String,
        default: 'number',
        enums: ['number'],
    },
    name: String,
});

const NumberInput = model('NumberInput', NumberInputSchema);

export default NumberInput;
