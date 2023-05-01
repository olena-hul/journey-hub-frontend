<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useAuthStore } from "@/pages/Home/store/auth";
import { getUser } from "@/pages/Home/api";
export default {
  name: "App",
  data() {
    return {
      authStore: useAuthStore(),
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
