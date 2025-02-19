import FormType from '@/types/FormType';
import formDataToJSON from '@/utils/formDataToJSON';
import FormFieldType from '@/types/FormFieldType';

const protocol = 'http';
const hostname = 'localhost';
const port = 3000;
const apiURL = `${protocol}://${hostname}:${port}`;

const myFetch = <T = any>(...args: Parameters<typeof fetch>): Promise<T> =>
    fetch(...args).then((r) => (r.ok ? r.json() : Promise.reject(r.statusText))) as unknown as Promise<T>;

export const getForms = () => myFetch<FormType[]>(`${apiURL}/forms`);

export const createForm = (data: ReturnType<typeof formDataToJSON>): Promise<FormType> =>
    myFetch(`${apiURL}/form`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const deleteForm = (id: FormType['_id']): Promise<FormType['_id']> =>
    myFetch(`${apiURL}/form/${id}`, {
        method: 'DELETE',
    });

export const deleteField = ({
    formId,
    fieldId,
}: {
    formId: FormType['_id'];
    fieldId: FormFieldType['_id'];
}): Promise<{
    formId: FormType['_id'];
    fieldId: FormFieldType['_id'];
}> =>
    myFetch(`${apiURL}/form/${formId}/${fieldId}`, {
        method: 'DELETE',
    });

export const updateFormSettings = ({
    id,
    settings,
}: {
    id: FormType['_id'];
    settings: FormType['settings'];
}): Promise<FormType> =>
    myFetch(`${apiURL}/form/${id}/settings`, {
        method: 'PATCH',
        body: JSON.stringify(settings),
        headers: {
            'Content-Type': 'application/json',
        },
    });

export const createField = ({
    id,
    fieldData,
}: {
    id: FormType['_id'];
    fieldData: FormFieldType;
}): Promise<FormFieldType> =>
    myFetch(`${apiURL}/form/${id}/create-field`, {
        method: 'PATCH',
        body: JSON.stringify(fieldData),
        headers: {
            'Content-Type': 'application/json',
        },
    });
