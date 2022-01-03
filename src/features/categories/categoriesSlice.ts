import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Category } from "../../Types";
import APIService from "../../api/APIService";


const categoriesAdapter = createEntityAdapter<Category>({

});

const { REACT_APP_API_URL:API_URL } = process.env;

export const getCategories  = createAsyncThunk('categories/getCategories', async() => {
    return APIService.getCategories();
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
    selectById: selectCategoryById
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);
