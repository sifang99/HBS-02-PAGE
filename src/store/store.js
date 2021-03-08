import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import store from './store'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        show: false
    },
    action,
    mutations: {
        onOpen(state) {
            state.show = false
        },
      onClose(state) {
            state.show = true
        }
    },
    getters: {

    },
    store
})


