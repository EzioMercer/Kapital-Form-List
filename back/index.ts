import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors({
	origin: 'http://localhost:3001',
}));

app.get('/', (req: Request, res: Response) => {
	res.send('Express + TypeScript Server');
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${ port }`);
});
