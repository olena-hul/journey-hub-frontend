<template>
  <form class="home-title-container-left-destination-form">
    <div>
      <img :src="pointImage" alt="Point image" />
      <div>
        <span class="home-title-container-left-destination-form-input-title">
          Location
        </span>
        <span class="home-title-container-left-destination-form-input-value">
          Bogor, Indonesia
        </span>
      </div>
    </div>
    <div>
      <img :src="calendarImage" />
      <div>
        <span class="home-title-container-left-destination-form-input-title">
          Date
        </span>
        <span class="home-title-container-left-destination-form-input-value">
          22 Mar, 2022
        </span>
      </div>
    </div>
    <PrimaryButton> Search </PrimaryButton>
  </form>
</template>

<script>
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import PointImage from "@/assets/images/Point.svg";
import CalendarImage from "@/assets/images/Calendar.svg";

export default {
  name: "DestinationForm",
  components: { PrimaryButton },
  data: function () {
    return {
      pointImage: PointImage,
      calendarImage: CalendarImage,
    };
  },
};
</script>

<style scoped></style>
