<template>
  <h3>Hello, {{ authStore.user?.first_name }}👋</h3>
  <span class="profile-main-content-explore-message"
    >Welcome back and explore the world!</span
  >
  <DestinationForm />
  <div class="profile-main-content-top-destinations-container">
    <TopDestinationsCarousel />
  </div>
  <TopPlacesCarousel title="Top attractions for you" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopPlacesCarousel from "@/pages/Planning/components/Carousel.vue";
import TopDestinationsCarousel from "@/pages/Profile/sections/Homepage/TopDestinationsCarousel.vue";
import DestinationForm from "@/pages/Home/components/DestinationForm.vue";
import { useAuthStore } from "@/pages/Home/store/auth";

export default defineComponent({
  name: "profile-homepage",
  components: { DestinationForm, TopDestinationsCarousel, TopPlacesCarousel },
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
});
</script>

<style scoped></style>
