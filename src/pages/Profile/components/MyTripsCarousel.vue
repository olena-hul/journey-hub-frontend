<template>
  <ImagesCarousel
    identifier="my trips"
    title="Your trips"
    class-name="planning-top-places-carousel"
    parent="main-content"
  >
    <CarouselItem
      identifier="my trips"
      :key="destination.id"
      class-name="planning-top-places-carousel-item"
      v-for="destination in this.destinationStore.destinations"
    >
      <div
        class="planning-top-places-carousel-item-card profile-my-trips-carousel-item"
      >
        <img :src="destination.image_urls?.at(0)" alt="Popular place image" />
        <h6>{{ destination.name }}</h6>
        <div class="profile-my-trips-carousel-item-dates">
          <img :src="Calendar" alt="calendar icon" />
          <span>Mar 22 - May 23</span>
        </div>
        <div class="profile-my-trips-carousel-item-button">
          <PrimaryButton @click="onClick"> View </PrimaryButton>
        </div>
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
import { useDestinationStore } from "@/pages/Home/store/destinations";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

export default defineComponent({
  name: "my-trips-carousel",
  components: { PrimaryButton, CarouselItem, ImagesCarousel },
  data: () => ({
    EifelTower,
    Calendar,
    destinationStore: useDestinationStore(),
  }),
  props: {
    onViewClick: Function,
  },
  methods: {
    onClick() {
      this.onViewClick && this.onViewClick();
      console.log(this.onViewClick);
    },
  },
});
</script>

<style scoped></style>
