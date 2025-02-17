import { configureStore } from '@reduxjs/toolkit';
import formsList from './slices/formsListSlice';

export const makeStore = () => configureStore({
    reducer: {
        formsList,
    },
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
