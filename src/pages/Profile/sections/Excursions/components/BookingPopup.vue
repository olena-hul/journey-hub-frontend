<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="profile-trip-detail-trip-attraction-popup"
  >
    <div v-if="!booked" class="profile-excursions-book-popup">
      <h3 class="profile-trip-detail-trip-attraction-popup-title">
        Book excursion
      </h3>
      <TextInput
        v-model="formData.phone_number"
        :input-props="{
          name: 'phone_number',
          type: 'tel',
          placeholder: 'Enter phone number',
          validation: 'required',
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
      <div class="planning-budget-container-popup-button-container">
        <PrimaryButton class-name="button-inverted" @click="onClose">
          Cancel
        </PrimaryButton>
        <PrimaryButton @click="onSave"> Book</PrimaryButton>
      </div>
    </div>
    <div class="profile-excursions-book-popup" v-if="booked">
      <h4>
        Amount to pay: {{ tripsStore.excursion?.price }}
        {{ tripsStore.excursion?.currency }}
      </h4>
      <PrimaryButton @click="openStripe"> Pay</PrimaryButton>
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

export default {
  name: "book-excursion-popup",
  components: { OverlayPopup, TextInput, PrimaryButton },
  data() {
    return {
      RemoveIcon,
      tripsStore: useTripsStore(),
      formData: {
        phone_number: "",
        adults_count: 0,
        children_count: 0,
      },
      authStore: useAuthStore(),
      booked: false,
    };
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
  },
  methods: {
    async onSave() {
      await this.tripsStore.createBooking({
        ...this.formData,
        user: this.authStore.user?.id,
        excursion: this.tripsStore.excursion?.id,
      });
      this.booked = true;
    },
    openStripe() {
      window.location.href = this.tripsStore.booking?.session_url;
    },
  },
};
</script>

<style scoped></style>
