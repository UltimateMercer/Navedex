export default ({ store, $axios, redirect }) => {
  $axios.setToken(store.state.authToken, "Bearer");

  $axios.interceptors.response.use(
    function (res) {
      return res;
    },
    function (error) {
      if (error.response && error.response.status === 401) {
        store.commit("SET_TOKEN", null);
        return redirect("/");
      }

      throw error;
    }
  );
};
