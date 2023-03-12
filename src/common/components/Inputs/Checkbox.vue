<template>
  <label class="inputs-checkbox-label">
    <input type="checkbox" :checked="checked" />
    <span class="checkmark">Remember me</span>
  </label>
</template>

<script lang="ts">
import "./index.scss";

export default {
  name: "checkbox-input",
  props: {
    checked: Boolean,
  },
};
</script>

<style scoped></style>
