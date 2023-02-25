<template>
  <div class="home-footer">
    <div class="home-footer-container">
      <div class="home-footer-container-left">
        <span class="home-footer-container-left-title">JourneyHub</span>
        <span
          >Use these social media to contact us - we are always open to
          feedback</span
        >
        <div class="home-footer-container-left-images">
          <img alt="Facebook icon" :src="Facebook" />
          <img alt="Instagram icon" :src="Instagram" />
        </div>
      </div>
      <div class="home-footer-container-right">
        <span> Get in touch </span>
        <span>Tourplan1234@gmail.com</span>
        <span>+925874123696</span>
      </div>
    </div>

    <div class="home-footer-copyright">
      <img alt="Copyright" :src="Copyright" />
      <span>Copyright. All right reseved.</span>
    </div>
  </div>
</template>

<script>
import "./index.scss";
import Facebook from "@/assets/images/Facebook.svg";
import Instagram from "@/assets/images/Instagram.svg";
import Copyright from "@/assets/images/Copyright.svg";

export default {
  name: "home-footer",
  data: () => ({
    Facebook,
    Instagram,
    Copyright,
  }),
};
</script>

<style scoped></style>
