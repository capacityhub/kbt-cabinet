// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import iviewArea from 'iview-area'
import App from './App'
import { router } from './router/index'
import store from './store'
import '@/locale'
import 'iview/dist/styles/iview.css'
import VueI18n from 'vue-i18n'
import Icon from 'vue-awesome/components/Icon'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


// 按需引入awesome图标
import 'vue-awesome/icons/brands/qq'
import 'vue-awesome/icons/brands/weixin'
import 'vue-awesome/icons/brands/weibo'
import 'vue-awesome/icons/brands/github'
import { getRequest, postRequest, putRequest, deleteRequest, uploadFileRequest } from '@/libs/axios'
import { setStore, getStore, removeStore } from '@/libs/storage'
import util from '@/libs/util'
import hasPermission from '@/libs/hasPermission'
import hasRole from '@/libs/hasRole'
import VueLazyload from 'vue-lazyload'
import VueClipboard from 'vue-clipboard2'
import TreeTable from 'tree-table-vue'
import '@babel/polyfill'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
    error: require('./assets/img-error.png'),
    loading: require('./assets/loading2.gif')
})
Vue.use(VueI18n);
Vue.use(iView);
Vue.use(iviewArea);
Vue.use(VueClipboard);
Vue.use(TreeTable);
Vue.component('icon', Icon);
Vue.use(hasPermission);
Vue.use(hasRole);

Vue.use(Element)

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
Vue.use(contentmenu)

// 挂载全局使用的方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.setStore = setStore;
Vue.prototype.getStore = getStore;
Vue.prototype.removeStore = removeStore;

//一部分页面被分离出来作为单独页面供其他系统使用，即访问地址显示的页面没有主页的菜单等布局，只是当前的页面
//用路由分离的方式来实现，导致被分离出来的那些页面在相互跳转时可能会有不同的地址，一个是嵌入框架布局内的，一个是独立的
//这个是用来区分当前是处于哪个场景下，以此决定跳转的地址
Vue.prototype.isApplication = function(){
    let currentPath = this.$router.history.current.fullPath;
    if(/^\/application/.test(currentPath)){
        return true;
    }
    return false;
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted() {
        // 初始化菜单
        util.initRouter(this);
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
    }
})
