'use client';

import FormsListItem from './FormsListItem/FormsListItem';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { use } from 'react';
import { init } from '@/redux/slices/formsListSlice';
import FormType from '@/types/FormType';
import useMount from '@/utils/hooks/useMount';

type Props = {
    formsPromise: Promise<FormType[]>;
};

const FormsList = ({ formsPromise }: Props) => {
    const dispatch = useAppDispatch();

    useMount(() => {
        const forms = use(formsPromise);

        dispatch(init(forms));
    });

    const formsList = useAppSelector((state) => state.formsList);

    console.log(formsList);

    return (
        <ul>
            {formsList.map((formsListItem) => (
                <FormsListItem key={ formsListItem._id } form={ formsListItem } />
            ))}
        </ul>
    );
};

export default FormsList;
