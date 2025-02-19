import mongoose, { Mongoose, Types } from 'mongoose';
import type { FormFieldType, FormType } from './models/Forms.ts';
import Forms from './models/Forms.ts';
import ErrorCodes from '../utils/ErrorCodes.ts';
import checkFormName from '../utils/checkFormName.ts';
import TextInput from './models/TextInput.ts';

const detectFieldModel = (fieldData: Omit<FormFieldType, '_id'>) => {
    switch (fieldData.type) {
        case 'text':
            return new TextInput(fieldData);
    }
};

class DB {
    private isConnected: boolean = false;

    connect(): Promise<Mongoose> {
        if (this.isConnected) return Promise.reject('Already connected!');

        const dbURL = `mongodb://${ process.env.DB_HOST }:${ process.env.DB_PORT }/forms`;
        const timeout = 4096;

        return new Promise<Mongoose>((resolve, reject) => {
            mongoose.connect(dbURL)
                .then((mongoose) => {
                    this.isConnected = true;

                    return mongoose;
                })
                .then(resolve, reject);

            setTimeout(() => reject(`Timeout. Can't connect to ${ dbURL } after ${ timeout }ms`), timeout);
        });
    }

    getAllForms() {
        return Forms.find({}).exec();
    }

    async createForm(formData: Omit<FormType, '_id'>) {
        const name = formData.settings.name;
        const checkResults = checkFormName(name);

        if (checkResults.isValid === false) {
            throw new Error(checkResults.message, {
                cause: checkResults.code,
            });
        }

        const result = await Forms.findOne({ name });

        if (result !== null) {
            throw new Error('Form with this name already exists!', {
                cause: ErrorCodes.CONFLICT,
            });
        }

        return new Forms(formData).save();
    }

    async deleteForm(id: string) {
        const result = await Forms.findByIdAndDelete(id);

        if (result === null) {
            throw new Error('Form doesn\'t exists!', {
                cause: ErrorCodes.NOT_ACCEPTABLE,
            });
        }
    }

    async deleteField(formId: string, fieldId: FormFieldType['_id']) {
        const result = await Forms.findByIdAndUpdate(formId, {
            $pull: {
                fields: { _id: new Types.ObjectId(fieldId) },
            },
        }, {
            new: true,
        });

        if (result === null) {
            throw new Error('Form doesn\'t exists!', {
                cause: ErrorCodes.NOT_ACCEPTABLE,
            });
        }
    }

    async updateFormSettings(formId: FormType['_id'], formSettings: FormType['settings']) {
        const checkResults = checkFormName(formSettings.name);

        if (checkResults.isValid === false) {
            throw new Error(checkResults.message, {
                cause: checkResults.code,
            });
        }

        const oldForm = await Forms.findOne({ 'settings.name': formSettings.name });

        if (oldForm !== null && !oldForm._id.equals(formId)) {
            throw new Error('Form with this name already exists!', {
                cause: ErrorCodes.CONFLICT,
            });
        }

        const result = await Forms.findByIdAndUpdate(formId, { $set: { 'settings': formSettings } }, { new: true });

        if (result === null) {
            throw new Error('Form doesn\'t exists!', {
                cause: ErrorCodes.NOT_ACCEPTABLE,
            });
        }

        return result;
    }

    async createField(formId: FormType['_id'], fieldData: Omit<FormFieldType, '_id'>) {
        const fieldModel = detectFieldModel(fieldData);

        const result = await Forms.findByIdAndUpdate(formId, {
            $push: {
                'fields': fieldModel,
            },
        }, { new: true });

        if (result === null) {
            throw new Error('Form doesn\'t exists!', {
                cause: ErrorCodes.NOT_ACCEPTABLE,
            });
        }

        return fieldModel;
    }
}

export default new Proxy(new DB(), {
    get(target, prop, receiver) {
        if (
            prop === 'connect' ||
            prop === 'isConnected'
        ) return Reflect.get(target, prop, receiver);

        // @ts-ignore
        if (!target.isConnected) {
            throw new Error('DB is not connected! Please run `connect` first');
        }

        return Reflect.get(target, prop, receiver);
    },
});
