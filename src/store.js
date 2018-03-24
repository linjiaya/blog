import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CHANGE_FONTLOAD = 'change_fontload'
const CHANGE_OVERHEIGHT = 'change_overheight'
export default new Vuex.Store({
  state: {
    // 字体是否加载完毕
    fontLoaded: false,
    overHeight: false
  },
  mutations: {
    // 加载完字体的状态改变
    [CHANGE_FONTLOAD](state, payload) {
      state.fontLoaded = payload
    },
    // 是否超过bg高度
    [CHANGE_OVERHEIGHT](state, payload) {
      state.overHeight = payload
    }
  },
  actions: {
    [CHANGE_FONTLOAD]({ commit }, payload) {
      commit(CHANGE_FONTLOAD, payload)
    },
    [CHANGE_OVERHEIGHT]({ commit }, payload) {
      commit(CHANGE_OVERHEIGHT, payload)
    }
  },
  getters: {
    fontLoaded(state) {
      return state.fontLoaded
    }
  }
})
