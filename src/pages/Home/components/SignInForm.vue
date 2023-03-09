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
        <span>Register</span>
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
          validation: 'required|length:2',
        }"
        label-text="Password"
      ></TextInput>
      <div class="home-welcome-auth-save-forgot-password-container">
        <CheckboxInput />
        <span>Forgot password?</span>
      </div>
      <PrimaryButton type="submit" class-name="home-welcome-auth-button">
        Sign In
      </PrimaryButton>

      <div class="home-welcome-auth-center-container">
        <span>Or login with</span>
        <img :src="GmailIcon" alt="Gmail icon" />
      </div>
    </form>
  </OverlayPopup>
</template>

<script lang="ts">
import OverlayPopup from "@/common/components/Popup/index.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import CheckboxInput from "@/common/components/Inputs/Checkbox.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import GmailIcon from "@/assets/images/Gmail.svg";
import { login } from "@/pages/Home/api";
import type { SignInInput } from "@/pages/Home/api";
import { defineComponent } from "vue";

export default defineComponent({
  name: "sign-in-form",
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
  data() {
    return {
      GmailIcon,
      formData: { email: "", password: "" } as SignInInput,
    };
  },

  methods: {
    async submitLogin() {
      const resp = await login(this.formData);
    },
  },
});
</script>

<style scoped></style>
