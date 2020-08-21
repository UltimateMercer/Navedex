<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <div
        class="col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12"
      >
        <div class="card card-plain mb-5">
          <div class="card-header">
            <h2>
              <nuxt-link to="/home" class="text-dark">
                <font-awesome-icon :icon="['fas', 'angle-left']" size="lg" />
              </nuxt-link>
              <strong> Adicionar Naver </strong>
            </h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="createNaver">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-4">
                    <label for="">Nome</label>
                    <input
                      class="form-control border border-dark form-dark"
                      type="text"
                      placeholder="Nome"
                      v-model="name"
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-4">
                    <label for="">Cargo</label>
                    <input
                      class="form-control border border-dark form-dark"
                      type="text"
                      placeholder="Cargo"
                      v-model="job_role"
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-4">
                    <label for="">Data de nascimento</label>
                    <input
                      class="form-control border border-dark form-dark"
                      type="date"
                      placeholder="Data de nascimento"
                      v-model="birthdate"
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-4">
                    <label for="">Tempo de empresa</label>
                    <input
                      class="form-control border border-dark form-dark"
                      type="date"
                      placeholder="Tempo de empresa"
                      v-model="admission_date"
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-4">
                    <label for="">Projetos que participou</label>
                    <input
                      class="form-control border border-dark form-dark"
                      type="text"
                      placeholder="Projetos que participou"
                      v-model="project"
                      required
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div class="form-group mb-4">
                    <label for="">URL da foto do Naver</label>
                    <input
                      class="form-control border border-dark form-dark"
                      type="text"
                      placeholder="URL da foto do Naver"
                      v-model="url"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-dark">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal"
        :style="isCreated ? 'display: block' : 'display: none'"
      >
        <div class="card card-flat modal-body">
          <div class="card-body py-4 px-5">
            <nuxt-link to="/home" class="btn btn-light float-right">
              <font-awesome-icon :icon="['fas', 'times']" size="lg" />
            </nuxt-link>
            <h2 class="mt-2 mb-3"><strong> Naver criado!</strong></h2>
            <h5 class="mb-4" style="font-weight: 400;">
              Naver criado com sucesso!
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
      name: "",
      job_role: "",
      birthdate: "",
      admission_date: "",
      project: "",
      url: "",
      isCreated: false,
    };
  },

  methods: {
    createNaver() {
      if (
        !this.name ||
        !this.job_role ||
        !this.birthdate ||
        !this.admission_date ||
        !this.project ||
        !this.url
      ) {
        return;
      }

      const formatBirthdate = format(new Date(this.birthdate), "P", {
        locale: ptBR,
      });
      const formatAdmission_date = format(new Date(this.admission_date), "P", {
        locale: ptBR,
      });

      const payload = {
        name: this.name,
        job_role: this.job_role,
        birthdate: formatBirthdate,
        admission_date: formatAdmission_date,
        project: this.project,
        url: this.url,
      };

      this.$axios
        .$post("/navers", payload)
        .then(() => {
          this.isCreated = true;
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
