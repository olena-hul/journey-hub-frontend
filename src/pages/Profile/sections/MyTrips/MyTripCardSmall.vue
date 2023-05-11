<template>
  <div class="profile-my-trip-card-small">
    <img :src="trip.destination.image_urls?.at(0) || Paris" alt="Trip image" />
    <div class="profile-my-trip-card-small-content">
      <span> Trip to {{ trip.destination.name }}</span>
      <div>
        <img :src="Calendar" alt="calendar icon" />
        <span
          >{{ formatDateDDMM(trip.start_date) }} -
          {{ formatDateDDMM(trip.end_date) }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Paris from "@/assets/images/Paris.png";
import Calendar from "@/assets/images/CalendarGrey.svg";
import { formatDate, formatDateDDMM } from "@/pages/Planning/utils";

export default defineComponent({
  name: "my-trip-card-small",
  data: () => ({
    Paris,
    Calendar,
  }),
  props: {
    trip: Object,
  },
  methods: { formatDateDDMM, formatDate },
});
</script>

<style scoped></style>
