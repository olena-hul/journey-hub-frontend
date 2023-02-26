<template>
  <WelcomeScreen />
  <OurServices />
  <PopularPlaces />
  <HomeBenefits />
  <HomeFooter />
</template>

<script lang="ts">
import "./index.scss";
import OurServices from "@/pages/Home/sections/Services/index.vue";
import WelcomeScreen from "@/pages/Home/sections/Welcome/index.vue";
import PopularPlaces from "@/pages/Home/sections/PopularPlaces/index.vue";
import HomeBenefits from "@/pages/Home/sections/Benefits/index.vue";
import HomeFooter from "@/pages/Home/sections/Footer/index.vue";

export default {
  name: "home-page",
  components: {
    HomeBenefits,
    HomeFooter,
    PopularPlaces,
    WelcomeScreen,
    OurServices,
  },
};
</script>

<style scoped></style>
