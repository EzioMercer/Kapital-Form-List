import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import FormType from '@/types/FormType';
import { createForm, deleteForm, updateForm } from '@/API';

const initialState: FormType[] = [];

export const addForm = createAsyncThunk('addForm', createForm);

export const removeForm = createAsyncThunk('removeForm', deleteForm);

export const editForm = createAsyncThunk('editForm', updateForm);

const handleRejected = <T, K>(
    asyncThunk: ReturnType<typeof createAsyncThunk<T, K>>,
    builder: ActionReducerMapBuilder<FormType[]>,
) => {
    builder.addCase(asyncThunk.rejected, (_, { error }) => {
        alert(error.message);

        throw new Error(error.message);
    });
};

const formsListSlice = createSlice({
    name: 'forms-list',
    initialState,
    reducers: {
        init(_state, { payload }: PayloadAction<FormType[]>) {
            return payload;
        },
    },
    extraReducers: (builder) => {
        handleRejected(
            addForm,
            builder.addCase(addForm.fulfilled, (state, { payload }) => {
                state.push(payload);
            }),
        );

        handleRejected(
            removeForm,
            builder.addCase(removeForm.fulfilled, (state, { payload }) => state.filter((form) => form._id !== payload)),
        );

        handleRejected(
            editForm,
            builder.addCase(editForm.fulfilled, (state, { payload }) => {
                const index = state.findIndex((form) => form._id === payload._id);

                if (index !== -1) {
                    state[index] = payload;
                }
            }),
        );
    },
});

export const { init } = formsListSlice.actions;
export default formsListSlice.reducer;
