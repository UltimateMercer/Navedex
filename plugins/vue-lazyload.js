import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require("~/static/nave.jpg"),
  loading: require("~/static/nave.jpg"),
  attempt: 1,
});
