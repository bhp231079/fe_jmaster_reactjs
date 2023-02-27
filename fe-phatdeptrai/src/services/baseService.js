import  Axios  from 'axios';
import { DOMAIN, TOKEN } from '../utils/systemSetting';

export class baseService { 
    get =(url)=> {
        return Axios({
            method: 'GET',
            url: `${DOMAIN}/${url}`
        })

    }

    put =(url,item)=> {
        return Axios({
            method: 'PUT',
            url: `${DOMAIN}/${url}`,
            data: item,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })

    }

    
    putPost =(url,item)=> {
        return Axios({
            method: 'POST',
            url: `${DOMAIN}/${url}`,
            data: item,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })

    }

    
    post =(url,item)=> {
        return Axios({
            method: 'POST',
            url: `${DOMAIN}/${url}`,
            data: item,
            // headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })

    }

    postAuth =(url,item)=> {
        return Axios({
            method: 'POST',
            url: `${DOMAIN}/${url}`,
            data: item,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })

    }


    
    delete =(url,item)=> {
        return Axios({
            method: 'DELETE',
            url: `${DOMAIN}/${url}`,
            data: item,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })

    }

    getInfo =(url)=> {
        return Axios({
            method: 'GET',
            url: `${DOMAIN}/${url}`,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN)}
        })

    }


}
