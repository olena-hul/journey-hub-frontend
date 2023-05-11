<template>
  <div class="planning-daily-activity-card">
    <img
      :src="Museum"
      alt="Attraction icon"
      class="planning-daily-activity-card-icon"
    />
    <div class="planning-daily-activity-card-center">
      <div class="planning-daily-activity-card-center-header">
        <h6>{{ excursionAttraction.attraction.name }}</h6>
      </div>
      <div class="profile-my-trips-carousel-item-dates">
        <img :src="Calendar" alt="calendar icon" />
        <span
          >{{ formatDateWithHours(excursionAttraction.start_time as string) }} -
          {{ formatDateWithHours(excursionAttraction.end_time) }}
        </span>
      </div>
      <span>
        {{ excursionAttraction.description }}
      </span>
    </div>
    <img
      :src="excursionAttraction.attraction.image_urls?.at(0) || Lovre"
      alt="Attraction image"
      class="planning-daily-activity-card-attraction-image profile-excursions-card-image"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "@/common/utils";
import Museum from "@/assets/images/museum.png";
import Clock from "@/assets/images/clock.png";
import Price from "@/assets/images/price-tag.png";
import Lovre from "@/assets/images/Lovre.png";
import RemoveIcon from "@/assets/images/cross.png";
import {
  convertCurrency,
  formatDateToBackendFormat,
  formatDateWithHours,
} from "@/pages/Planning/utils";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import Pencil from "@/assets/images/pencil.png";
import { useTripsStore } from "@/pages/Profile/store/trips";
import Calendar from "@/assets/images/CalendarGrey.svg";

export default defineComponent({
  name: "excursion-attraction",
  methods: {
    formatDateWithHours,
    convertCurrency,
    formatDateToBackendFormat,
    formatDate,
  },
  computed: {
    trip() {
      return this.tripsStore.trip;
    },
  },

  props: {
    excursionAttraction: Object,
  },
  data: () => ({
    Museum,
    Clock,
    Price,
    Lovre,
    RemoveIcon,
    Pencil,
    Calendar,
    planningStore: usePlanningStore(),
    editTripAttractionPopupOpen: false,
    tripsStore: useTripsStore(),
  }),
});
</script>

<style scoped></style>
