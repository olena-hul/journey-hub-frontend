<template>
  <ImagesCarousel class-name="planning-top-places-carousel" parent="planning">
    <CarouselItem
      :key="i"
      class-name="planning-top-places-carousel-item"
      v-for="i in 10"
    >
      <div class="planning-top-places-carousel-item-card">
        <img :src="EifelTower" alt="Popular place image" />
        <h4>Eifel Tower</h4>
        <span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis
          velit nec nisl eleifend rutrum. Aliquam erat eros, dignissim vitae
          auctor vel, consectetur et ligula. Etiam mollis quis ante eu rutrum.
          Vivamus faucibus odio sodales urna venenatis malesuada.
        </span>
      </div>
    </CarouselItem>
  </ImagesCarousel>
</template>

<script lang="ts">
import ImagesCarousel from "@/common/components/Carousel/Carousel.vue";
import CarouselItem from "@/common/components/Carousel/CarouselItem.vue";
import EifelTower from "@/assets/images/EifelTower.png";
import { defineComponent } from "vue";

export default defineComponent({
  name: "top-places-carousel",
  components: { CarouselItem, ImagesCarousel },
  data: () => ({
    EifelTower,
  }),
});
</script>

<style scoped></style>
