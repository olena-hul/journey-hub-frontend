<template>
  <ImagesCarousel
    identifier="my trips"
    title="Your trips"
    class-name="planning-top-places-carousel"
    parent="main-content"
  >
    <CarouselItem
      identifier="my trips"
      :key="trip.id"
      class-name="planning-top-places-carousel-item"
      v-for="trip in this.tripsStore.myTrips"
    >
      <div
        class="planning-top-places-carousel-item-card profile-my-trips-carousel-item"
      >
        <img
          :src="trip.destination.image_urls?.at(0)"
          alt="Popular place image"
        />
        <h6>{{ trip.destination.name }}</h6>
        <div class="profile-my-trips-carousel-item-dates">
          <img :src="Calendar" alt="calendar icon" />
          <span
            >{{ formatDateDDMM(trip.start_date as string) }} -
            {{ formatDateDDMM(trip.end_date as string) }}</span
          >
        </div>
        <div class="profile-my-trips-carousel-item-button">
          <PrimaryButton @click="() => onClick(trip.id)"> View</PrimaryButton>
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
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { useTripsStore } from "@/pages/Profile/store/trips";
import { formatDateDDMM } from "@/pages/Planning/utils";

export default defineComponent({
  name: "my-trips-carousel",
  components: { PrimaryButton, CarouselItem, ImagesCarousel },
  data: () => ({
    EifelTower,
    Calendar,
    planningStore: usePlanningStore(),
    tripsStore: useTripsStore(),
  }),
  props: {
    onViewClick: Function,
  },
  methods: {
    formatDateDDMM,
    onClick(trip_id: number) {
      this.tripsStore.getTripDetail(trip_id);
      this.onViewClick && this.onViewClick();
    },
  },
});
</script>

<style scoped></style>
