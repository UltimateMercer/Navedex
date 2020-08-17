<template>
  <div class="card card-flat card-plain mb-3">
    <img :src="naver.url" class="card-img-top card-img-fit" :alt="naver.name" />
    <div class="my-3">
      <h4 class="mb-1">
        <strong>{{ naver.name }}</strong>
      </h4>
      <h5 class="mb-3" style="font-weight: 400;">
        {{ naver.job_role }}
      </h5>

      <button class="btn btn-light">
        <font-awesome-icon :icon="['fas', 'trash']" size="lg" />
      </button>
      <nuxt-link
        :to="`/edit/${naver.id}`"
        class="btn btn-light"
        title="Editar naver"
      >
        <font-awesome-icon :icon="['fas', 'pen']" size="lg" />
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "NaverCards",

  props: {
    naver: {
      type: Object,
      default: null,
    },
  },
};
</script>
