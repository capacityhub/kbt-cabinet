import { GET_APP_LIST,DELETE_APP,EDIT_APP,GET_APP_INFO } from "@/store/modules/mutations-type";
import { getListApp,deleteApp,addApp,editAppInfo,getAppInfo } from '@/api/app';

const application = {
    namespaced: true,
    state: {
        appList:[],
        totalPages:1,
        appInfo:{}, //应用信息
    },
    mutations: {
        GET_APP_LIST(state,data){
            state.appList = data.content;
            state.totalPages = data.totalPages;
        },
        DELETE_APP(state,data){
            if(data.code == 200){
                state.appList.forEach((item,index) => {
                    if(item.id == data.id){
                        state.appList.splice(index,1);
                    }
                })
            }
        },
        EDIT_APP(state,data){

        },
        GET_APP_INFO(state,data){
            state.appInfo = data;
        }
    },
    actions:{
        AddAPP({commit},params){
            //创建（/上线/下线/草稿）
            return new Promise((resolve, reject) => {
                addApp(params).then((res) => {
                    resolve(res.code);
                }).catch(err => {
                    reject(err);
                });
            })
        },
        GetAppList({commit},params){
            //根据status分类查询列表
            return new Promise((resolve, reject) => {
                getListApp(params).then(res => {
                    if(res.code == 200){
                        commit('GET_APP_LIST',res.result);
                    }
                    resolve(res.code);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        GetAppInfo({commit},id){
            //根据ID查询应用信息
            return new Promise((resolve, reject) => {
                getAppInfo(id).then(res => {
                    if(res.code == 200){
                        commit('GET_APP_INFO',res.result);
                    }
                    resolve(res.code);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        DeleteApp({commit},id){
            return new Promise((resolve, reject) => {
                deleteApp(id).then(res => {
                    if(res.code == 200){
                        let data = {
                            code:res.code,
                            id:id
                        }
                        commit('DELETE_APP',data);
                    }
                    resolve(res.code)
                }).catch(err => {
                    reject(err);
                })
            })
        },
        EditApp({commit},form){
            //修改信息（也包括上线，下线的状态改变）
            return new Promise((resolve, reject) => {
                editAppInfo(form).then(res => {
                    if(res.code == 200){
                        commit('EDIT_APP',form)
                    }
                    resolve(res.code);
                }).catch(err => {
                    reject(err);
                })
            })
        }
    }
};

export default application;
