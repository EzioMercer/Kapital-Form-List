import type { Mongoose } from 'mongoose';
import mongoose from 'mongoose';
import type { FormType } from './models/Forms.ts';
import Forms from './models/Forms.ts';
import ErrorCodes from '../utils/ErrorCodes.ts';
import checkFormName from '../utils/checkFormName.ts';

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

    async createForm(formData: FormType) {
        const name = formData.name;
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

    async updateForm(formData: FormType) {
        const withSameName = await Forms.findOne({ name: formData.name });

        if (withSameName === null || withSameName._id.equals(formData._id)) {
            const checkResults = checkFormName(formData.name);

            if (checkResults.isValid === false) {
                throw new Error(checkResults.message, {
                    cause: checkResults.code,
                });
            }
        } else {
            throw new Error('Form with this name already exists!', {
                cause: ErrorCodes.CONFLICT,
            });
        }

        const result = await Forms.findByIdAndUpdate(formData._id, formData, { new: true });

        if (result === null) {
            throw new Error('Form doesn\'t exists!', {
                cause: ErrorCodes.NOT_ACCEPTABLE,
            });
        }

        return result;
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
