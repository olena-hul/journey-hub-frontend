<template>
  <button
    :class="
      isActive
        ? 'carousel-navigation-button'
        : 'carousel-navigation-button-inactive'
    "
  >
    <img
      :src="direction === 'right' ? rightArrow : leftArrow"
      alt="Direction icon"
    />
  </button>
</template>

<script lang="ts">
import RightArrow from "@/assets/images/RightArrow.svg";
import LeftArrow from "@/assets/images/LeftArrow.svg";
import "./index.scss";

export default {
  name: "navigation-button",
  data: function () {
    return {
      rightArrow: RightArrow,
      leftArrow: LeftArrow,
    };
  },
  props: {
    isActive: Boolean,
    direction: String,
  },
};
</script>

<style scoped></style>
