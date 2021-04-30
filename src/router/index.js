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
                        },
                        {
                            path: '/updatePassword',
                            component: () => import('../components/common/UpdatePwd.vue')
                        }
                    ]
                },
                {
                    path:'/noticeDetail',
                    component:() => import('../components/userPage/NoticeDetail.vue'),
                    meta: {title: '公告详情'}
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
                    path: '/addNotice',
                    component: () => import('../components/page/AddNotice'),
                    meta: {title: '添加公告'}
                },
                {
                    path: '/deleteNotice',
                    component: () => import('../components/page/DeleteNotice.vue'),
                    meta: {title: '删除公告'}
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
                    path: '/stop',
                    component: () => import('../components/page/StopTreatment.vue'),
                    meta: {title: '停诊服务'}
                },
                {
                    path: '/deleteSchedule',
                    component: () => import('../components/page/DeleteSchedule.vue'),
                    meta: {title: '删除号源'}
                },
                {
                    path: '/check',
                    component: () => import('../components/page/Check.vue'),
                    meta: {title: '退号审核'}
                },
                {
                    path: '/manager',
                    component: () => import('../components/page/Manager.vue'),
                    meta: {title: '管理员'}
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
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
