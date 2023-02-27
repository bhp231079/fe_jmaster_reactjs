import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  category: {

  }
};

const categoryReducer = createSlice({
  name: "categoryReducer",
  initialState,
  reducers: {
    getCategoriApiAction: (state,action) => {
            state.categories= action.payload
    },
    editCategoryApiAction: (state,action) => {
        console.log(action);
        state.category = action.payload
    }
  },
});

export const {getCategoriApiAction,editCategoryApiAction} = categoryReducer.actions;

export default categoryReducer.reducer;
