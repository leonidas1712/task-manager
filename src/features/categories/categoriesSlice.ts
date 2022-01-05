import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from 'axios';
import { Category } from "../../Types";
import { getCategories as getCategoriesFromAPI,
     addCategory, 
     EditCategoryParams, 
     CategoryPostObject,
     editCategory as editCategoryInAPI,
     deleteCategory as deleteCategoryFromAPI

} from "../../api/APIService";
import { sortComparer } from "../../Constants";

const categoriesAdapter = createEntityAdapter<Category>({
    // sortComparer: (fst, snd) => {
    //     // earliest created comes first
    //     // JS allows date subtraction but typescript needs numeric values
    //     return new Date(fst.created_at).getTime() - new Date(snd.created_at).getTime()
    // }

    sortComparer
});

// Async Thunks //

export const getCategories  = createAsyncThunk('categories/getCategories', async() => {
    return getCategoriesFromAPI();
});

export const addNewCategory = createAsyncThunk('categories/addNewCategory', async(name:string) => {
    return addCategory(name);
});

export type EditCategoryArg = {
    params: EditCategoryParams,
    body: CategoryPostObject
}

export const editCategory = createAsyncThunk('categories/editCategory', async(arg: EditCategoryArg) => {
    return editCategoryInAPI(arg.params, arg.body);
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async(arg: EditCategoryParams) => {
    return deleteCategoryFromAPI(arg);
})

// Slice and reducers //

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            categoriesAdapter.upsertMany(state, action.payload);
        })
        .addCase(addNewCategory.fulfilled, categoriesAdapter.addOne)
        .addCase(editCategory.fulfilled, (state, action) => {
            const { id, ...changes} = action.payload;
            const update = { id, changes };
            categoriesAdapter.updateOne(state, update);
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            categoriesAdapter.removeOne(state, action.payload.id);
        });
    }
})

export default categoriesSlice.reducer;

// error category to show as a default instead of failing 
export const errorCategory = (): Category => {
    return {
        id: -1,
        name: "Unknown category",
        created_at: "",
        updated_at: ""
    }
}


// Selectors //
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectAllCategoryIds
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);
