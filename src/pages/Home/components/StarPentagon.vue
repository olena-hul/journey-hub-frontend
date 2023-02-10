<template>
  <img :src="starPentagonImage" v-bind="$props" alt="Star pentagon image" />
</template>

<script>
import StarPentagon from "@/assets/images/StarPentagon.svg";

export default {
  name: "star-pentagon",
  data: function () {
    return {
      starPentagonImage: StarPentagon,
    };
  },
};
</script>

<style scoped></style>
