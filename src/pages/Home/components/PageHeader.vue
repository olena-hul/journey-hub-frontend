<template>
  <div class="home-welcome-header">
    <span class="home-welcome-header-title"> JourneyHub </span>
    <div class="home-welcome-header-button-container">
      <PrimaryButton @click="() => (isLoginOpen = true)">Login</PrimaryButton>
      <PrimaryButton @click="() => (isSignUpOpen = true)">SignUp</PrimaryButton>
    </div>
    <SignInForm
      :is-open="isLoginOpen"
      :on-close="() => (isLoginOpen = false)"
    />
    <SignUpForm
      :is-open="isSignUpOpen"
      :on-close="() => (isSignUpOpen = false)"
    />
  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import SignInForm from "@/pages/Home/components/SignInForm.vue";
import SignUpForm from "@/pages/Home/components/SignUpForm.vue";

export default {
  name: "home-page-header",
  components: { SignUpForm, SignInForm, PrimaryButton },
  data: () => ({
    isLoginOpen: false,
    isSignUpOpen: false,
  }),
};
</script>

<style scoped></style>
