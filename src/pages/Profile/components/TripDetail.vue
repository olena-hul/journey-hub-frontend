<template>
  <div class="profile-trip-detail">
    <div class="profile-trip-detail-header">
      <img :src="BackIcon" alt="Back icon" @click="onBackClick" />
      <h3>Trip to Paris</h3>
    </div>
    <div class="profile-trip-detail-dates">
      <DatePicker
        ref="datepicker"
        v-model="this.destinationStore.selectedDates"
        class-name="profile-trip-detail-dates-input"
      />
    </div>
    <img
      :src="destinationStore.selectedDestination?.image_urls.at(0) || Paris"
      alt="Destination image"
    />
    <div class="profile-trip-detail-budget">
      <h3>Your budget - 0 $</h3>
      <img
        @click="() => (isBudgetPopupOpen = true)"
        alt="Pencil"
        :src="Pencil"
        class="planning-heading-date-form-pencil-icon"
      />
    </div>
    <div v-if="getDaysBetweenDates()">
      <DailyActivities
        :edit-enabled="true"
        placeholder="Search a place"
        :day="parseDate(key)"
        :day-number="Number(index) + 1"
        :key="index"
        :activities="value as any"
        v-for="[index, [key, value]] of Object.entries(
          Object.entries(planningStore.plannedTrip)
        )"
      />
    </div>
    <div class="planning-budget-chart">
      <h4>Expenses chart</h4>
      <BudgetChart
        :estimated-expenses="this.planningStore.estimatedExpenses"
        :actual-expenses="this.planningStore.actualExpenses"
      />
    </div>
  </div>

  <budget-popup
    :is-open="isBudgetPopupOpen"
    :on-close="() => (isBudgetPopupOpen = false)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DatePicker from "@/common/components/DatePicker/index.vue";
import BackIcon from "@/assets/images/previous.png";
import router from "@/router";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import Paris from "@/assets/images/Paris.png";
import Pencil from "@/assets/images/pencil.png";
import BudgetPopup from "@/pages/Planning/components/BudgetPopup.vue";
import DailyActivities from "@/pages/Planning/components/DailyActivities.vue";
import { LOCALSTORAGE_KEYS } from "@/common/constants";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { parseDate } from "@/common/utils";
import BudgetChart from "@/pages/Planning/components/BudgetChart.vue";

export default defineComponent({
  name: "TripDetail",
  components: { BudgetChart, DailyActivities, BudgetPopup, DatePicker },
  data() {
    return {
      BackIcon,
      Paris,
      Pencil,
      destinationStore: useDestinationStore(),
      isBudgetPopupOpen: false,
      planningStore: usePlanningStore(),
    };
  },
  props: {
    onBackClick: Function,
  },
  methods: {
    parseDate,
    getDaysBetweenDates() {
      // Convert the dates to milliseconds
      const startMillis = this.destinationStore.selectedDates?.at(0)?.getTime();
      const endMillis = this.destinationStore.selectedDates?.at(1)?.getTime();

      console.log(this.planningStore.plannedTrip);
      if (startMillis && endMillis) {
        const diffMillis = endMillis - startMillis;
        return Math.floor(diffMillis / 86400000);
      }
    },
  },
  mounted() {
    if (this.destinationStore.selectedDates?.length === 0) {
      let dates = localStorage.getItem(LOCALSTORAGE_KEYS.selectedDates);
      const destination = localStorage.getItem(
        LOCALSTORAGE_KEYS.selectedDestination
      );
      if (dates && destination) {
        dates = JSON.parse(dates);
        const parsedDates = dates && [new Date(dates[0]), new Date(dates[1])];
        const parsedDestination = JSON.parse(destination);
        this.destinationStore.saveUserChoice(
          parsedDates as Date[],
          parsedDestination,
          false
        );
        this.planningStore.getAttractions(parsedDestination.id);
        this.planningStore.getPlannedTrip(this.destinationStore.selectedDates);
      } else {
        router.push("/");
      }
    }
  },
});
</script>

<style scoped></style>
