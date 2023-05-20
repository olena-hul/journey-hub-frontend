<template>
  <div class="profile-trip-detail">
    <div class="profile-trip-detail-header">
      <img :src="BackIcon" alt="Back icon" @click="onBackBtnClick" />
      <h3>{{ this.tripsStore.excursion?.name }}</h3>
    </div>
    <div class="profile-excursions-detail-header">
      <div class="profile-right-aside-profile">
        <img :src="Customer3" alt="Profile image" />
        <div class="profile-right-aside-profile-name">
          <span>
            {{ this.tripsStore.excursion?.guide.first_name }}
            {{ this.tripsStore.excursion?.guide.last_name }}</span
          >
          <span> Guide </span>
        </div>
      </div>
      <div class="profile-excursions-status-container">
        <BookingStatus
          v-if="usersBooking"
          :status="usersBooking.payment_status"
        />
        <PrimaryButton
          v-if="usersBooking?.payment_status === 'new'"
          @click="onPayClick"
          >Pay
        </PrimaryButton>
      </div>
    </div>

    <div class="profile-my-trips-carousel-item-dates">
      <img :src="Calendar" alt="calendar icon" />
      <span>{{ formatDate(new Date(this.tripsStore.excursion?.date)) }} </span>
    </div>
    <PhotosCarousel
      title="View excursion attractions"
      :image_urls="
        this.tripsStore.excursion?.excursion_attractions
          ?.at(0)
          .attraction.image_urls.slice(0, 3)
      "
    />
    <h4>Attractions to visit</h4>
    <ExcursionAttraction
      v-for="attraction in this.tripsStore.excursion?.excursion_attractions"
      :excursion-attraction="attraction"
      :key="attraction.id"
    />
  </div>
  <div class="profile-excursions-book-button-container">
    <PrimaryButton v-if="!usersBooking" @click="isBookingPopupOpen = true">
      Book
    </PrimaryButton>
  </div>
  <BookExcursionPopup
    :is-open="isBookingPopupOpen"
    :on-close="() => (isBookingPopupOpen = false)"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BackIcon from "@/assets/images/previous.png";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import Paris from "@/assets/images/Paris.png";
import Pencil from "@/assets/images/pencil.png";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { parseDate } from "@/common/utils";
import { useTripsStore } from "@/pages/Profile/store/trips";
import Calendar from "@/assets/images/CalendarGrey.svg";
import { formatDate, formatDateDDMM } from "@/pages/Planning/utils";
import ExcursionAttraction from "@/pages/Profile/sections/Excursions/components/ExcursionAttraction.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import BookExcursionPopup from "@/pages/Profile/sections/Excursions/components/BookingPopup.vue";
import Customer3 from "@/assets/images/Customer3.png";
import PhotosCarousel from "@/pages/Profile/components/PhotosCarousel.vue";
import BookingStatus from "@/pages/Profile/sections/Excursions/components/BookingStatus.vue";
import type { ExcursionBooking } from "@/pages/Profile/api";

export default defineComponent({
  name: "ExcursionDetail",
  components: {
    BookingStatus,
    PhotosCarousel,
    BookExcursionPopup,
    PrimaryButton,
    ExcursionAttraction,
  },
  data() {
    return {
      BackIcon,
      Paris,
      Pencil,
      Calendar,
      destinationStore: useDestinationStore(),
      isBookingPopupOpen: false,
      planningStore: usePlanningStore(),
      tripsStore: useTripsStore(),
      Customer3,
    };
  },
  props: {
    onBackClick: Function,
  },
  methods: {
    formatDate,
    formatDateDDMM,
    parseDate,
    onBackBtnClick() {
      this.tripsStore.booking = null;
      this.onBackClick && this.onBackClick();
    },
    onPayClick() {
      window.location.href =
        this.tripsStore.booking?.session_url || window.location.href;
    },
  },
  computed: {
    usersBooking(): ExcursionBooking | undefined {
      return (
        this.tripsStore.booking ||
        this.tripsStore.excursionBookings
          .filter(
            (booking) =>
              booking.excursion.id === this.tripsStore.excursion?.id &&
              (booking.payment_status === "paid" ||
                booking.payment_status === "new")
          )
          .at(0)
      );
    },
  },
});
</script>

<style scoped></style>
