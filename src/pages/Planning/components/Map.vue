<template>
  <div id="map" class="planning-map"></div>
</template>

<script lang="ts">
import { Loader } from "@googlemaps/js-api-loader";
import { defineComponent } from "vue";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { useMap } from "@/pages/Planning/map";

export default defineComponent({
  name: "google-map",
  data() {
    return {
      store: useDestinationStore(),
      planningStore: usePlanningStore(),
      markers: [],
      map: Object,
      mapHook: useMap(),
    };
  },
  props: {
    latitude: Number,
    longitude: Number,
  },
  computed: {
    attractions() {
      return this.planningStore.attractions;
    },
  },
  watch: {
    attractions(newValue) {
      if (newValue) {
        this.mapHook.addMarkers(this.attractions);
      }
    },
  },
  mounted() {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      version: "quarterly",
    });

    loader.load().then(() => {
      if (this.latitude && this.longitude) {
        this.map = this.mapHook.initMap(this.latitude, this.longitude) as any;
      }
      if (this.planningStore.attractions) {
        this.mapHook.addMarkers(this.planningStore.attractions);
      }
    });
  },
});
</script>
