import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Category } from "../../Types";
import { getCategories as getCategoriesFromAPI } from "../../api/APIService";

const categoriesAdapter = createEntityAdapter<Category>({
    sortComparer: (fst, snd) => {
        // earliest created comes first
        // JS allows date subtraction but typescript needs numeric values
        return new Date(fst.created_at).getTime() - new Date(snd.created_at).getTime()
    }
});

const { REACT_APP_API_URL:API_URL } = process.env;

export const getCategories  = createAsyncThunk('categories/getCategories', async() => {
    return getCategoriesFromAPI();
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            categoriesAdapter.upsertMany(state, action.payload);
        })
    }
})

export default categoriesSlice.reducer;

export const errorCategory = (): Category => {
    return {
        id: -1,
        name: "Unknown category",
        created_at: "",
        updated_at: ""
    }
}

// Selectors
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);
