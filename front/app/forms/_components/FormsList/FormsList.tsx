'use client';

import FormsListItem from './FormsListItem/FormsListItem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
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

    const formsList = useAppSelector(state => state.formsList);

    console.log(formsList);

    return (
        <ul>
            {
                formsList.map(formsListItem => <FormsListItem key={ formsListItem._id } { ...formsListItem } />)
            }
        </ul>
    );
};

export default FormsList;
