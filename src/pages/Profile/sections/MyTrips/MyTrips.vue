<script lang="ts">
import { defineComponent } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useMap } from "@/pages/Planning/map";
import MyTripsCarousel from "@/pages/Profile/sections/MyTrips/MyTripsCarousel.vue";
import TripDaysChart from "@/pages/Profile/sections/MyTrips/TripDaysChart.vue";
import TotalExpensesChart from "@/pages/Profile/sections/MyTrips/TotalExpensesChart.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";

export default defineComponent({
  name: "MyTrips",
  components: { TotalExpensesChart, TripDaysChart, MyTripsCarousel },
  data() {
    return {
      map: Object,
      mapHook: useMap(),
      tripsStore: useTripsStore(),
    };
  },
  props: {
    onViewClick: Function,
  },
  computed: {
    visitedPlaces() {
      return this.tripsStore.visitedPlaces;
    },
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          version: "quarterly",
        });

        loader.load().then(() => {
          this.map = this.mapHook.initMap(
            location.coords.latitude,
            location.coords.longitude,
            "visited-places-map",
            5
          ) as any;
        });
      },
      () => {
        const loader = new Loader({
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          version: "quarterly",
        });

        loader.load().then(() => {
          this.map = this.mapHook.initMap(
            49.842957,
            24.031111,
            "visited-places-map",
            3
          ) as any;
        });
      }
    );
  },
  watch: {
    visitedPlaces(newValue) {
      if (newValue) {
        this.mapHook.addVisitedPlacesMarkers(newValue);
      }
    },
  },
});
</script>

<template>
  <h3>Your visited places🏝</h3>
  <div id="visited-places-map" class="profile-my-trips-map"></div>
  <MyTripsCarousel :on-view-click="onViewClick" />
  <h4>Your days in trips by month</h4>
  <TripDaysChart :days-in-trips="Object.values(this.tripsStore.daysInTrips)" />
  <div class="profile-my-trips-expenses-chart">
    <h4>Your total expenses in trips</h4>
    <TotalExpensesChart
      :expenses="Object.values(this.tripsStore.tripExpenses)"
    />
  </div>
</template>

<style scoped></style>
