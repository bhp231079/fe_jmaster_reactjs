
import { history } from "../../App";
import  { loginService } from "../../services/LoginService";
import { userService } from "../../services/UserService";
import { notifiFunction } from "../../utils/Notification/notificationCyberbugs";
import { defaultState, TOKEN, userInfo } from "../../utils/systemSetting";
import { STATUS_CODE } from "../contants/StatusCode";
import { hideDrawerAction } from "../reducers/drawerReducer";
import { showLoadingAction } from "../reducers/loadingReducer";
import { getUsersApiAction } from "../reducers/userReducer";

export const LoginAction = (item) => {
    console.log(item);
    return async (dispatch,getState) => {
        try {
                let {data,status} =  await loginService.loginAPI(item);
                console.log(data);
                if (status == STATUS_CODE.SUCCESS) {
                    localStorage.setItem(TOKEN,data.accessToken)
                    dispatch(userInfoAction())

                    setTimeout(() => {
                        history.push('/admin')
                    }, 1000);
                 
                }
                
        } catch (error) {
            console.log(error);
        }
    }
};

export const RegisterAction = (item) => {
    console.log(item);
    return async () => {
        try {
                let {data,status} =  await loginService.registerAPI(item);
                console.log(data);
                if (status == STATUS_CODE.SUCCESS) {
                    notifiFunction("success", "Đăng ký thành công !");
                    setTimeout(() => {
                        history.push('/login')
                    }, 2000);
                 
                }
                
        } catch (error) {
            console.log(error);
        }
    }
};

export const userInfoAction = () => {

    return async () => {
        try {
                let {data,status} =  await loginService.userInfoAPI();
                console.log(data);
                if (status == STATUS_CODE.SUCCESS) {
                   localStorage.setItem(userInfo,JSON.stringify(data))         
                }

        } catch (error) {
            console.log(error);
        }
    }
};


export const getAllUserAction = (item) => {

    return async (dispatch,getState) => {
        try {
                let {data,status} =  await userService.getAllUserAPI(item);
                console.log(data);
                if (status == STATUS_CODE.SUCCESS) {
                    dispatch(getUsersApiAction(data))
                }

        } catch (error) {
            console.log(error);
        }
    }
};



export const addUserAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await userService.addUserAPI(item);
        if (status == STATUS_CODE.SUCCESS) {
          dispatch(showLoadingAction(true));
  
          dispatch(hideDrawerAction());
          setTimeout(() => {
            dispatch(showLoadingAction(false));
          }, 1000);
          dispatch(
            getAllUserAction(defaultState)
          );
        }
  
        notifiFunction("success", "Add user successfully !");
      } catch (error) {
        console.log(error);
  
        notifiFunction("error", "Add user unsuccessfully !");
      }
    };
  };

  export const deleteUserAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await userService.deleteUserAPI(item);
        if (status == STATUS_CODE.SUCCESS) {
          dispatch(showLoadingAction(true));
  
          dispatch(hideDrawerAction());
          setTimeout(() => {
            dispatch(showLoadingAction(false));
          }, 1000);
          dispatch(
            getAllUserAction(defaultState)
          );
        }
  
        notifiFunction("success", "Delete user successfully !");
      } catch (error) {
        console.log(error);
        notifiFunction("error", "Delete user unsuccessfully !");
      }
    };
  };

  export const editUserAction = (item) => {
    return async (dispatch, getState) => {
      try {
        let { data, status } = await userService.editUserAPI(item);
        if (status == STATUS_CODE.SUCCESS) {
          dispatch(showLoadingAction(true));
  
          dispatch(hideDrawerAction());
          setTimeout(() => {
            dispatch(showLoadingAction(false));
          }, 1000);
          dispatch(
            getAllUserAction(defaultState)
          );
        }
  
        notifiFunction("success", "Edit user successfully !");
      } catch (error) {
        console.log(error);
        notifiFunction("error", "Edit user unsuccessfully !");
      }
    };
  };