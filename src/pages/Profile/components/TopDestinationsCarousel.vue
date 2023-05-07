<template>
  <ImagesCarousel
    identifier="top-destinations"
    title="Top destinations for you"
    class-name="planning-top-places-carousel"
    parent="main-content"
  >
    <CarouselItem
      identifier="top-destinations"
      :key="destination.id"
      class-name="planning-top-places-carousel-item"
      v-for="destination in this.destinationStore.destinations"
    >
      <div class="planning-top-places-carousel-item-card">
        <img :src="destination.image_urls?.at(0)" alt="Popular place image" />
        <h6>{{ destination.name }}</h6>
        <span>
          {{ destination.description }}
        </span>
      </div>
    </CarouselItem>
  </ImagesCarousel>
</template>

<script lang="ts">
import ImagesCarousel from "@/common/components/Carousel/Carousel.vue";
import CarouselItem from "@/common/components/Carousel/CarouselItem.vue";
import EifelTower from "@/assets/images/EifelTower.png";
import { defineComponent } from "vue";
import { useDestinationStore } from "@/pages/Home/store/destinations";

export default defineComponent({
  name: "top-destinations-carousel",
  components: { CarouselItem, ImagesCarousel },
  data: () => ({
    EifelTower,
    destinationStore: useDestinationStore(),
  }),
});
</script>

<style scoped></style>
