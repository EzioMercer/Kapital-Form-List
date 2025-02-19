import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit';
import FormType from '@/types/FormType';
import { createField, createForm, deleteField, deleteForm, updateFormSettings } from '@/API';
import FormFieldType from '@/types/FormFieldType';

const initialState: FormType[] = [];

export const addForm = createAsyncThunk('addForm', createForm);
export const removeForm = createAsyncThunk('removeForm', deleteForm);
export const removeField = createAsyncThunk('removeField', deleteField);
export const editFormSettings = createAsyncThunk('editFormSettings', updateFormSettings);
export const addField = createAsyncThunk(
    'addField',
    async ({ id, fieldData }: { id: FormType['_id']; fieldData: FormFieldType }) => {
        const result = await createField({ id, fieldData });

        return {
            formId: id,
            result,
        };
    },
);

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

        builder.addCase(removeField.fulfilled, (state, { payload: { formId, fieldId } }) => {
            const form = state.find((form) => form._id === formId)!;
            
            form.fields = form.fields.filter((field) => field._id !== fieldId);
        });

        builder.addCase(editFormSettings.fulfilled, (state, { payload }) => {
            const index = state.findIndex((form) => form._id === payload._id);

            if (index !== -1) {
                state[index].settings = payload.settings;
            }
        });

        builder.addCase(addField.fulfilled, (state, { payload }) => {
            const index = state.findIndex((form) => form._id === payload.formId);

            if (index !== -1) {
                state[index].fields.push(payload.result);
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
