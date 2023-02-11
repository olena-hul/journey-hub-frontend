<template>
  <div class="home-welcome-header">
    <span class="home-welcome-header-title"> JourneyHub </span>
    <div class="home-welcome-header-button-container">
      <PrimaryButton>Login</PrimaryButton>
      <PrimaryButton>SignUp</PrimaryButton>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

export default {
  name: "home-page-header",
  components: { PrimaryButton },
};
</script>

<style scoped></style>
