<template>
  <div class="planning-daily-activity">
    <div class="planning-daily-activity-date-container">
      <h4 class="planning-daily-activity-date-container-day-number">
        Day {{ dayNumber }}
      </h4>
      <span class="planning-daily-activity-date-container-day">
        ({{ formatDate(addDays(day, dayNumber)) }})</span
      >
    </div>
    <div class="planning-daily-activity-card">
      <img
        :src="Museum"
        alt="Attraction icon"
        class="planning-daily-activity-card-icon"
      />
      <div class="planning-daily-activity-card-center">
        <h4>Lovre Museum</h4>
        <div class="planning-daily-activity-card-center-details">
          <img :src="Clock" alt="clock icon" />
          <span> 2 hours </span>
          <img :src="Price" alt="price icon" />
          <span> 17 $</span>
        </div>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
          velit nec nisl eleifend rutrum. Aliquam erat eros, dignissim vitae
          auctor vel, consectetur et ligula. Etiam mollis quis ante eu rutrum.
          Vivamus faucibus odio sodales urna venenatis malesuada.
        </span>
      </div>
      <img
        :src="Lovre"
        alt="Attraction image"
        class="planning-daily-activity-card-attraction-image"
      />
    </div>
    <img
      :src="RemoveIcon"
      class="planning-daily-activity-remove"
      alt="Remove icon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate } from "@/common/utils";
import Museum from "@/assets/images/museum.png";
import Clock from "@/assets/images/clock.png";
import Price from "@/assets/images/price-tag.png";
import Lovre from "@/assets/images/Lovre.png";
import RemoveIcon from "@/assets/images/cross.png";
import { addDays } from "../utils";

export default defineComponent({
  name: "DailyActivities",
  methods: { addDays, formatDate },
  props: {
    dayNumber: Number,
    day: Date,
    attractionData: Object,
  },
  data: () => ({
    Museum,
    Clock,
    Price,
    Lovre,
    RemoveIcon,
  }),
});
</script>

<style scoped></style>
