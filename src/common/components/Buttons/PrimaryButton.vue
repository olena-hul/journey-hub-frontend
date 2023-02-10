<template>
  <button class="button" @click="onClick">
    <slot />
  </button>
</template>

<script>
import "./index.scss";
export default {
  name: "primary-button",
  props: {
    text: String,
    onClick: Function,
  },
};
</script>

<style scoped></style>
