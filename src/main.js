import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import 'babel-polyfill';
import axios from 'axios';
import qs from 'qs';
import store from './store/store';


Vue.prototype.$store = store//挂载原型


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

axios.defaults.baseURL= 'http://localhost:8081';


axios.interceptors.request.use(config => {
    config.headers.authorization = localStorage.getItem('tokenId')
    return config
});  
// axios.interceptors.request.use(function (config) {
//     console.log("请求拦截")
//     let token = localStorage.getItem("token")
//     console.log(token)
//     if (token) {
//         //将token放到请求头发送给服务器,将tokenkey放在请求头中
//         config.headers.accessToken = token;     
//         console.log("请求拦截2")

//         //也可以这种写法
//          return config;
//     }
// }, function (error) {
//     return Promise.reject(error);

// });


//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
    // document.title = `${to.meta.title} | vue-manage-system`;
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     // role === 'admin' ? next() : next('/403');
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }
// });

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
