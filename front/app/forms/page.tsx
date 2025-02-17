import styles from './FormsListPage.module.scss';
import FormsList from '@/app/forms/_components/FormsList/FormsList';
import CreateForm from '@/app/forms/_components/CreateForm/CreateForm';
import { getForms } from '@/API';
import { Suspense } from 'react';
import Loading from '@/app/_components/Loading/Loading';

export const metadata = {
    title: 'Form List',
};

const FormsListPage = () => {
    const formsPromise = getForms();

    return (
        <div className={styles.page}>
            <CreateForm />
            <Suspense fallback={ <Loading /> }>
                <FormsList formsPromise={ formsPromise } />
            </Suspense>
        </div>
    );
};

export default FormsListPage;
