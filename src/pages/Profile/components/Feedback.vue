<script lang="ts">
import { defineComponent } from "vue";
import Customer3 from "@/assets/images/Customer3.png";
import Star from "@/assets/images/StarPentagon.svg";

export default defineComponent({
  name: "CustomFeedback",
  data() {
    return {
      Customer3,
      Star,
    };
  },
  props: {
    feedback: Object,
  },
});
</script>

<template>
  <div class="profile-attraction-detail-feedback-card">
    <div class="profile-attraction-detail-feedback-card-content">
      <img :src="Customer3" />
      <div>
        <div>
          {{ feedback.user.first_name }} {{ feedback.user.last_name }}
          <img :src="Star" />
          {{ feedback.value }}
        </div>
        <p>
          {{ feedback.feedback }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
