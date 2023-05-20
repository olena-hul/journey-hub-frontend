<script lang="ts">
import { defineComponent } from "vue";
import MyExcursionsCarousel from "@/pages/Profile/sections/Excursions/components/MyExcursionsCarousel.vue";
import ExcursionCard from "@/pages/Profile/sections/Excursions/components/ExcursionCard.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import CreateExcursionPopup from "@/pages/Profile/sections/Excursions/components/CreateExcursionPopup.vue";
import { useAuthStore } from "@/pages/Home/store/auth";

export default defineComponent({
  name: "my-excursions",
  components: {
    CreateExcursionPopup,
    PrimaryButton,
    ExcursionCard,
    MyExcursionsCarousel,
  },
  data() {
    return {
      authStore: useAuthStore(),
      tripsStore: useTripsStore(),
      createPopupOpen: false,
    };
  },
  props: {
    onViewClick: Function,
  },
});
</script>

<template>
  <h3>My excursions🏝</h3>
  <MyExcursionsCarousel :on-view-click="onViewClick" />
  <div class="profile-excursions-detail-header">
    <h4>Explore new</h4>
    <PrimaryButton
      v-if="authStore.user?.role == 3"
      @click="createPopupOpen = true"
    >
      Create
    </PrimaryButton>
  </div>
  <div class="profile-excursions-cards-container">
    <ExcursionCard
      :on-view-click="onViewClick"
      :key="excursion.id"
      v-for="excursion in tripsStore.excursions"
      :excursion="excursion"
    />
  </div>
  <CreateExcursionPopup
    :is-open="createPopupOpen"
    :on-close="() => (createPopupOpen = false)"
  />
</template>
<style scoped></style>
