<script setup lang="ts">
interface Props {
  excursion: Excursion;
  onViewClick: typeof Function;
}

defineProps<Props>();
</script>
<script lang="ts">
import { defineComponent } from "vue";
import Customer3 from "@/assets/images/Customer3.png";
import { formatDateDDMM } from "@/pages/Planning/utils";
import Calendar from "@/assets/images/CalendarGrey.svg";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import type { Excursion } from "@/pages/Profile/api";

export default defineComponent({
  name: "ExcursionCard",
  components: { PrimaryButton },
  props: {
    onViewClick: Function,
  },
  data() {
    return {
      Customer3,
      Calendar,
      tripsStore: useTripsStore(),
    };
  },
  methods: {
    formatDateDDMM,
    onExcursionClick(excursion: Excursion) {
      this.tripsStore.excursion = excursion;
      this.onViewClick && this.onViewClick();
    },
  },
});
</script>

<template>
  <div class="profile-excursions-card">
    <div class="profile-excursions-card-left">
      <div class="profile-excursions-card-left-header">
        <h3>{{ this.excursion.name }}</h3>
        <div class="profile-my-trips-carousel-item-dates">
          <img :src="Calendar" alt="calendar icon" />
          <span>{{ formatDateDDMM(excursion.date as string) }} </span>
        </div>
      </div>

      <div class="profile-right-aside-profile">
        <img :src="Customer3" alt="Profile image" />
        <div class="profile-right-aside-profile-name">
          <span>
            {{ excursion.guide.first_name }}
            {{ excursion.guide.last_name }}</span
          >
          <span> Guide </span>
        </div>
      </div>

      <p class="profile-excursions-card-left-description">
        {{ excursion.description }}
      </p>
    </div>
    <div class="profile-excursions-card-right">
      <img
        :src="
          excursion.excursion_attractions.at(0)?.attraction.image_urls.at(0)
        "
        alt="Excursion image"
      />
      <PrimaryButton @click="() => onExcursionClick(excursion)"
        >View more
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped></style>
