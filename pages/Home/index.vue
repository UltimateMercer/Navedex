<template>
  <div>
    <Navbar />

    <div class="container-fluid">
      <div class="mx-lg-3 mx-md-2 mx-1">
        <div class="row">
          <div class="col-6">
            <h1 class="mb-3"><strong>Navers</strong></h1>
          </div>
          <div class="col-6 text-right">
            <nuxt-link :to="{ name: 'add' }" class="btn btn-dark">
              Adicionar Naver
            </nuxt-link>
          </div>
        </div>

        <div class="row mb-4">
          <div
            v-for="naver in navers"
            :key="naver.id"
            class="col-lg-3 col-md-4 col-6"
          >
            <div
              v-lazy-container="{ selector: 'img' }"
              class="card card-flat card-plain mb-3"
            >
              <a href="#" @click="showNaverInfo(naver)">
                <img
                  :data-src="naver.url"
                  class="card-img-top card-img-fit"
                  :alt="naver.name"
                />
              </a>

              <div class="my-3">
                <a href="#" @click="showNaverInfo(naver)" class="text-dark">
                  <h4 class="mb-1">
                    <strong>{{ naver.name }}</strong>
                  </h4>
                </a>
                <h5 class="mb-3" style="font-weight: 400;">
                  {{ naver.job_role }}
                </h5>
                <button
                  @click="showNaverInfo(naver)"
                  class="btn btn-light"
                  title="Exibir naver"
                >
                  <font-awesome-icon :icon="['fas', 'info']" size="lg" />
                </button>
                <nuxt-link
                  :to="`/delete/${naver.id}`"
                  class="btn btn-light"
                  title="Deletar naver"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" size="lg" />
                </nuxt-link>
                <nuxt-link
                  :to="`/edit/${naver.id}`"
                  class="btn btn-light"
                  title="Editar naver"
                >
                  <font-awesome-icon :icon="['fas', 'pen']" size="lg" />
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showNaver.content"
      class="show-info"
      :style="isOpen ? 'display: block' : 'display: none'"
    >
      <ShowNaver :naver="showNaver.content" @close-modal="resetNaver()" />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import ShowNaver from "@/components/ShowNaver";

export default {
  middleware: "auth",

  components: { Navbar, ShowNaver },

  async asyncData({ $axios }) {
    const navers = await $axios.$get("/navers");
    console.log(navers);
    return { navers };
  },

  data() {
    return {
      isOpen: false,
      showNaver: {
        id: "showNaver",
        content: null,
      },
    };
  },

  methods: {
    showNaverInfo(naver, button) {
      this.showNaver.content = naver;
      this.isOpen = !this.isOpen;
    },
    resetNaver() {
      debugger;
      this.showNaver.content = null;
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.show-info {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  &-body {
    width: 75%;
    margin: 5% auto;
  }
}

@media screen and (max-width: 768px) {
  .show-info {
    &-body {
      width: 90%;
    }
  }
}

.card-img-fit {
  height: 325px !important;
}
</style>
