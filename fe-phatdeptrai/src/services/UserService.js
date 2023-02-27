import { baseService } from "./baseService";

class UserService extends   baseService {
    constructor() {
        super();
        
    }
    getAllUserAPI = (item)=> {
        return this.postAuth(`admin/accounts`,item)
    }
    addUserAPI = (item) => {
        return this.postAuth(`admin/user/add`,item)
    }
    editUserAPI = (item) => {
        return this.put(`admin/user/update`,item)
    }
    deleteUserAPI = (item) => {
        return this.delete(`admin/user/delete?id=${item}`,null)
    }
    // detailPostAPI = (id) => {
    //     return this.get(`post/${id}`)
    // }
}

export const userService = new UserService();