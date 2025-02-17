'use client';

import FormsListItem from './FormsListItem/FormsListItem';
import { useAppDispatch } from '@/redux/hooks';
import { use } from 'react';
import { init } from '@/redux/slices/formsListSlice';
import FormType from '@/types/FormType';

type Props = {
    formsPromise: Promise<FormType[]>
}

const FormsList = ({ formsPromise }: Props) => {
    const forms = use(formsPromise);
    const dispatch = useAppDispatch();

    dispatch(init(forms));

    return (
        <ul>
            {
                forms.map(form => <FormsListItem key={ form.id } { ...form } />)
            }
        </ul>
    );
};

export default FormsList;
