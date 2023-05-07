<template>
  <div class="profile-my-trip-card-small">
    <img :src="Paris" alt="Trip image" />
    <div class="profile-my-trip-card-small-content">
      <span> Trip to Paris</span>
      <div>
        <img :src="Calendar" alt="calendar icon" />
        <span>Mar 22 - May 23</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Paris from "@/assets/images/Paris.png";
import Calendar from "@/assets/images/CalendarGrey.svg";

export default defineComponent({
  name: "my-trip-card-small",
  data: () => ({
    Paris,
    Calendar,
  }),
  methods: {},
});
</script>

<style scoped></style>
