import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import DB from './db/DB.ts';
import type { FormType } from './db/models/Forms.js';

await DB.connect();

const app = express();
const port = process.env.PORT;

app.use(
    express.json(),
    cors({
        origin: `http://localhost:${ process.env.ALLOWED_ORIGIN_PORT }`,
    }));

app.get('/forms', async (req: Request, res: Response) => {
    // await new Promise(r => setTimeout(r, 4096));

    res.send(await DB.getAllForms());
});

app.post('/form', async (req: Request, res: Response) => {
    const form = {} as FormType;

    form.name = req.body.name ?? '';
    form.isVisible = (req.body.isVisible && true) ?? false;
    form.isReadOnly = (req.body.isReadOnly && true) ?? false;
    form.fields = req.body.fields ?? [];

    try {
        const newForm = await DB.createForm(form);

        res.send(newForm);
    } catch (error) {
        res.statusMessage = error.message;
        res.status(error.cause).end();
    }
});

app.delete('/form/:id', async (req: Request, res: Response) => {
    const formId = req.params.id;

    try {
        await DB.deleteForm(formId);

        res.send(JSON.stringify(formId));
    } catch (error) {
        res.statusMessage = error.message;
        res.status(error.cause).end();
    }
});

app.patch('/form', async (req: Request, res: Response) => {
    try {
        const updatedForm = await DB.updateForm(req.body);

        res.send(updatedForm);
    } catch (error) {
        res.statusMessage = error.message;
        res.status(error.cause).end();
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${ port }`);
});
