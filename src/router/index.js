import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            redirect: '/firstPage',
        },
        {
            path:'/',
            component: () => import('../components/common/Home-02.vue'),
            meta: {title: '用户展示页'},
            children:[
                {
                    path:'/firstPage',
                    component: () => import('../components/userPage/FirstPage.vue'),
                    meta: {title: '首页'}
                },
                {
                    path:'/userPage',
                    component:() => import('../components/userPage/UserPage.vue'),
                    children:[
                        {
                            path: '/orderRecord',
                            component: () => import('../components/common/OrderRecord.vue'),
                        },
                        {
                            path: '/patientManage',
                            component: () => import('../components/common/PatientManage.vue')
                        }
                    ]
                },
                {
                    path:'/',
                    component: () => import('../components/userPage/deptIntroduction.vue'),
                    meta: {title: '科室详情页'},
                    children:[
                        {
                            path:'/deptIntroduction',
                            component: () => import('../components/userPage/expertListPage.vue'),
                        },
                        {
                            path:'/orderPage',
                            component: () => import('../components/userPage/orderPage.vue')
                        },
                        {
                            path: '/expertDetail',
                            component: () => import('../components/userPage/expertDetail.vue')
                        },
                    ]
                },
            ]
        },
        {
            path: '/manage',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home-01.vue'),
            meta: { title: '后台' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/doctorManage',
                    component: () => import('../components/page/DoctorManage.vue'),
                    meta: {title: '医生管理'}
                },
                {
                    path: '/deptManage',
                    component: () => import('../components/page/DeptManage.vue'),
                    meta: {title: '科室管理'}
                },
                {
                    path: '/arrangeSchedule',
                    component: () => import('../components/page/ArrangeSchedule.vue'),
                    meta: {title: '排班管理'},
                },
                {
                    path: '/arrangeScheduleDetail',
                    component: () => import('../components/page/ArrangeScheduleDetail.vue'),
                    meta: {title: '排班'}
                },
                {
                    path: '/updateSchedule',
                    component: () => import('../components/page/UpdateSchedule.vue'),
                    meta: {title: '修改号源'}
                },
                {
                    path: '/deleteSchedule',
                    component: () => import('../components/page/DeleteSchedule.vue'),
                    meta: {title: '删除号源'}
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
