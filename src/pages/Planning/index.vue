<template>
  <TripLoader v-if="loading" />
  <div class="planning" v-if="!loading">
    <div id="planning" class="planning-form">
      <AlertComponent v-if="alertMessage" type="info" :message="alertMessage" />

      <div class="planning-heading">
        <img
          :src="BackIcon"
          alt="Back icon"
          class="planning-heading-back-icon"
          @click="onBackClick"
        />
        <h1>Trip to {{ destinationStore.selectedDestination?.name }}</h1>
        <div class="planning-heading-date-form">
          <DatePicker
            ref="datepicker"
            v-model="destinationStore.selectedDates"
            class-name="planning-heading-date-form-input"
          />
        </div>
      </div>
      <img
        :src="destinationStore.selectedDestination?.image_urls.at(0) || Paris"
        alt="Destination image"
        class="planning-heading-destination-image"
      />
      <h2 class="planning-top-places">Top places</h2>
      <TopPlacesCarousel />
      <div class="planning-budget-container">
        <h3>
          Your budget - {{ planningStore.budget.amount }}
          {{ planningStore.budget.currency }}
        </h3>
        <img
          @click="() => (isBudgetPopupOpen = true)"
          alt="Pencil"
          :src="Pencil"
          class="planning-heading-date-form-pencil-icon"
        />
        <PrimaryButton
          @click="onSuggestClick"
          :input-props="{
            disabled: suggestTripButtonDisabled(),
          }"
          class-name="planning-budget-container-suggest-button"
        >
          Suggest trip
        </PrimaryButton>
      </div>

      <div
        v-if="planningStore.suggestionInProgress"
        class="planning-suggestion-in-progress"
      >
        <spinner color="#78A983FF" />
        <span> Your trip suggestion is in progress </span>
      </div>
      <div v-if="getDaysBetweenDates() && !planningStore.suggestionInProgress">
        <DailyActivities
          :day="parseDate(key)"
          :day-number="Number(index) + 1"
          :key="index"
          :activities="value as any"
          v-for="[index, [key, value]] of Object.entries(
            Object.entries(planningStore.plannedTrip)
          )"
        />
      </div>
      <div class="planning-budget-chart">
        <h4>Expenses chart</h4>
        <BudgetChart
          :estimated-expenses="this.planningStore.estimatedExpenses"
          :actual-expenses="this.planningStore.actualExpenses"
        />
      </div>
      <div class="planning-footer">
        <PrimaryButton class-name="button-inverted"> Cancel </PrimaryButton>
        <PrimaryButton @click="onSaveClicked">Save trip</PrimaryButton>
      </div>
    </div>
    <budget-popup
      :is-open="isBudgetPopupOpen"
      :on-close="() => (isBudgetPopupOpen = false)"
    />
    <GoogleMap
      v-if="!loading"
      :latitude="destinationStore.selectedDestination?.location.latitude"
      :longitude="destinationStore.selectedDestination?.location.longitude"
    />
    <SignInForm
      :stay-on-page="true"
      :set-alert-message="setAlertMessage"
      :is-open="isLoginOpen"
      :on-close="() => (isLoginOpen = false)"
    />
    <SignUpForm
      :stay-on-page="true"
      :set-alert-message="setAlertMessage"
      :is-open="isSignUpOpen"
      :on-close="() => (isSignUpOpen = false)"
    />
  </div>
</template>

<script lang="ts">
import "./index.scss";
import BackIcon from "@/assets/images/previous.png";
import { defineComponent } from "vue";
import Calendar from "@/assets/images/Calendar.svg";
import Pencil from "@/assets/images/pencil.png";
import Paris from "@/assets/images/Paris.png";
import router from "@/router";
import PopularPlace1 from "@/assets/images/PopularPlace1.png";
import PopularPlace2 from "@/assets/images/PopularPlace2.png";
import PopularPlace3 from "@/assets/images/PopularPlace3.png";
import StarPentagon from "@/assets/images/StarPentagon.svg";
import TopPlacesCarousel from "@/pages/Planning/components/Carousel.vue";
import GoogleMap from "@/pages/Planning/components/Map.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import DailyActivities from "@/pages/Planning/components/DailyActivities.vue";
import { useDestinationStore } from "@/pages/Home/store/destinations";
import { formatDate, formatDateToBackendFormat } from "./utils";
import { LOCALSTORAGE_KEYS } from "@/common/constants";
import BudgetPopup from "@/pages/Planning/components/BudgetPopup.vue";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { useAuthStore } from "@/pages/Home/store/auth";
import DatePicker from "@/common/components/DatePicker/index.vue";
import { parseDate } from "@/common/utils";
import Spinner from "vue-spinner-component/src/Spinner.vue";
import BudgetChart from "@/pages/Planning/components/BudgetChart.vue";
import AlertComponent from "@/common/components/Alerts/index.vue";
import SignInForm from "@/pages/Home/components/SignInForm.vue";
import SignUpForm from "@/pages/Home/components/SignUpForm.vue";
import TripLoader from "@/pages/Planning/components/TripLoader.vue";

