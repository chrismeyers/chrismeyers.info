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

const themes = {
  LIGHT: "light",
  DARK: "dark"
}

export const Store = new Vuex.Store({
  state: {
    themes: themes,
    theme: themes.LIGHT
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
