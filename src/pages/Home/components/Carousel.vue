<template>
  <div class="home-popular-places-navigation-button-container">
    <NavigationButton
      @click="prevSlide"
      direction="left"
      :disabled="leftDisabled"
      :isActive="isLeftActive"
    />
    <NavigationButton
      @click="nextSlide"
      direction="right"
      :disabled="rightDisabled"
      :isActive="isRightActive"
    />
  </div>

  <div class="home-popular-places-carousel">
    <transition-group name="slide" ref="carousel-items">
      <slot />
    </transition-group>
  </div>
</template>

<script>
import NavigationButton from "@/pages/Home/components/NavigationButton.vue";
import { store } from "@/pages/Home/store";

export default {
  name: "PlacesImagesCarousel",
  components: { NavigationButton },
  data: function () {
    return {
      store,
      leftDisabled: true,
      rightDisabled: false,
      isLeftActive: false,
      isRightActive: true,
    };
  },

  methods: {
    elementVisible(index) {
      const items = document.getElementsByClassName(
        "home-popular-places-carousel-item"
      );
      console.log(items);
      const element = items[index];
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    },
    isLastItemOnViewPort() {
      return this.elementVisible(this.store.carouselItems.length - 1);
    },
    isSecondLastItemOnViewPort() {
      return this.elementVisible(this.store.carouselItems.length - 2);
    },
    disableButtons() {
      this.leftDisabled = true;
      this.rightDisabled = true;
    },
    enableButtons() {
      this.leftDisabled = false;
      this.rightDisabled = false;
    },

    prevSlide() {
      this.disableButtons();
      this.isRightActive = true;
      if (this.store.carouselCurrentSlide === 1) {
        this.isLeftActive = false;
      }
      if (this.store.carouselCurrentSlide === 0) {
        setTimeout(() => {
          this.rightDisabled = false;
        }, 250);
        return;
      }
      setTimeout(() => {
        this.enableButtons();
      }, 250);
      this.store.carouselCurrentSlide--;
    },
    nextSlide() {
      this.disableButtons();
      this.isLeftActive = true;
      if (this.isSecondLastItemOnViewPort()) {
        this.isRightActive = false;
      }
      if (!this.isLastItemOnViewPort()) {
        setTimeout(() => {
          this.leftDisabled = false;
        }, 250);
        this.store.carouselCurrentSlide++;
      }

      setTimeout(() => {
        this.enableButtons();
      }, 250);
    },
  },
};
</script>

<style scoped></style>
