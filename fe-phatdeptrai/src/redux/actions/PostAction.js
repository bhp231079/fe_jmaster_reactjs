import { postService } from "../../services/PostService";
import { notifiFunction } from "../../utils/Notification/notificationCyberbugs";
import { defaultState } from "../../utils/systemSetting";
import { STATUS_CODE } from "../contants/StatusCode";
import { hideDrawerAction } from "../reducers/drawerReducer";
import { showLoadingAction } from "../reducers/loadingReducer";
import { detaiPostApiAction, getPostsApiAction } from "../reducers/postReducer";

export const getAllPostAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await postService.getAllPostAPI(item);
  
        if (status === STATUS_CODE.SUCCESS) {
          dispatch(getPostsApiAction(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };


  export const addPostAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await postService.addPostAPI(item);
        if (status == STATUS_CODE.SUCCESS) {
          dispatch(showLoadingAction(true));
  
          dispatch(hideDrawerAction());
          setTimeout(() => {
            dispatch(showLoadingAction(false));
          }, 1000);
          dispatch(
              getAllPostAction(defaultState)
          );
        }
  
        notifiFunction("success", "Add post successfully !");
      } catch (error) {
        console.log(error);
  
        notifiFunction("error", "Add post unsuccessfully !");
      }
    };
  };

  export const editPostAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await postService.editPostAPI(item);
        if (status == STATUS_CODE.SUCCESS) {
          dispatch(showLoadingAction(true));
  
          dispatch(hideDrawerAction());
          setTimeout(() => {
            dispatch(showLoadingAction(false));
          }, 1000);
          dispatch(
            getAllPostAction(defaultState)
          );
        }
  
        notifiFunction("success", "Edit post successfully !");
      } catch (error) {
        console.log(error);
        notifiFunction("error", "Edit post unsuccessfully !");
      }
    };
  };
  export const deletePostAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await postService.deletePostAPI(item);
        if (status == STATUS_CODE.SUCCESS) {
          dispatch(showLoadingAction(true));
  
          dispatch(hideDrawerAction());
          setTimeout(() => {
            dispatch(showLoadingAction(false));
          }, 1000);
          dispatch(
            getAllPostAction(defaultState)
          );
        }
  
        notifiFunction("success", "Delete project successfully !");
      } catch (error) {
        console.log(error);
        notifiFunction("error", "Delete project unsuccessfully !");
      }
    };
  };
  export const detailPostAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await postService.detailPostAPI(item);
  
        if (status === STATUS_CODE.SUCCESS) {
          dispatch(detaiPostApiAction(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };