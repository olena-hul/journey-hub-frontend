<template>
  <button class="button" @click="onClick && onClick()">
    <slot />
  </button>
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
  },
};
</script>

<style scoped></style>
