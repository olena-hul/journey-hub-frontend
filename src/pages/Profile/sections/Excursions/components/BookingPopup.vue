<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="profile-excursions-book-popup"
  >
    <h3 class="profile-trip-detail-trip-attraction-popup-title">
      Book excursion
    </h3>
    <TextInput
      v-model="formData.phone_number"
      :input-props="{
        name: 'phone_number',
        type: 'tel',
        placeholder: '+38XXXXXXXXXX',
        validation: 'matches:/^\\d{10}$/',
      }"
      label-text="Phone number"
    ></TextInput>
    <TextInput
      v-model="formData.adults_count"
      :input-props="{
        name: 'adults_count',
        type: 'number',
        placeholder: 'Enter adults count',
        validation: 'required',
      }"
      label-text="Adults count"
    ></TextInput>
    <TextInput
      v-model="formData.children_count"
      :input-props="{
        name: 'children_count',
        type: 'number',
        placeholder: 'Enter children count',
        validation: 'required',
      }"
      label-text="Children count"
    ></TextInput>
    <h4>
      Amount to pay: {{ amountToPay }}
      {{ tripsStore.excursion?.currency }}
    </h4>
    <div class="planning-budget-container-popup-button-container">
      <PrimaryButton class-name="button-inverted" @click="onClose">
        Cancel
      </PrimaryButton>

      <PrimaryButton
        @click="onSave"
        :input-props="{ disabled: saveDisabled() }"
      >
        <div class="profile-excursions-book-popup-spinner">
          <spinner v-if="bookingInProgress" color="#ffffff" size="30" />
        </div>
        <span v-if="!bookingInProgress"> Pay </span>
      </PrimaryButton>
    </div>
  </OverlayPopup>
</template>

<script>
import RemoveIcon from "@/assets/images/cross.png";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import OverlayPopup from "@/common/components/Popup/index.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import { useAuthStore } from "@/pages/Home/store/auth";
import Spinner from "vue-spinner-component/src/Spinner.vue";

export default {
  name: "book-excursion-popup",
  components: { OverlayPopup, TextInput, PrimaryButton, Spinner },
  data() {
    return {
      RemoveIcon,
      tripsStore: useTripsStore(),
      formData: {
        phone_number: "",
        adults_count: 1,
        children_count: 0,
      },
      authStore: useAuthStore(),
      bookingInProgress: false,
    };
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
  },
  computed: {
    amountToPay() {
      return (
        (Number(this.tripsStore.excursion?.price) || 1) *
        (Number(this.formData.adults_count) +
          0.5 * this.formData.children_count)
      );
    },
  },
  methods: {
    saveDisabled() {
      return (
        !this.formData.phone_number ||
        this.formData.phone_number === "" ||
        this.formData.adults_count === 0
      );
    },
    async onSave() {
      this.bookingInProgress = true;
      await this.tripsStore.createBooking({
        ...this.formData,
        user: this.authStore.user?.id,
        excursion: this.tripsStore.excursion?.id,
      });
      window.location.href = this.tripsStore.booking?.session_url;
    },
  },
};
</script>

<style scoped></style>
