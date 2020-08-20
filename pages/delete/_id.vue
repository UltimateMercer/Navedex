<template>
  <div>
    <Navbar />
    <div class="container">
      <div
        class="card card-horizontal-post card-flat card-plain"
        style="min-height: 550px;"
      >
        <div class="row">
          <div class="col-lg-6 col-12">
            <div
              class="card-horizontal-post-avatar"
              :style="{
                'background-image': `url(${naver.url})`,
              }"
              style="min-height: 550px;"
            ></div>
          </div>
          <div class="col-lg-6 col-12">
            <div class="card-body">
              <h3 class="mt-3">
                <strong>{{ naver.name }}</strong>
              </h3>
              <h5 class="mb-3" style="font-weight: 400;">
                {{ naver.job_role }}
              </h5>
              <h4 class=""><strong>Data de nascimento</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                {{ naver.birthdate }}
              </h5>
              <h4 class=""><strong>Data de admissão</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                {{ naver.admission_date }}
              </h5>
              <h4 class=""><strong>Projeto que participou</strong></h4>
              <h5 class="mb-3" style="font-weight: 400;">
                {{ naver.project }}
              </h5>
              <div class="mt-5">
                <nuxt-link to="/home" class="btn btn-light">
                  Cancelar
                </nuxt-link>
                <button
                  @click.prevent="deleteNaver()"
                  class="btn btn-dark"
                  title="Editar naver"
                >
                  Excluir Naver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal"
        :style="isDeleted ? 'display: block' : 'display: none'"
      >
        <div class="card card-flat modal-body">
          <div class="card-body py-4 px-5">
            <nuxt-link to="/home" class="btn btn-light float-right">
              <font-awesome-icon :icon="['fas', 'times']" size="lg" />
            </nuxt-link>
            <h2 class="mt-2 mb-3"><strong> Naver deletado!</strong></h2>
            <h5 class="mb-4" style="font-weight: 400;">
              Naver deletado com sucesso!
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Navbar from "@/components/Navbar";

export default {
  middleware: "auth",

  components: { Navbar },

  data() {
    return {
      naver: {
        name: "",
        job_role: "",
        birthdate: "",
        admission_date: "",
        project: "",
        url: "",
      },
      isDeleted: false,
    };
  },

  async created() {
    const naver = await this.$axios.$get("/navers/" + this.$route.params.id);
    //debugger;

    this.naver.name = naver.name;
    this.naver.job_role = naver.job_role;
    this.naver.project = naver.project;
    this.naver.url = naver.url;
    this.naver.birthdate = format(
      new Date(naver.birthdate),
      "dd 'de' MMM 'de' yyyy",
      {
        locale: ptBR,
      }
    );
    this.naver.admission_date = format(
      new Date(naver.admission_date),
      "dd 'de' MMM 'de' yyyy",
      {
        locale: ptBR,
      }
    );
  },

  methods: {
    // dateConvert(date) {
    //   const convert = format(new Date(date), "yyyy-MM-dd");
    //   return convert;
    // },

    deleteNaver() {
      this.$axios
        .$delete("/navers/" + this.$route.params.id)
        .then(() => {
          this.isDeleted = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.modal {
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
    width: 70%;
    margin: 15% auto;
  }
}
</style>
