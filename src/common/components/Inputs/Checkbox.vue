<template>
  <label class="inputs-checkbox-label">
    <FormKit type="checkbox" checked="checked" />
    <span class="checkmark">Remember me</span>
  </label>
</template>

<script lang="ts">
import "./index.scss";
import { FormKit } from "@formkit/vue";

export default {
  name: "checkbox-input",
  components: {
    FormKit,
  },
};
</script>

<style scoped></style>
