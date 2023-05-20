<template>
  <ImagesCarousel
    :title="title"
    :identifier="identifier || 'photos'"
    class-name="profile-photos-carousel"
    parent="main-content"
  >
    <CarouselItem
      :identifier="identifier || 'photos'"
      :key="image_url"
      class-name="profile-photos-carousel-item"
      v-for="image_url in this.image_urls"
    >
      <div
        class="planning-top-places-carousel-item-card profile-photos-carousel-item-card"
      >
        <img :src="image_url" alt="Popular place image" />
      </div>
    </CarouselItem>
  </ImagesCarousel>
</template>

<script lang="ts">
import ImagesCarousel from "@/common/components/Carousel/Carousel.vue";
import CarouselItem from "@/common/components/Carousel/CarouselItem.vue";
import EifelTower from "@/assets/images/EifelTower.png";
import { defineComponent } from "vue";
import Calendar from "@/assets/images/CalendarGrey.svg";

export default defineComponent({
  name: "photos-carousel",
  components: { CarouselItem, ImagesCarousel },
  data: () => ({
    EifelTower,
    Calendar,
  }),
  props: {
    identifier: String,
    image_urls: Array,
    title: String,
  },
});
</script>

<style scoped></style>
