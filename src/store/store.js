import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import store from './store'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isLogin: sessionStorage.getItem("login"),
        userId: sessionStorage.getItem("userId"),
        userNickname: sessionStorage.getItem("userNickname"),
        userTel: sessionStorage.getItem("userTel"),
        adminLogin: sessionStorage.getItem("adminLogin"),
        adminName: sessionStorage.getItem("adminName"),
        adminRole: sessionStorage.getItem("adminRole")
    },
    action,
    mutations: {
        Login(state) {
            state.isLogin = true
        },
        Logout(state) {
            state.isLogin = false
        },
        AdminLogin(state){
            state.adminLogin = true
        },
        AdminLogout(state){
            state.adminLogin = false
        }
    },
    getters: {

    },
    store
})


