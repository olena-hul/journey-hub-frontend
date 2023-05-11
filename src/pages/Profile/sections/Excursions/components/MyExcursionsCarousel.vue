<template>
  <ImagesCarousel
    title="View your bookings"
    identifier="my excursions"
    class-name="planning-top-places-carousel"
    parent="main-content"
  >
    <CarouselItem
      identifier="my excursions"
      :key="booking.id"
      class-name="planning-top-places-carousel-item"
      v-for="booking in this.tripsStore.excursionBookings"
    >
      <div
        class="planning-top-places-carousel-item-card profile-my-trips-carousel-item"
      >
        <img
          :src="
            booking.excursion.excursion_attractions
              .at(0)
              ?.attraction.image_urls?.at(0)
          "
          alt="Popular place image"
        />
        <h6>{{ booking.excursion.name }}</h6>
        <div class="profile-my-trips-carousel-item-dates">
          <img :src="Calendar" alt="calendar icon" />
          <span>{{ formatDateDDMM(booking.excursion.date as string) }} </span>
        </div>
        <div class="profile-my-trips-carousel-item-button">
          <PrimaryButton> View</PrimaryButton>
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
  name: "my-excursions-carousel",
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
