import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  comment: {

  }
};

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {
    getCommentApiAction: (state,action) => {
            state.comments= action.payload
    },
    editcommentApiAction: (state,action) => {
        console.log(action);
        state.comment = action.payload
    }
  },
});

export const {getCommentApiAction,editcommentApiAction} = commentReducer.actions;

export default commentReducer.reducer;
