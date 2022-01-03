import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';

export type Category = {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}


const categoriesAdapter = createEntityAdapter<Category>({

});

const url = "http://localhost:3001/categories";
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

// Selectors
export const {
    selectAll: selectAllCategories
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);