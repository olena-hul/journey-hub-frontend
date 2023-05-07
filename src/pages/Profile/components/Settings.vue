<template>
  <div class="profile-settings">
    <h3>Edit your info</h3>
    <TextInput
      :input-props="{
        name: 'first name',
        type: 'text',
        placeholder: 'Enter first name',
      }"
      label-text="First name"
    ></TextInput>
    <TextInput
      :input-props="{
        name: 'last name',
        type: 'text',
        placeholder: 'Enter last name',
      }"
      label-text="Last name"
    ></TextInput>
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

    <div class="profile-settings-button">
      <PrimaryButton :input-props="{}"> Save </PrimaryButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

export default defineComponent({
  name: "ProfileSettings",
  components: { PrimaryButton, TextInput },
});
</script>

<style scoped></style>
