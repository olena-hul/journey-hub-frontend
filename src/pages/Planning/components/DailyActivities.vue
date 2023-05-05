<template>
  <div class="planning-daily-activity">
    <div class="planning-daily-activity-date-container">
      <h4 class="planning-daily-activity-date-container-day-number">
        Day {{ dayNumber }}
      </h4>
      <span class="planning-daily-activity-date-container-day">
        ({{ formatDate(day) }})</span
      >
    </div>

    <div
      :key="activity.day"
      v-for="activity in activities"
      class="planning-daily-activity-card"
    >
      <img
        :src="Museum"
        alt="Attraction icon"
        class="planning-daily-activity-card-icon"
      />
      <div class="planning-daily-activity-card-center">
        <h6>{{ activity.name }}</h6>
        <div class="planning-daily-activity-card-center-details">
          <img :src="Clock" alt="clock icon" />
          <span> {{ activity.duration }} hours </span>
          <img :src="Price" alt="price icon" />
          <span>
            {{
              activity.currency === this.planningStore.budget?.currency
                ? activity.price
                : convertCurrency(
                    this.planningStore.budget?.currency || "$",
                    activity.price
                  )
            }}
            {{
              activity.currency || this.planningStore.budget?.currency || "$"
            }}</span
          >
        </div>
        <span>
          {{ activity.description }}
        </span>
      </div>
      <img
        :src="activity.image_urls?.at(0) || Lovre"
        alt="Attraction image"
        class="planning-daily-activity-card-attraction-image"
      />
      <img
        @click="() => onAttractionRemove(activity)"
        :src="RemoveIcon"
        class="planning-daily-activity-remove"
        alt="Remove icon"
      />
    </div>
  </div>
  <AddPlace
    v-if="
      this.planningStore.newPlaceVisible &&
      formatDateToBackendFormat(this.day) === this.planningStore.selectedDay
    "
    :options="planningStore.attractions"
    track-by="name"
    :on-attraction-select="onAttractionSelect"
  />
  <span @click="onAddNewPlaceClick" class="planning-daily-activity-add-place">
    + Add a place</span
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "@/common/utils";
import Museum from "@/assets/images/museum.png";
import Clock from "@/assets/images/clock.png";
import Price from "@/assets/images/price-tag.png";
import Lovre from "@/assets/images/Lovre.png";
import RemoveIcon from "@/assets/images/cross.png";
import { convertCurrency, formatDateToBackendFormat } from "../utils";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import AddPlace from "@/pages/Planning/components/AddPlaceComponent.vue";
import type { Attraction } from "@/pages/Planning/api";

export default defineComponent({
  name: "DailyActivities",
  components: { AddPlace },
  methods: {
    convertCurrency,
    formatDateToBackendFormat,
    formatDate,
    onAddNewPlaceClick() {
      if (!this.day) {
        return;
      }
      this.planningStore.newPlaceVisible = true;
      this.planningStore.selectedDay = formatDateToBackendFormat(this.day);
    },
    onAttractionSelect(attraction: Attraction) {
      if (!this.day) {
        return;
      }
      const formattedDate = formatDateToBackendFormat(this.day);
      this.planningStore.plannedTrip[formattedDate].push(attraction);
      this.planningStore.newPlaceVisible = false;
      this.planningStore.calculateExpenses();
    },
    onAttractionRemove(attraction: Attraction) {
      if (!this.day) {
        return;
      }
      const formattedDate = formatDateToBackendFormat(this.day);
      this.planningStore.plannedTrip[formattedDate].pop(attraction);
      this.planningStore.calculateExpenses();
    },
  },
  props: {
    dayNumber: Number,
    day: Date,
    attractionData: Object,
    activities: Array,
  },
  data: () => ({
    Museum,
    Clock,
    Price,
    Lovre,
    RemoveIcon,
    planningStore: usePlanningStore(),
  }),
});
</script>

<style scoped></style>
