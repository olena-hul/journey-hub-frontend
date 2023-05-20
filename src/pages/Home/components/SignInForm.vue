<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="home-welcome-auth"
  >
    <form @submit.prevent="submitLogin">
      <h2>Login</h2>
      <div class="home-welcome-auth-account-question">
        <span>Do not have an account?</span>
        <span @click="openSignUpPopup">Register</span>
      </div>
      <TextInput
        v-model="formData.email"
        :input-props="{
          name: 'email',
          type: 'email',
          placeholder: 'Email address',
          validation: 'required|email',
        }"
        label-text="Email Address"
      ></TextInput>
      <TextInput
        v-model="formData.password"
        :input-props="{
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          validation: 'required|length:8',
        }"
        label-text="Password"
      ></TextInput>
      <div class="home-welcome-auth-save-forgot-password-container">
        <span>Forgot password?</span>
      </div>
      <PrimaryButton
        type="submit"
        class-name="home-welcome-auth-button"
        :input-props="{
          disabled: submitDisabled || !this.formValid(),
        }"
      >
        Sign In
      </PrimaryButton>

      <div class="home-welcome-auth-center-container">
        <span>Or login with</span>
        <img :src="GmailIcon" alt="Gmail icon" @click="googleSignIn" />
      </div>
    </form>
  </OverlayPopup>
</template>

<script lang="ts">
import OverlayPopup from "@/common/components/Popup/index.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import GmailIcon from "@/assets/images/Gmail.svg";
import type { SignInInput } from "@/pages/Home/api";
import { defineComponent } from "vue";
import { useAuthStore } from "@/pages/Home/store/auth";
import router from "@/router";
import { useTripsStore } from "@/pages/Profile/store/trips";

export default defineComponent({
  name: "sign-in-form",
  components: {
    PrimaryButton,
    TextInput,
    OverlayPopup,
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
    setAlertMessage: Function,
    openSignUpPopup: Function,
    stayOnPage: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      GmailIcon,
      formData: { email: "", password: "" } as SignInInput,
      store: useAuthStore(),
      submitDisabled: false,
      tripsStore: useTripsStore(),
    };
  },

  methods: {
    formValid() {
      return Object.values(this.formData).every((value) => value !== "");
    },
    setSubmitDisabled(value: boolean) {
      this.submitDisabled = value;
    },
    async submitLogin() {
      this.setSubmitDisabled(true);
      const { error } = await this.store.login(this.formData);
      this.setSubmitDisabled(false);
      if (error) {
        this.setAlertMessage && this.setAlertMessage(error);
        setTimeout(() => {
          this.setAlertMessage && this.setAlertMessage(null);
        }, 2000);
        return;
      }
      if (!this.stayOnPage) {
        await router.push("/profile");
      }
    },
    async googleSignIn() {
      this.setSubmitDisabled(true);
      const { error } = await this.store.googleAuth();
      this.setSubmitDisabled(false);
      if (error) {
        this.setAlertMessage && this.setAlertMessage(error);
        setTimeout(() => {
          this.setAlertMessage && this.setAlertMessage(null);
        }, 2000);
        return;
      }
      if (!this.stayOnPage) {
        await router.push("/profile");
      }
    },
  },
  computed: {
    user() {
      return this.store.user;
    },
  },
  watch: {
    async user(newValue) {
      if (!newValue.id) {
        return;
      }
      await Promise.all([
        this.tripsStore.getMyTrips(),
        this.tripsStore.getVisitedPlaces(),
        this.tripsStore.getDaysInTrips(),
        this.tripsStore.getTripExpenses(),
        this.tripsStore.getExcursionBookings(newValue.id),
        this.tripsStore.getExcursions(),
      ]);
    },
  },
});
</script>

<style scoped></style>
