import { FormEvent, ReactNode } from 'react';
import formDataToJSON from '@/utils/formDataToJSON';

type Props = {
    onSubmit: (arg: ReturnType<typeof formDataToJSON>) => void;
    className?: string;
    children: ReactNode;
}

const handleSubmit = (e: FormEvent<HTMLFormElement>, cb: Props['onSubmit']) => {
    e.preventDefault();

    cb(formDataToJSON(new FormData(e.target as HTMLFormElement)));
};

const Form = ({ children, onSubmit, className }: Props) => (
    <form
        className={ className }
        onSubmit={ e => handleSubmit(e, onSubmit) }
    >
        { children }
    </form>
);

export default Form;
