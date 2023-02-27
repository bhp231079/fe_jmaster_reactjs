import { baseService } from "./baseService";


class CommentService extends   baseService {
    constructor() {
        super();
        
    }
    getAllCommentAPI = (item)=> {
        return this.post(`comment/search`,item)
    }
    addCommentAPI = (item) => {
        return this.postAuth(`member/comment/add`,item)
    }
    deleteCommentAPI = (item) => {
        return this.delete(`admin/comment/delete?id=${item}`,null)
    }
}

export const commentService = new CommentService();