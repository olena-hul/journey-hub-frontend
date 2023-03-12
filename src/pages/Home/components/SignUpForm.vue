<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="home-welcome-auth-sign-up"
  >
    <form @submit.prevent="submitSignUp">
      <h2>Create Account</h2>
      <div class="home-welcome-auth-account-question">
        <span>Sign up with your email for registration</span>
      </div>
      <div class="home-welcome-auth-sign-up-names">
        <TextInput
          v-model="formData.first_name"
          :input-props="{
            type: 'text',
            placeholder: 'First name',
            validation: 'required',
            name: 'First name',
          }"
          label-text="First name"
        ></TextInput>
        <TextInput
          v-model="formData.last_name"
          :input-props="{
            type: 'text',
            placeholder: 'Last name',
            validation: 'required',
            name: 'Last name',
          }"
          label-text="Last name"
        ></TextInput>
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
      <PrimaryButton
        type="submit"
        class-name="home-welcome-auth-button"
        :input-props="{
          disabled: submitDisabled || !this.formValid(),
        }"
      >
        Sign Up
      </PrimaryButton>
      <div class="home-welcome-auth-center-container">
        <span>Or login with</span>
        <img @click="googleSignIn" :src="GmailIcon" alt="Gmail icon" />
      </div>
      <div class="home-welcome-auth-center-container">
        <span>Already have an account?</span>
        <span @click="openSignInPopup">Sign in</span>
      </div>
    </form>
  </OverlayPopup>
</template>

<script lang="ts">
import OverlayPopup from "@/common/components/Popup/index.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import GmailIcon from "@/assets/images/Gmail.svg";
import type { SignUpInput } from "@/pages/Home/api";
import { defineComponent } from "vue";
import router from "@/router";
import { useAuthStore } from "@/pages/Home/store/auth";

export default defineComponent({
  name: "sign-up-form",
  components: {
    PrimaryButton,
    TextInput,
    OverlayPopup,
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
    setAlertMessage: Function,
    openSignInPopup: Function,
  },
  data: () => ({
    GmailIcon,
    formData: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "USER",
    } as SignUpInput,
    store: useAuthStore(),
    submitDisabled: false,
  }),
  methods: {
    formValid() {
      return Object.values(this.formData).every((value) => value !== "");
    },
    showErrorAlert(error: string) {
      this.setAlertMessage && this.setAlertMessage(error);
      setTimeout(() => {
        this.setAlertMessage && this.setAlertMessage(null);
      }, 3000);
    },
    setSubmitDisabled(value: boolean) {
      this.submitDisabled = value;
    },
    async submitSignUp() {
      this.setSubmitDisabled(true);
      const { error: signUpError } = await this.store.signUp(this.formData);
      if (signUpError) {
        this.setSubmitDisabled(false);
        this.showErrorAlert(signUpError);
        return;
      }
      const { error: signInError } = await this.store.login(this.formData);
      if (signInError) {
        this.setSubmitDisabled(false);
        this.showErrorAlert(signInError);
        return;
      }
      await router.push("/profile");
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
      await router.push("/profile");
    },
  },
});
</script>

<style scoped></style>
