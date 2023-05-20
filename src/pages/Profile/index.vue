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
      <MyExcursions
        v-if="activeTab === 'Excursions' && !excursionDetail"
        :on-view-click="onViewExcursionClick"
      />
      <ExcursionDetail
        v-if="activeTab === 'Excursions' && excursionDetail"
        :on-back-click="() => (excursionDetail = false)"
      />
    </div>
    <div class="profile-right-aside">
      <div class="profile-right-aside-profile">
        <img :src="Customer3" alt="Profile image" />
        <div class="profile-right-aside-profile-name">
          <span> {{ authStore.user?.first_name }} </span>
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
          <span @click="activeTab = 'My trips'"> more ...</span>
        </div>
        <MyTripCardSmall
          :key="myTrip.id"
          v-for="myTrip in this.tripsStore.myTrips"
          :trip="myTrip"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { defineComponent } from "vue";
import { useAuthStore } from "@/pages/Home/store/auth";
import "./index.scss";
import Customer3 from "@/assets/images/Customer3.png";
import MyTripCardSmall from "@/pages/Profile/sections/MyTrips/MyTripCardSmall.vue";
import HomePageCalendar from "@/pages/Profile/components/HomePageCalendar.vue";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import ProfileHomepage from "@/pages/Profile/sections/Homepage/ProfileHomePage.vue";
import MyTrips from "@/pages/Profile/sections/MyTrips/MyTrips.vue";
import TripDetail from "@/pages/Profile/sections/MyTrips/TripDetail.vue";
import ProfileSettings from "@/pages/Profile/sections/Settings/Settings.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import MyExcursions from "@/pages/Profile/sections/Excursions/index.vue";
import ExcursionDetail from "@/pages/Profile/sections/Excursions/components/ExcursionDetail.vue";

export default defineComponent({
  name: "user-profile",
  components: {
    ExcursionDetail,
    MyExcursions,
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
    excursionDetail: false,
    tripsStore: useTripsStore(),
    authStore: useAuthStore(),
  }),
  methods: {
    signOut() {
      this.store.logout();
    },
    onViewClick() {
      this.tripDetail = true;
    },
    onViewExcursionClick() {
      this.excursionDetail = true;
    },
  },
  computed: {
    user() {
      return this.authStore.user;
    },
  },
  mounted() {
    this.planningStore.getAttractions(null);
    const anchor = this.$route.hash;
    if (anchor) {
      this.activeTab = anchor.slice(1);
    }
  },
  watch: {
    async user(newValue) {
      if (newValue) {
        await Promise.all([
          this.tripsStore.getMyTrips(),
          this.tripsStore.getVisitedPlaces(),
          this.tripsStore.getDaysInTrips(),
          this.tripsStore.getTripExpenses(),
          this.tripsStore.getExcursionBookings(this.authStore.user?.id),
          this.tripsStore.getExcursions(),
        ]);
      }
    },
  },
});
</script>

<style scoped></style>
