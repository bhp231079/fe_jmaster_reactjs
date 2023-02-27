import { categoryService } from "../../services/CategoryService";
import { notifiFunction } from "../../utils/Notification/notificationCyberbugs";
import { STATUS_CODE } from "../contants/StatusCode";
import { getCategoriApiAction } from "../reducers/categoryReducer";
import { hideDrawerAction } from "../reducers/drawerReducer";
import { showLoadingAction } from "../reducers/loadingReducer";

export const getAllCategoryAction = (item) => {
  return async (dispatch, getState) => {
    try {
      let { data, status } = await categoryService.getAllCategoryAPI(item);

      if (status === STATUS_CODE.SUCCESS) {
        dispatch(getCategoriApiAction(data));
      }
    } catch (error) {}
  };
};

export const addCategoryAction = (item) => {
  return async (dispatch, getState) => {
    try {
      let { data, status } = await categoryService.addCategoryAPI(item);
      if (status == STATUS_CODE.SUCCESS) {
        dispatch(showLoadingAction(true));

        dispatch(hideDrawerAction());
        setTimeout(() => {
          dispatch(showLoadingAction(false));
        }, 1000);
        dispatch(
          getAllCategoryAction({
            start: 0,
            length: 100,
            search: {
              value: "",
            },
          })
        );
      }

      notifiFunction("success", "Add project successfully !");
    } catch (error) {
      console.log(error);

      notifiFunction("error", "Edit project unsuccessfully !");
    }
  };
};

export const editCategoryAction = (item) => {
  return async (dispatch, getState) => {
    try {
      let { data, status } = await categoryService.editCategoryAPI(item);
      if (status == STATUS_CODE.SUCCESS) {
        dispatch(showLoadingAction(true));

        dispatch(hideDrawerAction());
        setTimeout(() => {
          dispatch(showLoadingAction(false));
        }, 1000);
        dispatch(
          getAllCategoryAction({
            start: 0,
            length: 100,
            search: {
              value: "",
            },
          })
        );
      }

      notifiFunction("success", "Edit project successfully !");
    } catch (error) {
      console.log(error);
      notifiFunction("error", "Edit project unsuccessfully !");
    }
  };
};

export const deleteCategoryAction = (item) => {
  return async (dispatch, getState) => {
    try {
      let { data, status } = await categoryService.deleteCategoryAPI(item);
      if (status == STATUS_CODE.SUCCESS) {
        dispatch(showLoadingAction(true));

        dispatch(hideDrawerAction());
        setTimeout(() => {
          dispatch(showLoadingAction(false));
        }, 1000);
        dispatch(
          getAllCategoryAction({
            start: 0,
            length: 100,
            search: {
              value: "",
            },
          })
        );
      }

      notifiFunction("success", "Delete project successfully !");
    } catch (error) {
      console.log(error);
      notifiFunction("error", "Delete project unsuccessfully !");
    }
  };
};
