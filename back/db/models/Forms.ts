import { model, Schema } from 'mongoose';

export type FormType = {
    _id: string,
    name: string,
    isVisible: boolean,
    isReadOnly: boolean,
}


const FormsSchema = new Schema({
    name: String,
    isVisible: Boolean,
    isReadonly: Boolean,
});

const Forms = model('Forms', FormsSchema);

export default Forms;
