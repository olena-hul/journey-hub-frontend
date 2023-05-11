<template>
  <div class="profile-trip-detail">
    <div class="profile-trip-detail-header">
      <img :src="BackIcon" alt="Back icon" @click="onBackClick" />
      <h3>Trip to {{ this.tripsStore.trip?.destination.name }}</h3>
    </div>
    <div class="profile-trip-detail-dates">
      <DatePicker
        ref="datepicker"
        v-model="this.tripsStore.selectedDates"
        class-name="profile-trip-detail-dates-input"
      />
    </div>
    <img
      :src="tripsStore.trip?.destination?.image_urls.at(0) || Paris"
      alt="Destination image"
    />
    <div class="profile-trip-detail-budget">
      <h3>
        Your budget - {{ this.budget?.amount }}
        {{ this.budget?.currency }}
      </h3>
      <img
        @click="() => (isBudgetPopupOpen = true)"
        alt="Pencil"
        :src="Pencil"
        class="planning-heading-date-form-pencil-icon"
      />
    </div>
    <div v-if="getDaysBetweenDates()">
      <DailyTripAttraction
        placeholder="Search a place"
        :day="parseDate(key)"
        :day-number="Number(index) + 1"
        :key="index"
        :trip-attractions="value as any"
        v-for="[index, [key, value]] of Object.entries(
          Object.entries(tripsStore.plannedTrip)
        )"
      />
    </div>
    <div class="planning-budget-chart">
      <h4>Expenses chart</h4>
      <BudgetChart
        :estimated-expenses="this.tripsStore.estimatedExpenses"
        :actual-expenses="this.tripsStore.actualExpenses"
      />
    </div>
  </div>

  <budget-popup
    :trip_id="tripsStore.trip?.id as number"
    :initial-budget="this.budget"
    :is-open="isBudgetPopupOpen"
    :on-close="() => (isBudgetPopupOpen = false)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DatePicker from "@/common/components/DatePicker/index.vue";
import BackIcon from "@/assets/images/previous.png";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import Paris from "@/assets/images/Paris.png";
import Pencil from "@/assets/images/pencil.png";
import BudgetPopup from "@/pages/Planning/components/BudgetPopup.vue";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { groupTripAttractions, parseDate } from "@/common/utils";
import BudgetChart from "@/pages/Planning/components/BudgetChart.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import type { TripDetail } from "@/pages/Profile/api";
import DailyTripAttraction from "@/pages/Profile/sections/MyTrips/components/DailyTripAttraction.vue";

export default defineComponent({
  name: "TripDetail",
  components: {
    DailyTripAttraction,
    BudgetChart,
    BudgetPopup,
    DatePicker,
  },
  data() {
    return {
      BackIcon,
      Paris,
      Pencil,
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
    parseDate,
    getDaysBetweenDates() {
      // Convert the dates to milliseconds
      const startMillis = this.tripsStore.selectedDates?.at(0)?.getTime();
      const endMillis = this.tripsStore.selectedDates?.at(1)?.getTime();

      if (startMillis && endMillis) {
        const diffMillis = endMillis - startMillis;
        return Math.floor(diffMillis / 86400000);
      }
    },
  },
  computed: {
    trip() {
      return this.tripsStore.trip;
    },
    budget() {
      return this.tripsStore.trip?.budgets.at(0);
    },
    planningTripDates() {
      return this.tripsStore.selectedDates;
    },
  },
  watch: {
    trip(newValue: TripDetail) {
      this.planningStore.getAttractions(newValue.destination.id);
      this.tripsStore.plannedTrip = groupTripAttractions(
        newValue.trip_attractions
      );
      this.tripsStore.getPlannedTrip(this.tripsStore.selectedDates);
    },
    planningTripDates(newValue) {
      this.tripsStore.getPlannedTrip(newValue);
    },
    budget(newValue) {
      this.tripsStore.calculateExpenses();
    },
  },
});
</script>

<style scoped></style>
