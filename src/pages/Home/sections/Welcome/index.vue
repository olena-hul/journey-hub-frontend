<template>
  <div>
    <div class="home-welcome">
      <PageHeader />
      <div class="home-welcome-title-container">
        <div class="home-welcome-title-container-left">
          <StarPentagon
            class="home-welcome-title-container-left-star-pentagon-1"
          />
          <p class="home-welcome-title-container-left-title">
            After A Long Time You Can Enjoy
          </p>
          <StarQuadrangle
            class="home-welcome-title-container-left-star-quadrangle-1"
          />
          <p class="home-welcome-title-container-left-description">
            Our website will help you to organize and plan your trip and also
            monitor your expenses. Try it now!
          </p>
          <StarPentagon
            class="home-welcome-title-container-left-star-pentagon-2"
          />
          <img
            class="home-welcome-title-container-left-plane"
            :src="planeImage"
            alt="Plane image"
          />
          <DestinationForm />
          <StarQuadrangle
            class="home-welcome-title-container-left-star-quadrangle-2"
          />
        </div>
        <div class="home-welcome-title-container-right">
          <img :src="destinationImage" alt="Destination image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "./index.scss";
import PageHeader from "@/pages/Home/components/PageHeader.vue";
import DestinationForm from "@/pages/Home/components/DestinationForm.vue";
import StarPentagon from "@/pages/Home/components/StarPentagon.vue";
import StarQuadrangle from "@/pages/Home/components/StarQuadrangle.vue";
import HomepageRandomDestination from "@/assets/images/HomePageRandomDestination.png";
import Plane from "@/assets/images/HomePagePlane.png";

export default {
  name: "welcome-screen",
  components: {
    StarQuadrangle,
    StarPentagon,
    DestinationForm,
    PageHeader,
  },
  data: function () {
    return {
      destinationImage: HomepageRandomDestination,
      planeImage: Plane,
    };
  },
};
</script>

<style scoped></style>
