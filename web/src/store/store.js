import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const Store = new Vuex.Store({
  state: {
    theme: localStorage.theme || "light"
  },
  mutations: {
    toggleTheme (state) {
      state.theme = (state.theme === "light") ? "dark" : "light"
      localStorage.theme = state.theme
    }
  }
})
