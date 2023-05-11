<template>
  <div class="profile-trip-detail">
    <div class="profile-trip-detail-header">
      <img :src="BackIcon" alt="Back icon" @click="onBackClick" />
      <h3>{{ this.tripsStore.excursion?.name }}</h3>
    </div>
    <div class="profile-my-trips-carousel-item-dates">
      <img :src="Calendar" alt="calendar icon" />
      <span
        >{{ formatDateDDMM(this.tripsStore.excursion?.date as string) }}
      </span>
    </div>
    <div class="profile-excursions-images-container">
      <img
        :key="url"
        v-for="url in this.tripsStore.excursion?.excursion_attractions
          ?.at(0)
          .attraction.image_urls.slice(0, 3)"
        class="profile-excursions-detail-image"
        :src="url"
        alt="Destination image"
      />
    </div>
    <h4>Attractions</h4>
    <ExcursionAttraction
      v-for="attraction in this.tripsStore.excursion?.excursion_attractions"
      :excursion-attraction="attraction"
      :key="attraction.id"
    />
  </div>
  <div class="profile-excursions-book-button-container">
    <PrimaryButton> Book</PrimaryButton>
  </div>
  <BookExcursionPopup :is-open="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BackIcon from "@/assets/images/previous.png";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import Paris from "@/assets/images/Paris.png";
import Pencil from "@/assets/images/pencil.png";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { parseDate } from "@/common/utils";
import { useTripsStore } from "@/pages/Profile/store/trips";
import Calendar from "@/assets/images/CalendarGrey.svg";
import { formatDateDDMM } from "@/pages/Planning/utils";
import ExcursionAttraction from "@/pages/Profile/sections/Excursions/components/ExcursionAttraction.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import BookExcursionPopup from "@/pages/Profile/sections/Excursions/components/BookingPopup.vue";

export default defineComponent({
  name: "ExcursionDetail",
  components: { BookExcursionPopup, PrimaryButton, ExcursionAttraction },
  data() {
    return {
      BackIcon,
      Paris,
      Pencil,
      Calendar,
      destinationStore: useDestinationStore(),
      isBudgetPopupOpen: false,
      planningStore: usePlanningStore(),
      tripsStore: useTripsStore(),
    };
  },
  props: {
    onBackClick: Function,
  },
  methods: {
    formatDateDDMM,
    parseDate,
  },
  computed: {},
  watch: {},
});
</script>

<style scoped></style>
