import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit';
import FormType from '@/types/FormType';
import { createForm, deleteForm, updateFormSettings } from '@/API';

const initialState: FormType[] = [];

export const addForm = createAsyncThunk('addForm', createForm);
export const removeForm = createAsyncThunk('removeForm', deleteForm);
export const editForm = createAsyncThunk('editForm', updateFormSettings);

const formsListSlice = createSlice({
    name: 'forms-list',
    initialState,
    reducers: {
        init: (_state, { payload }: PayloadAction<FormType[]>) => payload,
    },
    extraReducers: (builder) => {
        builder.addCase(addForm.fulfilled, (state, { payload }) => {
            state.push(payload);
        });

        builder.addCase(removeForm.fulfilled, (state, { payload }) => state.filter((form) => form._id !== payload));

        builder.addCase(editForm.fulfilled, (state, { payload }) => {
            const index = state.findIndex((form) => form._id === payload._id);

            if (index !== -1) {
                state[index] = payload;
            }
        });

        builder.addMatcher(isRejected, (_state, { error }) => {
            alert(error.message);

            throw new Error(error.message);
        });
    },
});

export const { init } = formsListSlice.actions;
export default formsListSlice.reducer;
