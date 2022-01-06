import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

// url is relative url
const initialState = {
    url: '/'
};

const activeUrlSlice = createSlice({
    name: 'activeUrl',
    initialState,
    reducers: {

    }
});

export default activeUrlSlice.reducer;

// Selectors
