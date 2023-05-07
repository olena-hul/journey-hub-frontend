<template>
  <OverlayPopup
    :is-visible="isOpen"
    :on-close="onClose"
    class-name="profile-trip-detail-trip-attraction-popup"
  >
    <h3 class="profile-trip-detail-trip-attraction-popup-title">
      Edit trip attraction
    </h3>
    <div class="profile-trip-detail-trip-attraction-popup-amount-and-currency">
      <TextInput
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
    <TextInput
      :input-props="{
        name: 'duration',
        type: 'number',
        placeholder: 'Enter duration spent (hours)',
        validation: 'required',
      }"
      label-text="Hours spent"
    ></TextInput>
    <CheckboxInput label-text="Is visited" />
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
import CheckboxInput from "@/common/components/Inputs/Checkbox.vue";

export default {
  name: "edit-trip-attraction-popup",
  data() {
    return {
      RemoveIcon,
      planningStore: usePlanningStore(),
      authStore: useAuthStore(),
      budget: {
        amount: 0,
        currency: "$",
        entries: [],
      },
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
      if (this.authStore.currentUser && this.planningStore.trip) {
        if (this.planningStore.budget?.id) {
          this.planningStore.updateBudget(this.planningStore.budget.id, {
            ...this.budget,
            trip: this.planningStore.trip.id,
          });
        } else {
          this.planningStore.createBudget({
            ...this.budget,
            trip: this.planningStore.trip.id,
          });
        }
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
  components: {
    CheckboxInput,
    PrimaryButton,
    SelectInput,
    TextInput,
    OverlayPopup,
  },
  props: {
    isOpen: Boolean,
    onClose: Function,
  },
  computed: {
    planningBudget() {
      return this.planningStore.budget;
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
  },
};
</script>

<style scoped></style>
