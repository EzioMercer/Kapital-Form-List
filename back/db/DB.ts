import type { Mongoose } from 'mongoose';
import mongoose from 'mongoose';
import Forms from './models/Forms.ts';

class DB {
	private isConnected: boolean = false;

	connect(): Promise<Mongoose> {
		if (this.isConnected) return Promise.reject("Already connected!");

		const dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/forms`;
		const timeout = 4096;

		return new Promise<Mongoose>((resolve, reject)=> {
			mongoose.connect(dbURL)
				.then((mongoose) => {
					this.isConnected = true;

					return mongoose;
				})
				.then(resolve, reject);

			setTimeout(() => reject(`Timeout. Can't connect to ${dbURL} after ${timeout}ms`), timeout);
		})
	}

	getAllForms() {
		return Forms.find({}).exec();
	}

	createForm(formData) {
		const form = new Forms(formData);

		return form.save();
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
	}
})
