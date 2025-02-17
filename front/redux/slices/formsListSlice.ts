import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FormType from '@/types/FormType';

const initialState: FormType[] = [];

const formsListSlice = createSlice({
    name: 'forms-list',
    initialState,
    reducers: {
        init(state, action: PayloadAction<FormType[]>) {
            return action.payload;
        }
    }
});

export const { init } = formsListSlice.actions;
export default formsListSlice.reducer;
