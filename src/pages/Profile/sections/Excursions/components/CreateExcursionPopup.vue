<script lang="ts">
import { defineComponent } from "vue";
import OverlayPopup from "@/common/components/Popup/index.vue";
import SingleDatePicker from "@/common/components/DatePicker/SingleDatePicker.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import DateTimePicker from "@/common/components/DatePicker/DateTimePicker.vue";
import SelectInput from "@/common/components/Inputs/SelectInput.vue";
import { useTripsStore } from "@/pages/Profile/store/trips";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import { useAuthStore } from "@/pages/Home/store/auth";
import { formatDateToBackendFormat } from "@/pages/Planning/utils";

interface ExcursionAttraction {
  times: Date[];
  attraction: string;
  description: string;
}

export default defineComponent({
  name: "CreateExcursionPopup",
  components: {
    PrimaryButton,
    SelectInput,
    DateTimePicker,
    TextInput,
    SingleDatePicker,
    OverlayPopup,
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
  },
  data() {
    return {
      tripsStore: useTripsStore(),
      planningStore: usePlanningStore(),
      authStore: useAuthStore(),
      newExcursion: {
        date: null,
        name: "",
        description: "",
        amount: null,
        currency: "$",
        startAddress: "",
        attractions: [],
      },
    };
  },
  methods: {
    saveDisabled() {
      return (
        this.newExcursion.attractions.length === 0 ||
        Object.values(this.newExcursion).some(
          (value) => value === null || value === ""
        ) ||
        this.newExcursion.attractions.some(
          (attraction: ExcursionAttraction) => {
            return Object.values(attraction).some(
              (value) => value === null || attraction.times.length === 0
            );
          }
        )
      );
    },
    onSaveClicked() {
      this.tripsStore.createExcursion({
        guide: this.authStore.user?.id as number,
        name: this.newExcursion.name,
        description: this.newExcursion.description,
        date: formatDateToBackendFormat(this.newExcursion.date),
        price: Number(this.newExcursion.amount),
        currency: this.newExcursion.currency,
        start_address: this.newExcursion.startAddress,
        excursion_attractions: this.newExcursion.attractions.map(
          (excursionAttraction: ExcursionAttraction) => {
            return {
              attraction: excursionAttraction.attraction,
              description: excursionAttraction.description,
              start_time: excursionAttraction.times[0].toISOString(),
              end_time: excursionAttraction.times[1].toISOString(),
            };
          }
        ),
      });
      this.onClose && this.onClose();
    },
  },
});
</script>

<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="profile-excursions-create-popup"
  >
    <h3>Create excursion</h3>
    <SingleDatePicker v-model="newExcursion.date" />
    <TextInput
      v-model="newExcursion.name"
      label-text="Name"
      :input-props="{
        type: 'text',
      }"
    />
    <TextInput
      v-model="newExcursion.description"
      label-text="Description"
      :input-props="{
        type: 'textarea',
      }"
    />
    <div class="profile-attraction-detail-amount-and-currency">
      <TextInput
        v-model="newExcursion.amount"
        :input-props="{
          name: 'amount',
          type: 'number',
          placeholder: 'Enter amount',
          validation: 'required',
        }"
        label-text="Amount and currency"
      ></TextInput>
      <div class="planning-budget-container-popup-currencies">
        <span
          @click="newExcursion.currency = currency"
          :key="currency"
          v-for="currency in ['$', '€', '₴']"
          :class="
            currency === newExcursion.currency
              ? 'planning-budget-container-popup-currencies-selected'
              : 'planning-budget-container-popup-currencies-item'
          "
        >
          {{ currency }}
        </span>
      </div>
    </div>
    <TextInput
      v-model="newExcursion.startAddress"
      :input-props="{
        name: 'start-address',
        type: 'text',
        placeholder: 'Enter start address',
        validation: 'required',
      }"
      label-text="Start address"
    ></TextInput>

    <div
      class="profile-excursions-create-popup-attractions"
      :key="attraction.times"
      v-for="attraction in newExcursion.attractions"
    >
      <DateTimePicker v-model="attraction.times" />
      <SelectInput
        v-model="attraction.attraction"
        :options="
          planningStore.attractions.map((attraction) => attraction.name)
        "
      />
      <TextInput
        v-model="attraction.description"
        :input-props="{
          name: 'description',
          type: 'textarea',
          placeholder: 'Enter description',
          validation: 'required',
        }"
        label-text="Start address"
      ></TextInput>
    </div>
    <span
      @click="
        newExcursion.attractions.push({
          times: [],
          attraction: null,
          description: null,
        })
      "
      class="planning-daily-activity-add-place"
    >
      + Add an attraction
    </span>
    <div class="planning-budget-container-popup-button-container">
      <PrimaryButton class-name="button-inverted" @click="onClose">
        Cancel
      </PrimaryButton>
      <PrimaryButton
        @click="onSaveClicked"
        :input-props="{ disabled: saveDisabled() }"
      >
        Save
      </PrimaryButton>
    </div>
  </OverlayPopup>
</template>

<style scoped></style>
