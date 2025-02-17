import './reset.css';
import { ReactNode } from 'react';
import StoreProvider from '@/app/StoreProvider';

type Props = {
    children: ReactNode
}

const RootLayout = ({ children }: Props) => (
    <html lang="en">
        <body>
            <StoreProvider>
                { children }
            </StoreProvider>
        </body>
    </html>
);

export default RootLayout;
