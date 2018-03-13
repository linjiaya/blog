import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CHANGE_FONTLOAD = 'change_fontload'
export default new Vuex.Store({
  state: {
    // 字体是否加载完毕
    fontLoaded: false
  },
  mutations: {
    [CHANGE_FONTLOAD](state, payload) {
      state.fontLoaded = payload
    }
  },
  actions: {
    [CHANGE_FONTLOAD]({ commit }, payload) {
      commit(CHANGE_FONTLOAD, payload)
    }
  },
  getters: {
    fontLoaded(state) {
      return state.fontLoaded
    }
  }
})
