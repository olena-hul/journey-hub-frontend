<template>
  <img :src="starQuadrangleImage" v-bind="$props" alt="Star pentagon image" />
</template>

<script lang="ts">
import StarQuadrangle from "@/assets/images/StarQuadrangle.svg";

export default {
  name: "star-quadrangle",
  data: function () {
    return {
      starQuadrangleImage: StarQuadrangle,
    };
  },
  props: {
    style: Object,
  },
};
</script>

<style scoped></style>
