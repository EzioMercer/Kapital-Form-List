import FormType from '@/types/FormType';
import formDataToJSON from '@/utils/formDataToJSON';

const protocol = 'http';
const hostname = 'localhost';
const port = 3000;
const apiURL = `${protocol}://${hostname}:${port}`;

const myFetch = <T = any>(...args: Parameters<typeof fetch>): Promise<T> => fetch(...args).then(r => r.json()) as unknown as Promise<T>;

export const getForms = () => myFetch<FormType[]>(`${apiURL}/forms`);

export const createForm = (data: ReturnType<typeof formDataToJSON>) => {
	console.log(data, JSON.stringify(data));

	return myFetch(`${apiURL}/form`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})

}
