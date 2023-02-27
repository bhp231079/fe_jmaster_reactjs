import { baseService } from "./baseService";


class CategoryService extends   baseService {
    constructor() {
        super();
        
    }
    getAllCategoryAPI = (item)=> {
        return this.post(`category/search`,item)
    }
    addCategoryAPI = (item) => {
        return this.postAuth(`admin/category/add`,item)
    }
    editCategoryAPI = (item) => {
        return this.put(`admin/category/update`,item)
    }
    deleteCategoryAPI = (item) => {
        return this.delete(`admin/category/delete?id=${item}`,null)
    }
}

export const categoryService = new CategoryService();