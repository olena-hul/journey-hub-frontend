<script lang="ts">
import { defineComponent } from "vue";
import MyExcursionsCarousel from "@/pages/Profile/sections/Excursions/components/MyExcursionsCarousel.vue";
import ExcursionCard from "@/pages/Profile/sections/Excursions/components/ExcursionCard.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";

export default defineComponent({
  name: "my-excursions",
  components: { ExcursionCard, MyExcursionsCarousel },
  data() {
    return {
      tripsStore: useTripsStore(),
    };
  },
});
</script>

<template>
  <h3>My excursions🏝</h3>
  <MyExcursionsCarousel />
  <h4>Explore new</h4>
  <div class="profile-excursions-cards-container">
    <ExcursionCard
      :key="excursion.id"
      v-for="excursion in tripsStore.excursions"
      :excursion="excursion"
    />
  </div>
</template>
<style scoped></style>
