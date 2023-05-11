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
      :key="tripAttraction.date"
      v-for="tripAttraction in tripAttractions"
      class="planning-daily-activity-card"
    >
      <img
        :src="Museum"
        alt="Attraction icon"
        class="planning-daily-activity-card-icon"
      />
      <div class="planning-daily-activity-card-center">
        <div class="planning-daily-activity-card-center-header">
          <h6>{{ tripAttraction.attraction.name }}</h6>
          <img
            alt="Pencil"
            :src="Pencil"
            class="planning-heading-date-form-pencil-icon"
            @click="editTripAttractionPopupOpen = true"
          />
        </div>
        <div class="planning-daily-activity-card-center-details">
          <img :src="Clock" alt="clock icon" />
          <span> {{ tripAttraction.attraction.duration }} hours </span>
          <img :src="Price" alt="price icon" />
          <span>
            {{
              tripAttraction.currency ===
              this.tripsStore.trip?.budgets.at(0)?.currency
                ? tripAttraction.price
                : convertCurrency(
                    this.tripsStore.trip?.budgets.at(0)?.currency || "$",
                    tripAttraction.price
                  )
            }}
            {{
              tripAttraction.currency ||
              this.tripsStore.trip?.budgets.at(0)?.currency ||
              "$"
            }}</span
          >
        </div>
        <span>
          {{ tripAttraction.attraction.description }}
        </span>
      </div>
      <img
        :src="tripAttraction.attraction.image_urls?.at(0) || Lovre"
        alt="Attraction image"
        class="planning-daily-activity-card-attraction-image"
      />
      <img
        @click="() => onAttractionRemove(tripAttraction)"
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
    :placeholder="placeholder"
    :options="planningStore.attractions"
    track-by="name"
    :on-attraction-select="onAttractionSelect"
  />
  <span @click="onAddNewPlaceClick" class="planning-daily-activity-add-place">
    + Add a place</span
  >
  <edit-trip-attraction-popup
    :is-open="editTripAttractionPopupOpen"
    :on-close="() => (editTripAttractionPopupOpen = false)"
  />
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
} from "@/pages/Planning/utils";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import AddPlace from "@/pages/Planning/components/AddPlaceComponent.vue";
import type { Attraction } from "@/pages/Planning/api";
import Pencil from "@/assets/images/pencil.png";
import EditTripAttractionPopup from "@/pages/Profile/components/EditTripAttractionPopup.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import type { TripAttraction } from "@/pages/Profile/api";
import { removeTripAttraction } from "@/pages/Profile/api";

export default defineComponent({
  name: "daily-trip-attraction",
  components: { EditTripAttractionPopup, AddPlace },
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
    async onAttractionSelect(attraction: Attraction) {
      if (!this.day) {
        return;
      }
      const formattedDate = formatDateToBackendFormat(this.day);
      const createdAttraction = await this.tripsStore.createTripAttraction(
        formattedDate,
        attraction
      );
      this.tripsStore.plannedTrip[formattedDate].push(createdAttraction);
      this.planningStore.newPlaceVisible = false;
      this.tripsStore.calculateExpenses();
    },
    onAttractionRemove(attraction: TripAttraction) {
      if (!this.day) {
        return;
      }
      const formattedDate = formatDateToBackendFormat(this.day);

      this.tripsStore.plannedTrip[formattedDate] = this.tripsStore.plannedTrip[
        formattedDate
      ].filter(function (item: TripAttraction) {
        return item.id !== attraction.id;
      });
      removeTripAttraction(attraction.id);
      this.tripsStore.calculateExpenses();
    },
  },
  computed: {
    trip() {
      return this.tripsStore.trip;
    },
  },

  props: {
    dayNumber: Number,
    day: Date,
    attractionData: Object,
    tripAttractions: Array,
    placeholder: {
      required: false,
      type: String,
    },
  },
  data: () => ({
    Museum,
    Clock,
    Price,
    Lovre,
    RemoveIcon,
    Pencil,
    planningStore: usePlanningStore(),
    editTripAttractionPopupOpen: false,
    tripsStore: useTripsStore(),
  }),
});
</script>

<style scoped></style>
