<template>
  <button
    :class="
      isActive
        ? 'home-popular-places-navigation-button'
        : 'home-popular-places-navigation-button-inactive'
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
