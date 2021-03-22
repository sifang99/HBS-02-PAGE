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
        userTel: sessionStorage.getItem("userTel",)
    },
    action,
    mutations: {
        Login(state) {
            state.isLogin = true
        },
        Logout(state) {
            state.isLogin = false
        }
    },
    getters: {

    },
    store
})


