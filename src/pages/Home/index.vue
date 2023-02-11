<template>
  <WelcomeScreen />
  <OurServices />
</template>

<script>
import "./index.scss";
import OurServices from "@/pages/Home/sections/Services/index.vue";
import WelcomeScreen from "@/pages/Home/sections/Welcome/index.vue";

export default {
  name: "home-page",
  components: {
    WelcomeScreen,
    OurServices,
  },
};
</script>

<style scoped></style>
