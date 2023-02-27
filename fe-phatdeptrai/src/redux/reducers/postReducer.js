import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allpost: [],
  post: {
      
  },
  detailPost: {

  }
};

const postReducer = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    getPostsApiAction: (state,action) => {
        state.allpost= action.payload
    },  
    editPostApiAction: (state,action) => {
        console.log(action);
        state.post = action.payload
    },
    detaiPostApiAction: (state,action) => {
      console.log(action);
      state.detailPost = action.payload
  },
  },
});

export const {getPostsApiAction,editPostApiAction,detaiPostApiAction} = postReducer.actions;

export default postReducer.reducer;
