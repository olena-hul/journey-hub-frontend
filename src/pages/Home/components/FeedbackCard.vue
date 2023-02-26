<template>
  <div class="home-benefits-card">
    <img alt="Customer" :src="Customer1" />
    <div class="home-benefits-card-content-container">
      <span class="home-benefits-card-title">Morich Brown</span>
      <div class="home-benefits-card-content-rating">
        <img :src="StarPentagon" alt="Rating" />
        <span class="home-benefits-card-content">(4.5)</span>
      </div>
      <span class="home-benefits-card-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium
        sceleri sque....</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import StarPentagon from "@/assets/images/StarPentagon.svg";
import Customer1 from "@/assets/images/Customer1.png";

export default {
  name: "feedback-card",
  props: {
    name: String,
  },
  data: function () {
    return {
      StarPentagon,
      Customer1,
    };
  },
};
</script>

<style scoped></style>
