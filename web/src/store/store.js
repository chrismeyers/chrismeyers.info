import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from "vuex-persist"

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export const Store = new Vuex.Store({
  state: {
    theme: "light"
  },
  mutations: {
    toggleTheme(state) {
      state.theme = (state.theme === "light") ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", state.theme);
    },
    setTheme(state) {
      document.documentElement.setAttribute("data-theme", state.theme);
    }
  },
  plugins: [vuexLocalStorage.plugin]
})