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

<script>
import { store } from "@/pages/Home/store";

export default {
  name: "carousel-item",
  data() {
    return {
      store,
    };
  },
};
</script>

<style scoped></style>
