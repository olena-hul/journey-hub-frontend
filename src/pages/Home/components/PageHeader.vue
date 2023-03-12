<template>
  <AlertComponent v-if="alertMessage" type="danger" :message="alertMessage" />
  <div class="home-welcome-header">
    <span class="home-welcome-header-title"> JourneyHub </span>
    <div class="home-welcome-header-button-container">
      <PrimaryButton @click="() => (isLoginOpen = true)">Login</PrimaryButton>
      <PrimaryButton @click="() => (isSignUpOpen = true)">SignUp</PrimaryButton>
    </div>
    <SignInForm
      :open-sign-up-popup="openSignUpPopup"
      :set-alert-message="setAlertMessage"
      :is-open="isLoginOpen"
      :on-close="() => (isLoginOpen = false)"
    />
    <SignUpForm
      :open-sign-in-popup="openLoginPopup"
      :set-alert-message="setAlertMessage"
      :is-open="isSignUpOpen"
      :on-close="() => (isSignUpOpen = false)"
    />
  </div>
</template>

<script lang="ts">
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import SignInForm from "@/pages/Home/components/SignInForm.vue";
import SignUpForm from "@/pages/Home/components/SignUpForm.vue";
import AlertComponent from "@/common/components/Alerts/index.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "home-page-header",
  components: { AlertComponent, SignUpForm, SignInForm, PrimaryButton },
  data: () => ({
    isLoginOpen: false,
    isSignUpOpen: false,
    alertMessage: null as string | null,
  }),
  methods: {
    setAlertMessage(value: string | null) {
      this.alertMessage = value;
    },
    openLoginPopup() {
      this.isSignUpOpen = false;
      this.isLoginOpen = true;
    },
    openSignUpPopup() {
      this.isLoginOpen = false;
      this.isSignUpOpen = true;
    },
  },
});
</script>

<style scoped></style>
