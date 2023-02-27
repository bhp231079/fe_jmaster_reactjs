import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
   user:{
    
   }
   
  };
  
  const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        getUsersApiAction: (state,action) => {
          state.users= action.payload
      },  
      editUserApiAction: (state,action) => {
          console.log(action);
          state.user = action.payload
      },
    //   detaiPostApiAction: (state,action) => {
    //     console.log(action);
    //     state.detailPost = action.payload
    // },
    },
  });
  
  export const {getUsersApiAction,editUserApiAction} = userReducer.actions;
  
  export default userReducer.reducer;