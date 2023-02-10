<template>
  <img :src="starQuadrangleImage" v-bind="$props" alt="Star pentagon image" />
</template>

<script>
import StarQuadrangle from "@/assets/images/StarQuadrangle.svg";

export default {
  name: "star-quadrangle",
  data: function () {
    return {
      starQuadrangleImage: StarQuadrangle,
    };
  },
};
</script>

<style scoped></style>
