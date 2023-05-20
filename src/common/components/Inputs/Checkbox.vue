<template>
  <label class="inputs-checkbox-label">
    <input @click="onClick" type="checkbox" :checked="checked" />
    <span class="checkmark">{{ labelText }}</span>
  </label>
</template>

<script lang="ts">
import "./index.scss";

export default {
  name: "checkbox-input",
  props: {
    checked: Boolean,
    labelText: String,
    onClick: Function,
  },
};
</script>

<style scoped></style>
