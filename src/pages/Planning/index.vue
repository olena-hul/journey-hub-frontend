<template>
  <div class="planning">
    <div id="planning" class="planning-form">
      <div class="planning-heading">
        <img
          :src="BackIcon"
          alt="Back icon"
          class="planning-heading-back-icon"
          @click="onBackClick"
        />
        <h1>Trip to {{ destinationStore.selectedDestination?.name }}</h1>
        <div class="planning-heading-date-form">
          <img alt="Calendar" :src="Calendar" />
          <span>{{ formatDate(destinationStore.selectedDates?.at(0)) }}</span>
          -
          <span>{{ formatDate(destinationStore.selectedDates?.at(1)) }}</span>
          <img
            alt="Pencil"
            :src="Pencil"
            class="planning-heading-date-form-pencil-icon"
          />
        </div>
      </div>
      <img
        :src="destinationStore.selectedDestination?.image_urls.at(0) || Paris"
        alt="Destination image"
        class="planning-heading-destination-image"
      />
      <h2 class="planning-top-places">Top places</h2>
      <TopPlacesCarousel />
      <div class="planning-budget-container">
        <h3>Your budget - 0$</h3>
        <img
          alt="Pencil"
          :src="Pencil"
          class="planning-heading-date-form-pencil-icon"
        />
        <PrimaryButton class-name="planning-budget-container-suggest-button">
          Suggest trip
        </PrimaryButton>
      </div>

      <DailyActivities
        :day="destinationStore.selectedDates?.at(0)"
        :day-number="i"
        :key="i"
        v-for="i in getDaysBetweenDates() + 1"
      />
    </div>
    <GoogleMap
      :latitude="destinationStore.selectedDestination?.location.latitude"
      :longitude="destinationStore.selectedDestination?.location.longitude"
    />
  </div>
</template>

<script lang="ts">
import "./index.scss";
import BackIcon from "@/assets/images/previous.png";
import { defineComponent } from "vue";
import Calendar from "@/assets/images/Calendar.svg";
import Pencil from "@/assets/images/pencil.png";
import Paris from "@/assets/images/Paris.png";
import router from "@/router";
import PopularPlace1 from "@/assets/images/PopularPlace1.png";
import PopularPlace2 from "@/assets/images/PopularPlace2.png";
import PopularPlace3 from "@/assets/images/PopularPlace3.png";
import StarPentagon from "@/assets/images/StarPentagon.svg";
import TopPlacesCarousel from "@/pages/Planning/components/Carousel.vue";
import GoogleMap from "@/pages/Planning/components/Map.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import DailyActivities from "@/pages/Planning/components/DailyActivities.vue";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import { formatDate } from "./utils";

export default defineComponent({
  name: "planning-page",
  components: { DailyActivities, PrimaryButton, GoogleMap, TopPlacesCarousel },
  data: () => ({
    BackIcon,
    Calendar,
    Pencil,
    Paris,
    PopularPlace1,
    PopularPlace2,
    PopularPlace3,
    StarPentagon,
    day: new Date(),
    destinationStore: useDestinationStore(),
  }),
  methods: {
    formatDate,
    getDaysBetweenDates() {
      // Convert the dates to milliseconds
      const startMillis = this.destinationStore.selectedDates?.at(0)?.getTime();
      const endMillis = this.destinationStore.selectedDates?.at(1)?.getTime();

      if (startMillis && endMillis) {
        const diffMillis = endMillis - startMillis;
        return Math.floor(diffMillis / 86400000);
      }
    },
    async onBackClick() {
      await router.back();
    },
  },
});
</script>

<style scoped></style>
