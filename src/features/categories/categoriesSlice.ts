import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

type Category = {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}


const categoriesAdapter = createEntityAdapter<Category>({

});

const url = "http://localhost:3001/categories";
export const getCategories  = createAsyncThunk('categories/getCategories', async() => {
    const res = await axios.get<Category[]>(url);
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