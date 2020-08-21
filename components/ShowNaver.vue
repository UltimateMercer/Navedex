<template>
  <div
    class="card card-horizontal-post card-flat show-info-body"
    style="min-height: 500px;"
  >
    <div class="row">
      <div class="col-lg-6 col-12">
        <div
          class="card-horizontal-post-avatar"
          :style="{
            'background-image': `url(${naver.url})`,
          }"
          style="min-height: 600px;"
        ></div>
      </div>
      <div class="col-lg-6 col-12">
        <div class="card-body">
          <button
            @click="$emit('close-modal')"
            class="btn btn-light float-right mx-2"
          >
            <font-awesome-icon :icon="['fas', 'times']" size="lg" />
          </button>
          <h3 class="mt-3">
            <strong>{{ naver.name }}</strong>
          </h3>
          <h5 class="mb-3" style="font-weight: 400;">
            {{ naver.job_role }}
          </h5>
          <h4 class=""><strong>Data de nascimento</strong></h4>
          <h5 class="mb-3" style="font-weight: 400;">
            {{ dateFormat(naver.birthdate) }}
          </h5>
          <h4 class=""><strong>Data de admissão</strong></h4>
          <h5 class="mb-3" style="font-weight: 400;">
            {{ dateFormat(naver.admission_date) }}
          </h5>
          <h4 class=""><strong>Projeto que participou</strong></h4>
          <h5 class="mb-3" style="font-weight: 400;">
            {{ naver.project }}
          </h5>
          <div class="mt-5">
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
</template>
<script>
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
export default {
  name: "ShowNaver",

  props: {
    naver: {
      type: Object,
      default: null,
    },

    value: {
      type: Boolean,
      default: false,
    },
  },

  async created() {
    const naver = await this.$axios.$get("/navers/" + this.naver.id);
    //debugger;
    return naver;
  },

  methods: {
    dateFormat(date) {
      const newFormat = format(new Date(date), "dd 'de' MMM 'de' yyyy", {
        locale: ptBR,
      });

      return newFormat;
    },
  },
};
</script>
