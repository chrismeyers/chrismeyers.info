import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import { IS_IE, THEMES, SYSTEM_THEME_DARK_MEDIA_QUERY } from './constants';

Vue.use(Vuex);

// NOTE: Deleting the `vuex` localStorage entry may be needed if the
// application gets in a weird state.
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export const Store = new Vuex.Store({
  state: {
    isIE: IS_IE,
    theme: null,
  },
  mutations: {
    toggleTheme(state) {
      state.theme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      document.documentElement.setAttribute('data-theme', state.theme);
    },
    applyTheme(state) {
      if (state.theme === null) {
        if (window.matchMedia) {
          state.theme = window.matchMedia(SYSTEM_THEME_DARK_MEDIA_QUERY).matches
            ? THEMES.DARK
            : THEMES.LIGHT;
        } else {
          state.theme = THEMES.LIGHT;
        }
      }

      document.documentElement.setAttribute('data-theme', state.theme);
    },
    setTheme(state, which) {
      if (Object.values(THEMES).includes(which)) {
        state.theme = which;
        document.documentElement.setAttribute('data-theme', state.theme);
      }
    },
  },
  plugins: [vuexLocalStorage.plugin],
});
