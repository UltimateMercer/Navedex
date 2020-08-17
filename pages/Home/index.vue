<template>
  <div>
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

        <div class="row">
          <div
            v-for="naver in navers"
            :key="naver.id"
            class="col-lg-3 col-md-4 col-6"
          >
            <NaverCards :naver="naver" />
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="card card-horizontal-post mb-5" style="min-height: 500px;">
        <div class="row">
          <div class="col-lg-6 col-12">
            <div
              class="card-horizontal-post-avatar"
              style="
                background-image: url('https://i.imgur.com/diuV6oy.jpg');
                min-height: 500px;
              "
            ></div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="card-body">
              <button class="btn btn-light float-right">
                <font-awesome-icon :icon="['fas', 'times']" size="lg" />
              </button>
              <h4 class="mt-2"><strong>Goku</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                Front-end developer
              </h5>
              <h4 class=""><strong>Idade</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                38
              </h5>
              <h4 class=""><strong>Tempo de empresa</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                Front-end developer
              </h5>
              <h4 class=""><strong>Projeto que participou</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                Front-end developer
              </h5>
              <div class="mt-5">
                <button class="btn btn-light">
                  <font-awesome-icon :icon="['fas', 'trash']" size="lg" />
                </button>
                <button class="btn btn-light">
                  <font-awesome-icon :icon="['fas', 'pen']" size="lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="col-md-8 offset-md-2 col-12">
        <div class="card card-flat mb-5">
          <div class="card-body py-4 px-5">
            <button class="btn btn-light float-right">
              <font-awesome-icon :icon="['fas', 'times']" size="lg" />
            </button>
            <h2 class="mt-2 mb-3"><strong> Naver criado!</strong></h2>
            <h5 class="mb-4" style="font-weight: 400;">
              Naver criado com sucesso!
            </h5>
          </div>
        </div>
        <div class="card card-flat mb-5">
          <div class="card-body py-4 px-5">
            <button class="btn btn-light float-right">
              <font-awesome-icon :icon="['fas', 'times']" size="lg" />
            </button>
            <h2 class="mt-2 mb-3">
              <strong> Naver atualizado! </strong>
            </h2>
            <h5 class="mb-4" style="font-weight: 400;">
              Naver atualizado com sucesso!
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NaverCards from "@/components/NaverCards";

export default {
  middleware: "auth",

  components: { NaverCards },

  async asyncData({ $axios }) {
    const navers = await $axios.$get("/navers");
    console.log(navers);
    return { navers };
  },
};
</script>
