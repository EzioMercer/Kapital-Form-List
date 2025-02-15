import { model, Schema } from 'mongoose';

const FormsSchema = new Schema({
	name: String,
	isVisible: Boolean,
	isReadonly: Boolean,
})

const Forms = model('Forms', FormsSchema);

export default Forms;