export default defineComponent({
  name: "planning-page",
  components: {
    TripLoader,
    SignUpForm,
    SignInForm,
    AlertComponent,
    BudgetChart,
    DatePicker,
    BudgetPopup,
    DailyActivities,
    PrimaryButton,
    GoogleMap,
    TopPlacesCarousel,
    Spinner,
  },
  data: () => ({
    BackIcon,
    Calendar,
    Pencil,
    Paris,
    PopularPlace1,
    PopularPlace2,
    PopularPlace3,
    StarPentagon,
    day: new Date(),
    destinationStore: useDestinationStore(),
    isBudgetPopupOpen: false,
    authStore: useAuthStore(),
    planningStore: usePlanningStore(),
    selectedDates: [],
    alertMessage: null as string | null,
    isLoginOpen: false,
    isSignUpOpen: false,
    saveClicked: false,
    loading: false,
  }),
  methods: {
    parseDate,
    formatDate,
    getDaysBetweenDates() {
      // Convert the dates to milliseconds
      const startMillis = this.destinationStore.selectedDates?.at(0)?.getTime();
      const endMillis = this.destinationStore.selectedDates?.at(1)?.getTime();

      if (startMillis && endMillis) {
        const diffMillis = endMillis - startMillis;
        return Math.floor(diffMillis / 86400000);
      }
    },
    async onBackClick() {
      await router.back();
    },
    suggestTripButtonDisabled() {
      return (
        this.planningStore.budget?.amount === 0 ||
        this.planningStore.suggestionInProgress
      );
    },
    onSuggestClick() {
      if (
        (this.selectedDates.length == 0 &&
          this.destinationStore.selectedDates.length == 0) ||
        !this.planningStore.budget ||
        !this.destinationStore.selectedDestination
      ) {
        return;
      }
      this.planningStore.suggestTrip({
        start_date:
          (
            this.selectedDates.at(0) ||
            this.destinationStore.selectedDates.at(0)
          )
            ?.toISOString()
            .slice(0, 10) || new Date().toISOString().slice(0, 10),
        end_date:
          (
            this.selectedDates.at(1) ||
            this.destinationStore.selectedDates.at(1)
          )
            ?.toISOString()
            .slice(0, 10) || new Date().toISOString().slice(0, 10),
        budget: this.planningStore.budget.amount,
        currency: this.planningStore.budget.currency,
        destination: this.destinationStore.selectedDestination.name,
      });
      this.planningStore.suggestionInProgress = true;
    },
    async getTrip(start_date: Date, end_date: Date, destination_id: number) {
      if (this.authStore.user) {
        const trip = await this.planningStore.getTrip(
          formatDateToBackendFormat(start_date),
          formatDateToBackendFormat(end_date),
          destination_id
        );
        if (!trip) {
          await this.planningStore.createTrip({
            start_date: formatDateToBackendFormat(start_date),
            end_date: formatDateToBackendFormat(end_date),
            destination: destination_id,
            user: this.authStore.user.id,
          });
        }
      }
    },
    async onSaveClicked() {
      this.saveClicked = true;

      if (!this.authStore.currentUser) {
        this.openLoginPopup();
        return;
      }
      this.loading = true;
      if (this.planningStore.budget && !this.planningStore.budget.id) {
        await this.planningStore.createBudget(this.planningStore.budget);
      }
      await this.planningStore.createTripAttractions();
      this.alertMessage = "Your trip was successfully saved";
      setTimeout(() => {
        this.alertMessage = null;
        router.push("/");
      }, 2000);
    },
    setAlertMessage(value: string | null) {
      this.alertMessage = value;
    },
    openLoginPopup() {
      this.isSignUpOpen = false;
      this.isLoginOpen = true;
    },
    openSignUpPopup() {
      this.isLoginOpen = false;
      this.isSignUpOpen = true;
    },
  },
  mounted() {
    if (this.destinationStore.selectedDates?.length === 0) {
      let dates = localStorage.getItem(LOCALSTORAGE_KEYS.selectedDates);
      const destination = localStorage.getItem(
        LOCALSTORAGE_KEYS.selectedDestination
      );
      if (dates && destination) {
        dates = JSON.parse(dates);
        const parsedDates = dates && [new Date(dates[0]), new Date(dates[1])];
        const parsedDestination = JSON.parse(destination);
        this.destinationStore.saveUserChoice(
          parsedDates as Date[],
          parsedDestination,
          false
        );
        this.planningStore.getAttractions(parsedDestination.id);
      } else {
        router.push("/");
      }
    }
  },
  computed: {
    user() {
      return this.authStore.user;
    },
    planningTripDates() {
      return this.destinationStore.selectedDates;
    },
    budget() {
      return this.planningStore.budget;
    },
  },
  watch: {
    async user(newValue) {
      if (newValue) {
        if (this.saveClicked) {
          this.loading = true;
        }
        if (
          this.destinationStore.selectedDates &&
          this.destinationStore.selectedDestination
        ) {
          await this.getTrip(
            this.destinationStore.selectedDates[0],
            this.destinationStore.selectedDates[1],
            this.destinationStore.selectedDestination.id
          );
          if (this.saveClicked) {
            await this.onSaveClicked();
          }
        }
      }
    },
    planningTripDates(newValue) {
      // iterate through plannedTrip dates
      this.planningStore.getPlannedTrip(newValue);
    },
    budget(newValue) {
      this.planningStore.calculateExpenses();
    },
  },
});
</script>

<style scoped></style>
