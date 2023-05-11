<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="planning-budget-container-popup"
  >
    <h3 class="planning-budget-container-popup-title">Edit budget</h3>
    <div class="planning-budget-container-popup-amount-and-currency">
      <TextInput
        v-model="this.budget.amount"
        :input-props="{
          name: 'amount',
          type: 'number',
          placeholder: 'Enter amount',
          validation: 'required',
        }"
        label-text="Budget amount and currency"
      ></TextInput>
      <div class="planning-budget-container-popup-currencies">
        <span
          :key="currency"
          v-for="currency in ['$', '€', '₴']"
          @click="this.budget.currency = currency"
          :class="
            currency === this.budget.currency
              ? 'planning-budget-container-popup-currencies-selected'
              : 'planning-budget-container-popup-currencies-item'
          "
        >
          {{ currency }}
        </span>
      </div>
    </div>

    <div
      :key="entry"
      class="planning-budget-container-popup-budget-entries"
      v-for="[i, entry] in this.budget.entries.entries()"
    >
      <SelectInput
        :input-props="{
          name: 'category',
        }"
        v-model="entry.category"
        label-text="Select category"
        :options="BUDGET_CATEGORIES()"
      >
      </SelectInput>
      <TextInput
        :input-props="{
          name: 'amount',
          type: 'number',
          placeholder: 'Enter amount',
          validation: 'required',
        }"
        v-model="entry.estimated_amount"
        label-text="Entry amount"
      ></TextInput>
      <img
        :src="RemoveIcon"
        class="planning-budget-container-popup-budget-entries-close"
        alt="Remove icon"
        @click="this.budget.entries.splice(i, 1)"
      />
    </div>
    <span
      class="planning-budget-container-popup-budget-entries-label"
      @click="addBudgetEntry"
    >
      + Add budget entries
    </span>
    <div class="planning-budget-container-popup-button-container">
      <PrimaryButton class-name="button-inverted" @click="onClose">
        Cancel
      </PrimaryButton>
      <PrimaryButton
        :input-props="{
          disabled: saveDisabled(),
        }"
        @click="save"
      >
        Save
      </PrimaryButton>
    </div>
  </OverlayPopup>
</template>

<script>
import OverlayPopup from "@/common/components/Popup/index.vue";
import TextInput from "@/common/components/Inputs/TextInput.vue";
import { BUDGET_CATEGORIES } from "@/common/constants";
import SelectInput from "@/common/components/Inputs/SelectInput.vue";
import PrimaryButton from "@/common/components/Buttons/PrimaryButton.vue";
import RemoveIcon from "@/assets/images/cross.png";
import { usePlanningStore } from "@/pages/Planning/store/planning";
import { useAuthStore } from "@/pages/Home/store/auth";
import { useTripsStore } from "@/pages/Profile/store/trips";

export default {
  name: "BudgetPopup",
  props: {
    isOpen: Boolean,
    onClose: Function,
    initialBudget: Object,
    trip_id: Number,
  },
  data() {
    return {
      RemoveIcon,
      planningStore: usePlanningStore(),
      authStore: useAuthStore(),
      budget: this.initialBudget,
      tripsStore: useTripsStore(),
    };
  },
  methods: {
    BUDGET_CATEGORIES() {
      return BUDGET_CATEGORIES;
    },
    addBudgetEntry() {
      this.budget.entries.push({
        estimated_amount: null,
        category: BUDGET_CATEGORIES[0],
      });
    },
    save() {
      if (this.authStore.currentUser && this.trip_id) {
        if (this.budget?.id) {
          this.planningStore.updateBudget(this.budget.id, {
            ...this.budget,
            trip: this.trip_id,
          });
        } else {
          this.planningStore.createBudget({
            ...this.budget,
            trip: this.trip_id,
          });
        }
        this.tripsStore.setBudget(this.budget);
      } else {
        this.planningStore.setBudget(this.budget);
      }
      this.onClose();
    },
    saveDisabled() {
      return (
        this.budget.entries.length === 0 ||
        this.budget.entries
          .map((entry) => entry.estimated_amount)
          .some((amount) => !amount || amount === 0) ||
        !this.budget.amount ||
        !this.budget.currency
      );
    },
  },
  components: { PrimaryButton, SelectInput, TextInput, OverlayPopup },
  computed: {
    planningBudget() {
      return this.planningStore.budget;
    },
    tripBudget() {
      return this.tripsStore.trip?.budgets.at(0);
    },
  },
  watch: {
    planningBudget(newValue) {
      if (newValue) {
        this.budget = {
          amount: newValue.amount,
          currency: newValue.currency,
          entries: newValue.entries,
        };
      }
    },
    tripBudget(newValue) {
      if (newValue) {
        this.budget = {
          amount: newValue.amount,
          currency: newValue.currency,
          entries: newValue.entries,
        };
      }
    },
  },
};
</script>

<style scoped></style>
