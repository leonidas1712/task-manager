import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Category } from "../../Types";

const categoriesAdapter = createEntityAdapter<Category>({

});

const { REACT_APP_API_URL:API_URL } = process.env;

const url = API_URL + "categories";
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


export const getCategories  = createAsyncThunk('categories/getCategories', async() => {
    const res = await delay(400).then(() => axios.get<Category[]>(url));
    return res.data;
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
