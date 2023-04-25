<template>
  <div id="map" class="planning-map"></div>
</template>

<script lang="ts">
import { Loader } from "@googlemaps/js-api-loader";
import { defineComponent } from "vue";
import { initMap } from "@/pages/Planning/utils";
import { useDestinationStore } from "@/pages/Home/store/destinations";

export default defineComponent({
  name: "google-map",
  data() {
    return {
      store: useDestinationStore(),
    };
  },
  props: {
    latitude: Number,
    longitude: Number,
  },
  mounted() {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      version: "quarterly",
    });
    console.log(this.store.selectedDestination);

    loader.load().then(() => {
      initMap(this.latitude, this.longitude);
    });
  },
});
</script>
