import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  Component: <p>13123</p>,
  defaultFunction: null,
  title:'',
};

const drawerReducer = createSlice({
  name: "drawerReducer",
  initialState,
  reducers: {
    showDrawerAction: (state,action) => {   
        console.log(action);
         state.visible= action.payload.visible
         state.Component = action.payload.Component
         state.title  = action.payload.title

    },
    hideDrawerAction: (state,action) => {
        state.visible= false
    }
  },
});

export const {showDrawerAction,hideDrawerAction} = drawerReducer.actions;

export default drawerReducer.reducer;
