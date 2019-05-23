// 不作为Main组件的子页面展示的页面单独写，如下
export const arrangeRouter = {
    path: '/static/appmanage/arrange',
    name: 'arrange',
    meta: {
        title: '小应用类别管理'
    },
    component: () => import('@/views/app-manage/arrange/list.vue')
};


// 不作为Main组件的子页面展示的页面单独写，如下
export const appRouter = {
    path: '/static/appmanage/appinfo',
    name: 'appinfo',
    meta: {
        title: '小应用管理'
    },
    component: () => import('@/views/app-manage/appinfo/list.vue')
};


// 所有上面定义的路由都要写在下面的routers里
export const staticRouter = [
    arrangeRouter,
    appRouter,
];
