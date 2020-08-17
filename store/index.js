export const state = () => ({
  authToken: loadState("authToken") || null,
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.authToken = token;
    saveState("authToken", token);
  },
};

export const getters = {
  loggedIn(state) {
    return !!state.authToken;
  },
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page

  async login({ commit }, { email, password }) {
    try {
      const { token } = await this.$axios.$post("/users/login", {
        email,
        password,
      });
      commit("SET_TOKEN", token);
      this.$axios.setToken(token, "Bearer");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw error;
    }
  },

  async logout({ commit }) {
    commit("SET_TOKEN", null);
    this.$axios.setToken(null);
  },
};

function saveState(key, state) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

function loadState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return null;
  }
}
