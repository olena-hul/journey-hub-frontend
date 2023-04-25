<template>
  <div
    :class="`carousel-container-item ${className}`"
    :style="{
      transform: 'translateX(' + -100 * store.carouselCurrentSlide + '%)',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { store } from "@/common/components/Carousel/store";
import "./index.scss";

export default {
  name: "carousel-item",
  data: () => ({
    store,
  }),
  props: {
    className: String,
  },
};
</script>

<style scoped></style>
