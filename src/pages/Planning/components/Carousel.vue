<template>
  <ImagesCarousel class-name="planning-top-places-carousel" parent="planning">
    <CarouselItem
      :key="attraction.id"
      class-name="planning-top-places-carousel-item"
      v-for="attraction in this.planningStore.attractions"
    >
      <div class="planning-top-places-carousel-item-card">
        <img :src="attraction.image_urls?.at(0)" alt="Popular place image" />
        <h6>{{ attraction.name }}</h6>
        <span>
          {{ attraction.description }}
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
import { usePlanningStore } from "@/pages/Planning/store/planning";

export default defineComponent({
  name: "top-places-carousel",
  components: { CarouselItem, ImagesCarousel },
  data: () => ({
    EifelTower,
    planningStore: usePlanningStore(),
  }),
});
</script>

<style scoped></style>
