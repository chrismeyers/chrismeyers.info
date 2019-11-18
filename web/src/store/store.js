import Vue from "vue"
import Vuex from "vuex"
import VuexPersist from "vuex-persist"

Vue.use(Vuex)

// NOTE: Deleting the `vuex` localStorage entry may be needed if the
// application gets in a weird state.
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

// See: https://stackoverflow.com/a/9851769/7159369
const isIE = /*@cc_on!@*/false || !!document.documentMode
const tokenKey = "chrismeyers_info_apiToken"
const themes = {
  LIGHT: "light",
  DARK: "dark"
}

export const Store = new Vuex.Store({
  state: {
    isIE: isIE,
    tokenKey: tokenKey,
    themes: themes,
    theme: themes.LIGHT,
  },
  mutations: {
    toggleTheme(state) {
      state.theme = (state.theme === themes.LIGHT) ? themes.DARK : themes.LIGHT
      document.documentElement.setAttribute("data-theme", state.theme);
    },
    applyTheme(state) {
      document.documentElement.setAttribute("data-theme", state.theme);
    },
    setTheme(state, which) {
      if(Object.values(themes).includes(which)) {
        state.theme = which
        document.documentElement.setAttribute("data-theme", state.theme);
      }
    }
  },
  plugins: [vuexLocalStorage.plugin]
})
