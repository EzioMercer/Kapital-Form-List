import mongoose from 'mongoose';

class DB {
	private isConnected: boolean = false;

	connect() {
		if (this.isConnected) return;

		const dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/forms`;
		const timeout = 4096;

		return new Promise((resolve, reject) => {
			mongoose.connect(dbURL)
				.then(() => this.isConnected = true)
				.then(resolve, reject);

			setTimeout(() => reject(`Timeout. Can't connect to ${dbURL} after ${timeout}ms`), timeout);
		})
	}
}

export default new DB();
