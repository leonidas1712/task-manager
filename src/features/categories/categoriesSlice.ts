import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

type Category = {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}

const categoriesAdapter = createEntityAdapter<Category>({

});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState(),
    reducers: {}
})

export default categoriesSlice.reducer;