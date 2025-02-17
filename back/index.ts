import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import DB from './db/DB.ts';
import ErrorCodes from './utils/ErrorCodes.ts';

await DB.connect();

const app = express();
const port = process.env.PORT;

app.use(
	express.json(),
	cors({
		origin: `http://localhost:${ process.env.ALLOWED_ORIGIN_PORT }`
	}));

app.get('/forms', async (req: Request, res: Response) => {
	res.send(await DB.getAllForms());
});

app.post('/form', async (req: Request, res: Response) => {
	const form = {} as any;

	form.name = req.body.name ?? '';
	form.isVisible = (req.body.isVisible && true) ?? false;
	form.isReadonly = (req.body.isReadonly && true) ?? false;

	try {
		const newForm = await DB.createForm(form);

		res.send(newForm);
	} catch (error) {
		res.statusMessage = error.message;
		res.status(ErrorCodes.FORM_ALREADY_EXISTS).end();
	}
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${ port }`);
});
