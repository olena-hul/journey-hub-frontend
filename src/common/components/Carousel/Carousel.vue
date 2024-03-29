<template>
  <div class="carousel-navigation-button-container">
    <h4 class="carousel-navigation-button-container-title" v-if="title">
      {{ title }}
    </h4>
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

  <div :class="`carousel-container  ${className}`" ref="carouselItems">
    <transition-group name="slide">
      <slot ref="" />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationButton from "@/common/components/Carousel/NavigationButton.vue";
import { store } from "@/common/components/Carousel/store";
import "./index.scss";

export default defineComponent({
  name: "ImagesCarousel",
  components: { NavigationButton },
  data: function () {
    return {
      store,
      leftDisabled: true,
      rightDisabled: false,
      isLeftActive: false,
      isRightActive: true,
      carouselCurrentSlide: 0,
    };
  },
  props: {
    identifier: String,
    parent: {
      required: false,
      default: null,
    },
    className: String,
    title: {
      required: false,
      type: String,
    },
  },
  mounted() {
    this.store.currentSlides[this.identifier as any] = 0;
  },

  methods: {
    elementVisible(index: number) {
      const items = document.getElementsByClassName("carousel-container-item");
      const element = items[index];
      const parent = document.getElementById(this.parent || "");
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (parent?.clientHeight ||
            window.innerHeight ||
            document.documentElement.clientHeight) &&
        rect.right <=
          (parent?.clientWidth ||
            window.innerWidth ||
            document.documentElement.clientWidth)
      );
    },

    getChildrenLength(): number {
      const carouselItems = this.$refs.carouselItems as HTMLElement | undefined;
      return carouselItems ? carouselItems.children.length : 0;
    },

    isLastItemOnViewPort(): boolean {
      return this.elementVisible(this.getChildrenLength() - 1);
    },
    isSecondLastItemOnViewPort(): boolean {
      return this.elementVisible(this.getChildrenLength() - 2);
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
      if (this.store.currentSlides[this.identifier as any] === 1) {
        this.isLeftActive = false;
      }
      if (this.store.currentSlides[this.identifier as any] === 0) {
        setTimeout(() => {
          this.rightDisabled = false;
        }, 250);
        return;
      }
      setTimeout(() => {
        this.enableButtons();
      }, 250);
      this.store.currentSlides[this.identifier as any]--;
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
        this.store.currentSlides[this.identifier as any]++;
      }

      setTimeout(() => {
        this.enableButtons();
      }, 250);
    },
  },
});
</script>

<style scoped></style>
