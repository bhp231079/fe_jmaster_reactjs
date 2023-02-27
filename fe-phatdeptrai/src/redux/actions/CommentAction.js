import { commentService } from "../../services/CommentService";
import { notifiFunction } from "../../utils/Notification/notificationCyberbugs";
import { defaultState } from "../../utils/systemSetting";
import { STATUS_CODE } from "../contants/StatusCode";
import { getCommentApiAction } from "../reducers/commentReducer";
import { hideDrawerAction } from "../reducers/drawerReducer";
import { showLoadingAction } from "../reducers/loadingReducer";

export const getAllCommentAction = (item) => {
  return async (dispatch, getState) => {
    try {
      let { data, status } = await commentService.getAllCommentAPI(item);

      if (status === STATUS_CODE.SUCCESS) {
        dispatch(getCommentApiAction(data));
      }
    } catch (error) {}
  };

};

export const addCommentAction = (item) => {
  console.log(item);
  return async (dispatch, getState) => {
    try {
      let { data, status } = await commentService.addCommentAPI(item);

      if (status === STATUS_CODE.SUCCESS) {
        dispatch(showLoadingAction(true));
  
        setTimeout(() => {
          dispatch(showLoadingAction(false));
        }, 1000);
        dispatch(
          getAllCommentAction({
            
            "start": 0,
            "length": 100,
            "postId": item?.postId,
            "search": {
                "value": ""
            }
        
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  
};

export const deleteCommentAction = (item) => {
  return async (dispatch, getState) => {
    try {
      let { data, status } = await commentService.deleteCommentAPI(item);
      if (status == STATUS_CODE.SUCCESS) {
        dispatch(showLoadingAction(true));

        dispatch(hideDrawerAction());
        setTimeout(() => {
          dispatch(showLoadingAction(false));
        }, 1000);
        dispatch(
          getAllCommentAction(defaultState)
        );
      }

      notifiFunction("success", "Delete comment successfully !");
    } catch (error) {
      console.log(error);
      notifiFunction("error", "Delete comment unsuccessfully !");
    }
  };
};