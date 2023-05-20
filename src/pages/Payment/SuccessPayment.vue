<script lang="ts">
import { defineComponent } from "vue";
import SuccessIcon from "@/assets/images/checked.png";
import "./index.scss";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

export default defineComponent({
  name: "SuccessPayment",
  components: { PrimaryButton },
  data() {
    return {
      SuccessIcon,
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
    <h2>Your payment was successful</h2>
    <img :src="SuccessIcon" alt="Success icon" />
    <PrimaryButton @click="onBackClick"> Back to site</PrimaryButton>
  </div>
</template>

<style scoped></style>
