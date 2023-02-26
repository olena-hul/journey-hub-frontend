<template>
  <div class="home-benefits">
    <div class="home-benefits-why-choose-us">
      <div class="home-benefits-left">
        <img :src="Traveller" alt="Traveller" />
      </div>
      <div class="home-benefits-right">
        <h2 class="home-benefits-title">Why Choose Us?</h2>
        <span class="home-benefits-right-description"
          >By choosing our website your trip planning process will change
          significantly. You’ll practice your best experience ever and wonder
          about the wide range of functionality and opportunities the website
          provides</span
        >
        <div class="home-benefits-right-digits">
          <div
            class="home-benefits-right-digits-item"
            :key="digit.number"
            v-for="digit in digitsData"
          >
            <span class="home-benefits-right-digits-item-number">
              {{ digit.number }}+
            </span>
            <span class="home-benefits-right-digits-item-label">
              {{ digit.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <h2 class="home-benefits-title home-benefits-center-title">
      Experience of Our Customers
    </h2>
    <div class="home-benefits-card-container">
      <FeedbackCard v-bind:key="num" v-for="num in 3">
        {{ num }}
      </FeedbackCard>
    </div>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import Traveller from "@/assets/images/Traveller.png";
import FeedbackCard from "@/pages/Home/components/FeedbackCard.vue";

const digitsData = [
  {
    number: 500,
    label: "Destinations",
  },
  {
    number: 30,
    label: "Countries",
  },
  {
    number: 1000,
    label: "Places to visit",
  },
];

export default {
  name: "home-benefits",
  components: { FeedbackCard },
  data() {
    return {
      Traveller,
      digitsData,
    };
  },
};
</script>

<style scoped></style>
