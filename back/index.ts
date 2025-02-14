import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import DB from './db/db.ts';

await DB.connect();

const app = express();
const port = process.env.PORT;

app.use(cors({
	origin: `http://localhost:${process.env.ALLOWED_ORIGIN_PORT}`,
}));

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${ port }`);
});
