import { baseService } from "./baseService";

export class LoginService extends baseService {
  constructor() {
    super();
  }
  loginAPI = (user) => {
    return this.post(
      `login?username=${user.username}&password=${user.password}`,null
    );
  };

  registerAPI = (user) => {
    return this.post(
      `user/register`,user
    );
  };
  userInfoAPI = () => {
    return this.getInfo(`member/me`)
  }
}

export const loginService = new LoginService();
