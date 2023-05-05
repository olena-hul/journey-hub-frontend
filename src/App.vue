<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "@/pages/Home/store/auth";
import { getUser } from "@/pages/Home/api";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { groupActivities } from "@/common/utils";
export default {
  name: "App",
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  created: function () {
    console.log("Starting connection to WebSocket Server");
    this.connection = new WebSocket("ws://localhost:8000/ws/");

    this.connection.onmessage = function (event) {
      const store = usePlanningStore();
      const data = JSON.parse(event.data);
      if (data.type === "trip_suggestion") {
        store.suggestionInProgress = false;
        store.plannedTrip = groupActivities(data.data);
        store.calculateExpenses();
      } else if (data.type === "image_ready") {
        const obj = store.plannedTrip[
          Object.keys(store.plannedTrip).find((date) =>
            store.plannedTrip[date].some(
              (item) => item.attraction_id === data.data.id
            )
          )
        ].find((item) => item.attraction_id === data.data.id);

        obj.image_urls = data.data.image_urls;
      }
    };

    this.connection.onopen = function (event) {
      console.log(event);
      console.log("Successfully connected to the echo websocket server...");
    };
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await getUser();
        if (!response.error) {
          this.authStore.user = response.data;
        }
      }
    });
  },
};
</script>
