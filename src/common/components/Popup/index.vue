<template>
  <div class="overlay" v-if="isVisible">
    <div
      :class="className ? `${className} overlay-content` : 'overlay-content'"
    >
      <button class="close-button" @click="onClose">
        <img :src="CloseIcon" alt="Close icon" />
      </button>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import CloseIcon from "@/assets/images/CloseIcon.svg";
import "./index.scss";

export default {
  name: "overlay-popup",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    className: String,
  },
  data: () => ({
    CloseIcon,
  }),
};
</script>

<style scoped></style>
