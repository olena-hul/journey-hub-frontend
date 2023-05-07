<template>
  <div class="profile">
    <div class="profile-left-aside">
      <span class="home-welcome-header-title"> JourneyHub </span>
      <div class="profile-left-aside-menu">
        <a
          @click="() => (activeTab = tab)"
          :key="tab"
          v-for="tab in ['Homepage', 'My trips', 'Excursions', 'Settings']"
          :class="
            activeTab === tab ? 'profile-left-aside-menu-active-item' : ''
          "
          :href="`#${tab}`"
          >{{ tab }}</a
        >
      </div>
      <div class="profile-left-aside-sign-out">
        <PrimaryButton :on-click="signOut" type="submit">
          Sign Out
        </PrimaryButton>
      </div>
    </div>
    <div class="profile-main-content" id="main-content">
      <ProfileHomepage v-if="activeTab === 'Homepage'" />
      <MyTrips
        :on-view-click="onViewClick"
        v-if="activeTab === 'My trips' && !tripDetail"
      />
      <TripDetail
        v-if="activeTab === 'My trips' && tripDetail"
        :on-back-click="() => (tripDetail = false)"
      />
      <ProfileSettings v-if="activeTab === 'Settings'" />
    </div>
    <div class="profile-right-aside">
      <div class="profile-right-aside-profile">
        <img :src="Customer3" alt="Profile image" />
        <div class="profile-right-aside-profile-name">
          <span> Olena </span>
          <span> Travel enthusiast</span>
        </div>
      </div>
      <HomePageCalendar
        inline
        auto-apply
        :multi-calendars="false"
        :enable-time-picker="false"
      />

      <div class="profile-right-aside-my-trips" v-if="activeTab === 'Homepage'">
        <div class="profile-right-aside-my-trips-header">
          <h4>My trips</h4>
          <span> more ...</span>
        </div>
        <MyTripCardSmall :key="i" v-for="i in 3" />
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { defineComponent } from "vue";
import { useAuthStore } from "@/pages/Home/store/auth";
import "./index.scss";
import DatePicker from "@/common/components/DatePicker/index.vue";
import Customer3 from "@/assets/images/Customer3.png";
import MyTripCardSmall from "@/pages/Profile/components/MyTripCardSmall.vue";
import DestinationForm from "@/pages/Home/components/DestinationForm.vue";
import HomePageCalendar from "@/pages/Profile/components/HomePageCalendar.vue";
import TopPlacesCarousel from "@/pages/Planning/components/Carousel.vue";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import TopDestinationsCarousel from "@/pages/Profile/components/TopDestinationsCarousel.vue";
import HomePage from "@/pages/Home/index.vue";
import ProfileHomepage from "@/pages/Profile/components/ProfileHomePage.vue";
import MyTrips from "@/pages/Profile/components/MyTrips.vue";
import TripDetail from "@/pages/Profile/components/TripDetail.vue";
import ProfileSettings from "@/pages/Profile/components/Settings.vue";

export default defineComponent({
  name: "user-profile",
  components: {
    ProfileSettings,
    TripDetail,
    MyTrips,
    ProfileHomepage,
    HomePageCalendar,
    MyTripCardSmall,
    PrimaryButton,
  },
  data: () => ({
    store: useAuthStore(),
    planningStore: usePlanningStore(),
    activeTab: "Homepage",
    Customer3,
    tripDetail: false,
  }),
  methods: {
    signOut() {
      this.store.logout();
    },
    onViewClick() {
      this.tripDetail = true;
    },
  },
  mounted() {
    this.planningStore.getAttractions(null);
    const anchor = this.$route.hash;
    if (anchor) {
      this.activeTab = anchor.slice(1);
    }
  },
});
</script>

<style scoped></style>
