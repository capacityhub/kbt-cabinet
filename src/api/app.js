// 统一请求路径前缀在libs/axios.js中修改
import {deleteRequest, getRequest, postRequest, putRequest, uploadFileRequest} from '@/libs/axios';


// 获取全部应用类别数据
export const getArrangeListData = (params) => {
    return getRequest('/app/admin/arrange/list', params)
}
// 添加应用类别
export const addArrange = (params) => {
    return postRequest('/app/admin/arrange/add', params)
}
// 编辑应用类别
export const editArrange = (params) => {
    return postRequest('/app/admin/arrange/edit', params)
}
// 删除应用类别
export const deleteArrange = (ids, params) => {
    return deleteRequest(`/app/admin/arrange/delByIds/${ids}`, params)
}



// 获取全部开发者数据
export const getDeveloperListData = (params) => {
    return getRequest('/app/admin/developer/list', params)
}
// 添加开发者
export const addDeveloper = (params) => {
    return postRequest('/app/admin/developer/add', params)
}
// 编辑开发者
export const editDeveloper = (params) => {
    return postRequest('/app/admin/developer/edit', params)
}
// 删除开发者
export const deleteDeveloper = (ids, params) => {
    return deleteRequest(`/app/admin/developer/delByIds/${ids}`, params)
}


//发布应用申请
export const addApp = (params) => {
    return postRequest('/app/admin/info/add',params);
}
//获取应用列表
export const getListApp = (params) => {
    return getRequest('/app/admin/info/list',params);
}
//删除应用
export const deleteApp = (id) => {
    return deleteRequest(`/app/admin/info/delByIds/${id}`,{});
}
//修改/编辑应用信息
export const editAppInfo = (params) => {
    return postRequest('/app/admin/info/edit',params);
}
//获取单条应用信息
export const getAppInfo = (id) => {
    return getRequest(`/app/admin/info/get/${id}`,{});
}


//获取app访问统计数据
export const getAppStatis = (params) => {
    return getRequest('/app/admin/statis/app',params);
}

