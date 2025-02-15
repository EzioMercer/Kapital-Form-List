import { FormEvent, ReactNode } from 'react';
import formDataToJSON from '@/utils/formDataToJSON';

type Props = {
	children: ReactNode;
	onSubmit: (arg: ReturnType<typeof formDataToJSON>) => void;
}

const handleSubmit = (e: FormEvent<HTMLFormElement>, cb: Props["onSubmit"]) => {
	e.preventDefault();

	cb(formDataToJSON(new FormData(e.target as HTMLFormElement)));
}

const Form = ({ children, onSubmit }: Props) => (
	<form onSubmit={e => handleSubmit(e, onSubmit)}>
		{children}
	</form>
)

export default Form;
