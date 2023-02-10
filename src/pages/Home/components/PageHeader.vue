<template>
  <div class="home-header">
    <span class="home-header-title"> JourneyHub </span>
    <div class="home-header-button-container">
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
