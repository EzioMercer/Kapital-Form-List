import './globals.css';
import { ReactNode } from 'react';

type Props = {
	children: ReactNode
}

const RootLayout = ({ children }: Props) => (
	<html lang="en">
		<body>
			{ children }
		</body>
	</html>
)

export default RootLayout;
