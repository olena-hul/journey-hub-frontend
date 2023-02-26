<template>
  <img :src="StarPentagon" v-bind="$props" alt="Star pentagon image" />
</template>

<script lang="ts">
import StarPentagon from "@/assets/images/StarPentagon.svg";

export default {
  name: "star-pentagon",
  data: function () {
    return {
      StarPentagon,
    };
  },
  props: {
    style: Object,
  },
};
</script>

<style scoped></style>
