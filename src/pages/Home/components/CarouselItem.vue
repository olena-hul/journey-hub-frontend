<template>
  <div
    class="home-popular-places-carousel-item"
    :style="{
      transform: 'translateX(' + -100 * store.carouselCurrentSlide + '%)',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { store } from "@/pages/Home/store";

export default {
  name: "carousel-item",
  data: () => ({
    store,
  }),
};
</script>

<style scoped></style>
