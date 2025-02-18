import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import FormType from '@/types/FormType';
import { createForm, deleteForm } from '@/API';

const initialState: FormType[] = [];

export const addForm = createAsyncThunk('addForm', createForm);

export const removeForm = createAsyncThunk('removeForm', deleteForm);

const formsListSlice = createSlice({
    name: 'forms-list',
    initialState,
    reducers: {
        init(_state, { payload }: PayloadAction<FormType[]>) {
            return payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addForm.fulfilled, (state, { payload }) => {
                state.push(payload);
            })
            .addCase(addForm.rejected, (_, { error }) => {
                alert(error.message);

                throw new Error(error.message);
            });

        builder
            .addCase(removeForm.fulfilled, (state, { payload }) => state.filter((form) => form._id !== payload))
            .addCase(removeForm.rejected, (_state, { error }) => {
                alert(error.message);

                throw new Error(error.message);
            });
    },
});

export const { init } = formsListSlice.actions;
export default formsListSlice.reducer;
