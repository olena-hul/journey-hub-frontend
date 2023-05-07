<script lang="ts">
import { defineComponent } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useMap } from "@/pages/Planning/map";
import MyTripsCarousel from "@/pages/Profile/components/MyTripsCarousel.vue";
import TripDaysChart from "@/pages/Profile/components/TripDaysChart.vue";
import TotalExpensesChart from "@/pages/Profile/components/TotalExpensesChart.vue";

export default defineComponent({
  name: "MyTrips",
  components: { TotalExpensesChart, TripDaysChart, MyTripsCarousel },
  data() {
    return {
      map: Object,
      mapHook: useMap(),
    };
  },
  props: {
    onViewClick: Function,
  },
  mounted() {
    navigator.geolocation.getCurrentPosition((location) => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        version: "quarterly",
      });

      loader.load().then(() => {
        this.map = this.mapHook.initMap(
          location.coords.latitude,
          location.coords.longitude,
          "visited-places-map"
        ) as any;
      });
    });
  },
});
</script>

<template>
  <h3>Your visited places🏝</h3>
  <div id="visited-places-map" class="profile-my-trips-map"></div>
  <MyTripsCarousel :on-view-click="onViewClick" />
  <h4>Your days in trips by month</h4>
  <TripDaysChart :days-in-trips="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" />
  <div class="profile-my-trips-expenses-chart">
    <h4>Your total expenses in trips</h4>
    <TotalExpensesChart :expenses="[1, 2, 3, 4, 5, 6]" />
  </div>
</template>

<style scoped></style>
