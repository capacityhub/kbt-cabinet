import { GET_ARRANGE_LIST } from "@/store/modules/mutations-type";
import { getArrangeListData } from '@/api/app';

const arrange = {
    namespaced: true,
    state: {
        arrangeList:[]
    },
    mutations: {
        GET_ARRANGE_LIST(state,data){
            state.arrangeList = data;
        },
    },
    actions:{
        GetArrangeList({commit}){
            return new Promise((resolve, reject) => {
                getArrangeListData({}).then(res => {
                    if(res.code == 200){
                        commit('GET_ARRANGE_LIST',res.result.content);
                    }
                    resolve(res.code);
                }).catch(err => {
                    reject(err);
                })
            })
        },
    }
};

export default arrange;
