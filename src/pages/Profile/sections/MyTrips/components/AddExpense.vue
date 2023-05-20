<script lang="ts">
import { defineComponent } from "vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import SelectInput from "@/common/components/Inputs/SelectInput.vue";
import { BUDGET_CATEGORIES } from "@/common/constants";
import { useTripsStore } from "@/pages/Profile/store/trips";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import SingleDatePicker from "@/common/components/DatePicker/SingleDatePicker.vue";
import { formatDateToBackendFormat } from "@/pages/Planning/utils";

export default defineComponent({
  name: "AddExpense",
  data() {
    return {
      tripsStore: useTripsStore(),
      newExpense: {
        price: 0,
        currency: "$",
        attraction: "",
        description: "",
        budget_category: "",
        date: null,
      },
    };
  },
  methods: {
    BUDGET_CATEGORIES() {
      return BUDGET_CATEGORIES;
    },
    saveDisabled() {
      return (
        this.newExpense.date === null ||
        this.newExpense.price === 0 ||
        this.newExpense.currency === "" ||
        this.newExpense.attraction === "" ||
        this.newExpense.description === ""
      );
    },
    onSaveClick() {
      this.tripsStore.customExpenseCreate({
        date: formatDateToBackendFormat(this.newExpense.date || new Date()),
        price: Number(this.newExpense.price),
        currency: this.newExpense.currency,
        attraction: this.newExpense.attraction,
        description: this.newExpense.description,
        budget_category: this.newExpense.budget_category,
        trip: this.tripsStore.trip?.id as number,
      });
      this.close();
    },
    close() {
      this.tripsStore.customExpenseFormVisible = false;
    },
  },
  computed: {
    attractions() {
      return (
        this.tripsStore.trip?.trip_attractions.map((tripAttraction) => {
          return tripAttraction.attraction.name;
        }) || []
      );
    },
    date() {
      return this.newExpense.date;
    },
  },
  components: {
    SingleDatePicker,
    PrimaryButton,
    SelectInput,
    TextInput,
  },
});
</script>

<template>
  <div class="profile-custom-expenses-form">
    <SingleDatePicker v-model="newExpense.date" />
    <div class="profile-attraction-detail-amount-and-currency">
      <TextInput
        v-model="newExpense.price"
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
          @click="newExpense.currency = currency"
          :key="currency"
          v-for="currency in ['$', '€', '₴']"
          :class="
            currency === newExpense.currency
              ? 'planning-budget-container-popup-currencies-selected'
              : 'planning-budget-container-popup-currencies-item'
          "
        >
          {{ currency }}
        </span>
      </div>
    </div>
    <SelectInput
      v-model="newExpense.budget_category"
      :input-props="{
        name: 'category',
      }"
      label-text="Select category"
      :options="BUDGET_CATEGORIES()"
    >
    </SelectInput>
    <SelectInput
      v-model="newExpense.attraction"
      label-text="Select attraction"
      :options="attractions"
    >
    </SelectInput>
    <TextInput
      v-model="newExpense.description"
      :input-props="{
        type: 'textarea',
      }"
    />
    <div class="profile-custom-expenses-button-container">
      <PrimaryButton @click="close" class-name="button-inverted">
        Cancel</PrimaryButton
      >
      <PrimaryButton
        @click="onSaveClick"
        :input-props="{ disabled: saveDisabled() }"
      >
        Save
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped></style>
