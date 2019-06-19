/**
 *分离出来的页面，不嵌入主页的布局中，可单独显示，供外界调用
 */
const appManageRouter = {
    path:'/application',
    name: 'application',
    component: () => import('@/views/app-manage/appinfo/list.vue'),
};

const appAddRouter = {
    path: '/application/add',
    name: 'application-add',
    component: () => import('@/views/app-manage/appinfo/add.vue')
};

const appUpdateRouter = {
    path: '/application/update/:id',
    name: 'application-update',
    component: () => import('@/views/app-manage/appinfo/update.vue')
};

const appDetailRouter = {
    path: '/application/detail/:id',
    name: 'application-detail',
    component: () => import('@/views/app-manage/appinfo/detail.vue')
};

const appStatis = {
    path:'/application/statis',
    name: 'application',
    component: () => import('@/views/app-manage/appstatis/appaccess.vue'),
};


export const appManage = [
    appAddRouter,
    appManageRouter,
    appUpdateRouter,
    appDetailRouter,
    appStatis
];
