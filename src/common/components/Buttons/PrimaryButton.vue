<template>
  <FormKit
    :input-class="`${className} button`"
    v-bind="inputProps"
    type="button"
    @click="onClick && onClick()"
  >
    <slot />
  </FormKit>
</template>

<script lang="ts">
import "./index.scss";
export default {
  name: "primary-button",
  props: {
    onClick: {
      type: Function,
      required: false,
    },
    className: String,
    inputProps: Object,
  },
};
</script>

<style scoped></style>
