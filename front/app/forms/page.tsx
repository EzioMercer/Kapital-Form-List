import { getForms } from '@/API';
import FormsList from '@/app/forms/_components/FormsList/FormsList';
import CreateForm from '@/app/forms/_components/CreateForm/CreateForm';

export const metadata = {
	title: 'Form List',
}

const Home = async () => {
	const formsList = await getForms();

	return (
		<>
			<CreateForm />
			<FormsList items={formsList} />
		</>
	);
}

export default Home;
