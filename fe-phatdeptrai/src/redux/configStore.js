import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';
import drawerReducer from './reducers/drawerReducer';
import loadingReducer from './reducers/loadingReducer';
import postReducer from './reducers/postReducer';
import commentReducer from './reducers/commentReducer';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
export const store =  configureStore({
  reducer: {
    categoryReducer : categoryReducer,
    drawerReducer   : drawerReducer,
    loadingReducer : loadingReducer,
    postReducer: postReducer,
    commentReducer: commentReducer,
    userReducer: userReducer,

  },
  middleware: [thunk] 
})