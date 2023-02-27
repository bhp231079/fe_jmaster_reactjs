import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,

  
};

const loadingReducer = createSlice({
  name: "loadingReducer",
  initialState,
  reducers: {
    showLoadingAction: (state,action) => {
        state.isLoading = action.payload
    } ,
    hideLoadingAction: (state,action) => {
        state.isLoading = action.payload
    }
  },
});

export const {showLoadingAction,hideLoadingAction} = loadingReducer.actions;

export default loadingReducer.reducer;
