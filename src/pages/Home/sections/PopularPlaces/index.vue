<template>
  <div class="home-popular-places">
    <h2 class="home-popular-places-title">Popular places for new experience</h2>
    <PlacesImagesCarousel>
      <CarouselItem>
        <div class="home-popular-places-card">
          <img :src="PopularPlace1" alt="Popular place" />
          <span class="home-popular-places-card-title"
            >Enjoy the beauty of the railto Hill</span
          >
          <span class="home-popular-places-card-location"
            >Vengema, Indonesia</span
          >
          <div class="home-popular-places-card-rating">
            <div>
              <img :src="StarPentagon" alt="Rating" />
              <span>4.5</span>
            </div>
            <span>(1.5K+ Review)</span>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="home-popular-places-card">
          <img :src="PopularPlace2" alt="Popular place" />
          <span class="home-popular-places-card-title"
            >Enjoy the beauty of the floating city</span
          >
          <span class="home-popular-places-card-location">Bahrando, Italy</span>
          <div class="home-popular-places-card-rating">
            <div>
              <img :src="StarPentagon" alt="Rating" />
              <span>4.5</span>
            </div>
            <span>(1.5K+ Review)</span>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="home-popular-places-card">
          <img :src="PopularPlace3" alt="Popular place" />
          <span class="home-popular-places-card-title"
            >Enjoy the beauty of the sea beach</span
          >
          <span class="home-popular-places-card-location"
            >Los engelous, america</span
          >
          <div class="home-popular-places-card-rating">
            <div>
              <img :src="StarPentagon" alt="Rating" />
              <span>4.5</span>
            </div>
            <span>(1.5K+ Review)</span>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="home-popular-places-card">
          <img :src="PopularPlace1" alt="Popular place" />
          <span class="home-popular-places-card-title"
            >Enjoy the beauty of the railto Hill</span
          >
          <span class="home-popular-places-card-location"
            >Vengema, Indonesia</span
          >
          <div class="home-popular-places-card-rating">
            <div>
              <img :src="StarPentagon" alt="Rating" />
              <span>4.5</span>
            </div>
            <span>(1.5K+ Review)</span>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="home-popular-places-card">
          <img :src="PopularPlace2" alt="Popular place" />
          <span class="home-popular-places-card-title"
            >Enjoy the beauty of the floating city</span
          >
          <span class="home-popular-places-card-location">Bahrando, Italy</span>
          <div class="home-popular-places-card-rating">
            <div>
              <img :src="StarPentagon" alt="Rating" />
              <span>4.5</span>
            </div>
            <span>(1.5K+ Review)</span>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="home-popular-places-card">
          <img :src="PopularPlace3" alt="Popular place" />
          <span class="home-popular-places-card-title"
            >Enjoy the beauty of the sea beach</span
          >
          <span class="home-popular-places-card-location"
            >Los engelous, america</span
          >
          <div class="home-popular-places-card-rating">
            <div>
              <img :src="StarPentagon" alt="Rating" />
              <span>4.5</span>
            </div>
            <span>(1.5K+ Review)</span>
          </div>
        </div>
      </CarouselItem>
    </PlacesImagesCarousel>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import PlacesImagesCarousel from "@/pages/Home/components/Carousel.vue";
import CarouselItem from "@/pages/Home/components/CarouselItem.vue";
import PopularPlace1 from "@/assets/images/PopularPlace1.png";
import PopularPlace2 from "@/assets/images/PopularPlace2.png";
import PopularPlace3 from "@/assets/images/PopularPlace3.png";
import StarPentagon from "@/assets/images/StarPentagon.svg";

import { store } from "@/pages/Home/store/carousel";

const array = Array.from(Array(6).keys());

export default {
  name: "popular-places",
  components: { CarouselItem, PlacesImagesCarousel },
  data() {
    return {
      array,
      store,
      PopularPlace1,
      PopularPlace2,
      PopularPlace3,
      StarPentagon,
    };
  },
};
</script>

<style scoped></style>
