import { baseService } from "./baseService";

class PostService extends   baseService {
    constructor() {
        super();
        
    }
    getAllPostAPI = (item)=> {
        return this.post(`post/search`,item)
    }
    addPostAPI = (item) => {
        return this.postAuth(`member/post/add`,item)
    }
    editPostAPI = (item) => {
        return this.putPost(`admin/post/update`,item)
    }
    deletePostAPI = (item) => {
        return this.delete(`admin/post/delete?id=${item}`,null)
    }
    detailPostAPI = (id) => {
        return this.get(`post/${id}`)
    }
}

export const postService = new PostService();