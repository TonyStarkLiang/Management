import request from "@/utils/request"
const group_name='codeblock'
const api_name='table'
export default {
    getBlockList() {
        return request({
            url:'',
            method:'get'
        })
    },
    search(page,size,searchMap) {
        return request({
            url: `/${group_name}/${api_name}/search/${page}/${size}`,
            method: 'post',
            data: searchMap
        });
    },
    save(pojo) {
        return request({
            url: '',
            method: 'post',
            data:pojo
        })
    },
    update(id,pojo) {
        if(id == null || id == ''){
            return save(pojo)
            }
        return request({
            url: "",
            mehtod: 'put',
            data: pojo
        })
    },
    deleteById(id) {
        return request({
            url: ``,
            method: 'delete'
            })            
    }
}