import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import DB from './db/DB.ts';
import type { FormType } from './db/models/Forms.ts';

await DB.connect();

const app = express();
const port = process.env.PORT;

app.use(
    express.json(),
    cors({
        origin: `http://localhost:${ process.env.ALLOWED_ORIGIN_PORT }`,
    }));

app.get('/forms', async (req: Request, res: Response) => {
    res.send(await DB.getAllForms());
});

app.post('/form', async (req: Request, res: Response) => {
    const formSettings = {} as FormType['settings'];

    formSettings.name = req.body.name ?? '';
    formSettings.isVisible = (req.body.isVisible && true) ?? false;
    formSettings.isReadOnly = (req.body.isReadOnly && true) ?? false;

    try {
        res.send(
            await DB.createForm({
                settings: formSettings,
                fields: [],
            }),
        );
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

app.delete('/form/:formId/:fieldId', async (req: Request, res: Response) => {
    const { formId, fieldId } = req.params;

    try {
        await DB.deleteField(formId, fieldId);

        res.send(JSON.stringify({
            formId,
            fieldId,
        }));
    } catch (error) {
        res.statusMessage = error.message;
        res.status(error.cause).end();
    }
});

app.patch('/form/:id/settings', async (req: Request, res: Response) => {
    const formSettings: FormType['settings'] = {
        name: req.body.name,
        isVisible: (req.body.isVisible && true) ?? false,
        isReadOnly: (req.body.isReadOnly && true) ?? false,
    };

    try {
        res.send(
            await DB.updateFormSettings(
                req.params.id,
                formSettings,
            ),
        );
    } catch (error) {
        res.statusMessage = error.message;
        res.status(error.cause).end();
    }
});

app.patch('/form/:id/create-field', async (req: Request, res: Response) => {
    try {
        res.send(
            await DB.createField(
                req.params.id,
                req.body,
            ),
        );
    } catch (error) {
        res.statusMessage = error.message;
        res.status(error.cause).end();
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${ port }`);
});
