<template>
  <div class="profile-settings">
    <AlertComponent v-if="alertMessage" type="info" :message="alertMessage" />
    <h3>Edit your info</h3>
    <TextInput
      v-model="userForm.first_name"
      :input-props="{
        name: 'first name',
        type: 'text',
        placeholder: 'Enter first name',
      }"
      label-text="First name"
    ></TextInput>
    <TextInput
      v-model="userForm.last_name"
      :input-props="{
        name: 'last name',
        type: 'text',
        placeholder: 'Enter last name',
      }"
      label-text="Last name"
    ></TextInput>
    <TextInput
      v-model="userForm.email"
      :input-props="{
        name: 'email',
        type: 'email',
        placeholder: 'Email address',
        validation: 'required|email',
      }"
      label-text="Email Address"
    ></TextInput>
    <TextInput
      v-model="userForm.password"
      :input-props="{
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        validation: 'required|length:8',
      }"
      label-text="Password"
    ></TextInput>

    <div class="profile-settings-button">
      <PrimaryButton @click="onSaveClicked"> Save</PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { useAuthStore } from "@/pages/Home/store/auth";
import AlertComponent from "@/common/components/Alerts/index.vue";

export default defineComponent({
  name: "ProfileSettings",
  components: { AlertComponent, PrimaryButton, TextInput },
  data() {
    return {
      authStore: useAuthStore(),
      userForm: {
        first_name: "" || useAuthStore().user?.first_name,
        last_name: "" || useAuthStore().user?.last_name,
        email: "" || useAuthStore().user?.email,
        password: "" || useAuthStore().user?.password,
      },
      alertMessage: null as string | null,
    };
  },
  computed: {
    user() {
      return this.authStore.user;
    },
  },
  methods: {
    async onSaveClicked() {
      await this.authStore.updateUser({
        first_name: this.userForm.first_name,
        last_name: this.userForm.last_name,
        email: this.userForm.email,
        ...(this.userForm.password ? { password: this.userForm.password } : {}),
      });
      if (
        this.userForm.email !== this.authStore.user?.email ||
        this.userForm.password
      ) {
        this.alertMessage =
          "You will be logged out to sign in with new credentials";
        setTimeout(async () => {
          await this.authStore.logout();
        }, 2000);
        return;
      }
      this.alertMessage = "User was updated successfully";
      setTimeout(() => {
        this.alertMessage = null;
      }, 2000);
    },
  },

  watch: {
    user(newValue) {
      this.userForm = newValue;
    },
  },
});
</script>

<style scoped></style>
