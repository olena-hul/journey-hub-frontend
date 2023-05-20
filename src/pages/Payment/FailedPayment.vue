<script lang="ts">
import { defineComponent } from "vue";
import FailedIcon from "@/assets/images/cancel.png";
import "./index.scss";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

export default defineComponent({
  name: "FailedPayment",
  components: { PrimaryButton },
  data() {
    return {
      FailedIcon,
    };
  },
  methods: {
    onBackClick() {
      window.location.href = "/profile#Excursions";
    },
  },
});
</script>

<template>
  <div class="payment">
    <h2>Your payment was failed</h2>
    <img :src="FailedIcon" alt="Success icon" />
    <PrimaryButton @click="onBackClick"> Back to site</PrimaryButton>
  </div>
</template>

<style scoped></style>
