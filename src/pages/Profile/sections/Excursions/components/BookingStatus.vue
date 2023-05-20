<script lang="ts">
import { defineComponent } from "vue";
import "../../../index.scss";

export default defineComponent({
  name: "BookingStatus",
  props: {
    status: String,
  },
  data() {
    return {
      statuses: {
        paid: {
          title: "Paid",
          className: "success",
        },
        new: {
          title: "Waiting for payment",
          className: "new",
        },
        failed: {
          title: "Payment failed",
          className: "failed",
        },
      },
    };
  },
});
</script>

<template>
  <div :class="`profile-excursions-status-chip-${statuses[status].className}`">
    {{ statuses[status].title }}
  </div>
</template>

<style scoped></style>
