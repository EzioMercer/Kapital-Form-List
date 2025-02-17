import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import FormType from '@/types/FormType';

const initialState: FormType[] = [];

const formsListSlice = createSlice({
    name: 'forms-list',
    initialState,
    reducers: {
        init(_state, action: PayloadAction<FormType[]>) {
            return action.payload;
        },
        addForm(state, action: PayloadAction<FormType>) {
            state.push(action.payload);
        }
    }
});

export const { init, addForm } = formsListSlice.actions;
export default formsListSlice.reducer;
