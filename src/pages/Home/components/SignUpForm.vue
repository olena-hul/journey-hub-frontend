<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="home-welcome-auth-sign-up"
  >
    <h2>Create Account</h2>
    <div class="home-welcome-auth-account-question">
      <span>Sign up with your email for registration</span>
    </div>
    <div class="home-welcome-auth-sign-up-names">
      <TextInput
        :input-props="{
          type: 'text',
          placeholder: 'First name',
        }"
        label-text="Email Address"
      ></TextInput>
      <TextInput
        :input-props="{
          type: 'text',
          placeholder: 'Last name',
        }"
        label-text="Last name"
      ></TextInput>
    </div>
    <TextInput
      :input-props="{
        name: 'email',
        type: 'email',
        placeholder: 'Email address',
        validation: 'required|email',
      }"
      label-text="Email Address"
    ></TextInput>
    <TextInput
      :input-props="{
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        validation: 'required|length:8',
      }"
      label-text="Password"
    ></TextInput>
    <PrimaryButton class="home-welcome-auth-button"> Sign Up </PrimaryButton>
    <div class="home-welcome-auth-center-container">
      <span>Or login with</span>
      <img :src="GmailIcon" alt="Gmail icon" />
    </div>
    <div class="home-welcome-auth-center-container">
      <span>Already have an account?</span>
      <span>Sign in</span>
    </div>
  </OverlayPopup>
</template>

<script lang="ts">
import OverlayPopup from "@/common/components/Popup/index.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import CheckboxInput from "@/common/components/Inputs/Checkbox.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import GmailIcon from "@/assets/images/Gmail.svg";

export default {
  name: "sign-up-form",
  components: {
    PrimaryButton,
    CheckboxInput,
    TextInput,
    OverlayPopup,
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
  },
  data: () => ({
    GmailIcon,
  }),
};
</script>

<style scoped></style>
