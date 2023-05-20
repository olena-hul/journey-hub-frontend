<template>
  <div class="profile-trip-detail">
    <div class="profile-trip-detail-header">
      <img :src="BackIcon" alt="Back icon" @click="onBackClick" />
      <h3>{{ this.tripAttraction.attraction.name }}</h3>
    </div>
    <PhotosCarousel
      identifier="attraction-photos"
      :title="`View photos of ${this.tripAttraction.attraction.name}`"
      :image_urls="tripAttraction.attraction.image_urls"
    />
    <div class="profile-attraction-detail-amount-and-currency">
      <TextInput
        v-model="tripAttraction.price"
        :input-props="{
          name: 'amount',
          type: 'number',
          placeholder: 'Enter amount',
          validation: 'required',
        }"
        label-text="Amount spent and amount currency"
      ></TextInput>
      <div class="planning-budget-container-popup-currencies">
        <span
          @click="() => (tripAttraction.currency = currency)"
          :key="currency"
          v-for="currency in ['$', '€', '₴']"
          :class="
            currency === tripAttraction.currency
              ? 'planning-budget-container-popup-currencies-selected'
              : 'planning-budget-container-popup-currencies-item'
          "
        >
          {{ currency }}
        </span>
      </div>
    </div>
    <CheckboxInput
      :on-click="() => (tripAttraction.visited = !tripAttraction.visited)"
      :checked="tripAttraction.visited"
      label-text="Mark as visited"
    />
    <PrimaryButton
      class-name="profile-attraction-detail-feedback-btn"
      @click="performUpdate"
    >
      Save
    </PrimaryButton>
    <PhotosCarousel
      identifier="your-photos"
      title="Your photos"
      v-if="tripAttraction.attraction.custom_images.length > 0"
      :image_urls="customImageUrls"
    />
    <FileInput :handle-file-chosen="this.handleFileChosen" />
    <h3>Feedbacks</h3>
    <div class="profile-attraction-detail-feedback-container">
      <CustomFeedback
        :key="feedback.id"
        :feedback="feedback"
        v-for="feedback in tripsStore.activeAttraction?.attraction.rates"
      />
    </div>
  </div>
  <div class="profile-attraction-detail-feedback-content">
    <vue3-star-ratings v-model="rate.value" :show-control="false" />

    <TextInput
      v-model="rate.feedback"
      label-text="Leave your feedback"
      :input-props="{
        type: 'textarea',
        rows: 10,
      }"
    />
    <PrimaryButton
      @click="saveFeedback"
      class-name="profile-attraction-detail-feedback-btn"
      :input-props="{
        disabled: rate.value === 0 || rate.feedback === '',
      }"
    >
      Save feedback
    </PrimaryButton>
  </div>
</template>

<script setup lang="ts">
import PhotosCarousel from "@/pages/Profile/components/PhotosCarousel.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import CheckboxInput from "@/common/components/Inputs/Checkbox.vue";
import FileInput from "@/common/components/Inputs/FileInput.vue";
import CustomFeedback from "@/pages/Profile/components/Feedback.vue";
import vue3StarRatings from "vue3-star-ratings";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";

interface Props {
  onBackClick: Function;
}

defineProps<Props>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import BackIcon from "@/assets/images/previous.png";
import { useTripsStore } from "@/pages/Profile/store/trips";
import type {
  RateInput,
  TripAttraction,
  UpdateTripAttractionInput,
} from "@/pages/Profile/api";
import { useAuthStore } from "@/pages/Home/store/auth";

export default defineComponent({
  name: "TripAttractionDetail",
  data() {
    return {
      BackIcon,
      tripsStore: useTripsStore(),
      authStore: useAuthStore(),
      feedbackPopupOpen: false,
      rate: {
        value: 0,
        feedback: "",
      },
    };
  },
  methods: {
    async handleFileChosen(event: any) {
      const file = event.target.files[0];
      if (file) {
        await this.tripsStore.imageUpload(
          file,
          this.tripsStore.trip?.trip_attractions.at(0)?.attraction.id,
          this.authStore.user?.id
        );
        alert("Image uploaded!");
      }
    },
    performUpdate() {
      this.tripsStore.updateTripAttraction({
        price: this.tripAttraction.price,
        currency: this.tripAttraction.currency,
        visited: this.tripAttraction.visited,
      } as UpdateTripAttractionInput);
    },
    saveFeedback() {
      this.tripsStore.rateCreate({
        value: Math.round(this.rate.value),
        feedback: this.rate.feedback,
        user: this.authStore.user?.id as number,
        attraction: this.tripAttraction.attraction?.id as number,
      } as RateInput);
    },
  },
  computed: {
    tripAttraction(): TripAttraction {
      return this.tripsStore.activeAttraction as TripAttraction;
    },
    customImageUrls() {
      const res =
        this.tripsStore.activeAttraction?.attraction.custom_images.map(
          (customImage) => {
            return customImage.image_url;
          }
        );
      return res?.filter((item) => item !== undefined);
    },
  },
});
</script>

<style scoped></style>
